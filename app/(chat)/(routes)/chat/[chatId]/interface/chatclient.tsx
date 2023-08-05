"use client";

import { ChatHeader } from "@/components/chatheader";
import { Aura, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCompletion } from "ai/react";
import { ChatForm } from "@/components/chatform";
import { ChatMessages } from "@/components/chatmessages";
import { ChatMessageProps } from "@/components/chatmessage";

interface ChatClientProps {
    aura: Aura & {
        messages: Message[];
        _count: {
            messages: number;
        }
    }
}

export const ChatClient = ({
    aura
}: ChatClientProps) => {

	const router = useRouter();
	const [messages, setMessages] = useState<ChatMessageProps[]>(aura.messages);

	const {
		input,
		isLoading,
		handleInputChange,
		handleSubmit,
		setInput,
	} = useCompletion({
		api: `/api/chat/${aura.id}`,  // waiting for the response of api which will generate response of AI model
		onFinish(prompt, completion) {
			const systemMessage: ChatMessageProps = {   // Store the response
				role: "system",
				content: completion,
			}

			setMessages((current) => [...current, systemMessage])
			setInput("");

			router.refresh();
		}
	});

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		const userMessage: ChatMessageProps = {        // Storing the user response
			role: "user",
			content: input,
		};

		setMessages((current) => [...current, userMessage]);

		handleSubmit(e);
	}


    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader aura={aura}/>
			<ChatMessages
				aura={aura}
				isLoading={isLoading}
				messages={messages}
			/>
			<ChatForm
				isLoading={isLoading}
				input={input}
				handleInputChange={handleInputChange}
				onSubmit={onSubmit}
			/>
        </div>
    )
}
