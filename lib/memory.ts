import { Redis } from "@upstash/redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { count } from "console";

export type AuraKey = {
	auraName: string;
	modelName: string;
	userId: string;
}

//Memory manager

export class MemoryManager {
	private static instance: MemoryManager;
	private history: Redis;
	private vectorDBClient: PineconeClient;

	public constructor() {
		this.history = Redis.fromEnv();
		this.vectorDBClient = new PineconeClient();
	}

	// initialization

	public async init() {
		if (this.vectorDBClient instanceof PineconeClient) {
			await this.vectorDBClient.init({
				apiKey: process.env.PINECONE_API_KEY!,
				environment: process.env.PINECONE_ENVIRONMENT!,
			});
		}
	}

	//vector search

	public async vectorSearch(
		recentChatHistory: string,
		auraFileName: string,
	) {
		const pineconeClient = <PineconeClient>this.vectorDBClient;

		const pineconeIndex = pineconeClient.Index(
			process.env.PINECONE_INDEX! || ""
		);

		// vector store
		const vectorStore = await PineconeStore.fromExistingIndex(
			new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
			{ pineconeIndex }
		);

		const similarDocs = await vectorStore
			.similaritySearch(recentChatHistory, 3, {
				fileName: auraFileName
			})
			.catch((err) => {
				console.log("failed to get vectors", err)
			});

		return similarDocs;
	}

	// Get the instance

	public static async getInstance(): Promise<MemoryManager> {
		if (!MemoryManager.instance) {
			MemoryManager.instance = new MemoryManager();
			await MemoryManager.instance.init();
		}

		return MemoryManager.instance;
	}

	private genearateRedisAuraKey(auraKey: AuraKey): string {
		return `${auraKey.auraName}-${auraKey.modelName}-${auraKey.userId}`;
	}

	public async writeToHistory(text: string, auraKey: AuraKey) {
		if (!auraKey || typeof auraKey.userId == "undefined") {
			console.log("Aura key set incorrect");
			return "";
		}

		const key = this.genearateRedisAuraKey(auraKey);
		const result = await this.history.zadd(key, {
			score: Date.now(),
			member: text,
		});

		return result;
	}

	//read from history

	public async readLatestHistory(auraKey: AuraKey): Promise<string> {
		if (!auraKey || typeof auraKey.userId == "undefined") {
			console.log("Aura key set incorrect");
			return "";
		}

		const key = this.genearateRedisAuraKey(auraKey);
		let result = await this.history.zrange(key, 0, Date.now(), {
			byScore: true,
		});

		result = result.slice(-30).reverse();

		const recentChats = result.reverse().join("\n");
		return recentChats;
	}

	public async seedChatHistory(
		seedContent: String,
		delimiter: string = "\n",
		auraKey: AuraKey
	) {
		const key = this.genearateRedisAuraKey(auraKey);

		if (await this.history.exists(key)) {
			console.log("User already has chat history!");
			return;
		}

		const content = seedContent.split(delimiter);
		let counter = 0;

		for (const line of content) {
			await this.history.zadd(key, { score: counter, member: line });
			counter += 1;
		}
	}
}
