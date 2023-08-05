"use client";

import { Aura } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chatmessage";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
	messages: ChatMessageProps[];
	isLoading: boolean;
	aura: Aura;
}

export const ChatMessages = ({
	messages = [],
	isLoading,
	aura,
}: ChatMessagesProps) => {

	const scrollRef = useRef<ElementRef<"div">>(null);

	const [fakeLoading, setFakeLoading] = useState(
		messages.length === 0 ? true : false
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFakeLoading(false);
		}, 2000);

		return () => {
			clearTimeout(timeout);
		}

	}, []);

	// scroll to the new messages despite of number of messages

	useEffect(() => {
		scrollRef?.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages.length])


	return (
		<div className="flex-1 overflow-y-auto pr-4 h-full">
			<ChatMessage
				isLoading={fakeLoading}
				src={aura.src}
				role="system"
				content={`Hello, I am ${aura.name}, ${aura.description}`}
			/>
			{messages.map((message) => (
				<ChatMessage
					key={message.content}
					role={message.role}
					content={message.content}
					src={message.src}
				/>
			))}
			{isLoading && (
				<ChatMessage
					role="system"
					src={aura.src}
					isLoading
				/>
			)}
			<div ref={scrollRef}/>
		</div>
	)
}
