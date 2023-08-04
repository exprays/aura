"use client";

import { ChatHeader } from "@/components/chatheader";
import { Aura, Message } from "@prisma/client";

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
    return (
        <div className="flex flex-col h-full p-4 space-y-2">
            <ChatHeader aura={aura}/>
        </div>
    )
}