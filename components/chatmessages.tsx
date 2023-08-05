"use client";

import { Aura } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chatmessage";

interface ChatMessagesProps {
	messages: ChatMessageProps;
	isLoading: boolean;
	aura: Aura;
}

export const ChatMessages = ({
	messages = [],
	isLoading,
	aura,
}: ChatMessagesProps) => {
	return (
		<div className="flex-1 overflow-y-auto pr-4 h-full">
			<ChatMessage
				src={aura.src}
				role="system"
				content={`Hello, I am ${aura.name}, ${aura.description}`}
				isLoading={isLoading}
			/>
			<ChatMessage

				role="user"
				content={`Hello, I am ${aura.name}, ${aura.description}`}
				isLoading={isLoading}
			/>
		</div>
	)
}
