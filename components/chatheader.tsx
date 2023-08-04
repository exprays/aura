import { Aura, Message } from "@prisma/client";
import { Button } from "./ui/button";
import { ChevronLeft, Edit, MessagesSquare, MoreVertical, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { BotAvatar } from "./botavatar";
import { useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import axios from "axios";

interface ChatHeaderProps {
    aura: Aura & {
        messages: Message[];
        _count: {
            messages: number;
        }
    }
}

export const ChatHeader = ({
    aura
}: ChatHeaderProps) => {

    const router = useRouter();
    const { user } = useUser();
    const { toast } = useToast();

    const onDelete = async () => {
        try {
            await axios.delete(`/api/aura/${aura.id}`);

            toast({
                description: "Success"

            })

            router.refresh();
            router.push("/");


        } catch (error) {
            toast({
                description: "Something went wrong",
                variant: "destructive"
            })
        }
    }

    return (
        <div
            className="
                flex
                w-full
                justify-between
                items-center
                border-b
                border-primary/10
                pb-4
            "
        >
            <div className="flex gap-x-2 items-center">
                <Button onClick={() => router.back()} size="icon" variant="ghost">
                    <ChevronLeft className="h-8 w-8"/>
                </Button>
                <BotAvatar src={aura.src}/>
                <div className="flex flex-col gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold">
                            {aura.name}
                        </p>
                        <div className="
                            flex
                            items-center
                            text-xs
                            text-muted-foreground
                        ">
                            <MessagesSquare className="w-3 h-3 mr-1"/>
                            {aura._count.messages}
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Created by @{aura.userName}
                    </p>
                </div>
            </div>
            {user?.id === aura.userId && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/aura/${aura.id}`)}>
                            <Edit className="w-4 h-4 mr-2"/>
                                Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete}>
                            <Trash className="w-4 h-4 mr-2"/>
                                Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}