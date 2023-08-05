import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChatClient } from "./interface/chatclient";

interface ChatIdPageProps {
    params: {
        chatId: string;
    }
}


const ChatIdPage = async ({
    params
}: ChatIdPageProps) => {

    const { userId } = auth();

    if(!userId) {
        return redirectToSignIn();
    }

    const aura = await prismadb.aura.findUnique({
        where: {
            id: params.chatId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                },
                where: {
                    userId,
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    });

    if(!aura) {
        return redirect("/");
    }

    return (

            <ChatClient aura={aura}/>

     );
}

export default ChatIdPage;
