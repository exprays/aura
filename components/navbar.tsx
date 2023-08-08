"use client";

import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme-toggle";
import { MobileSidebar } from "./mobile-sidebar";

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})

export const Navbar = () => {
    return (
        <div
            className="
                fixed
                w-full
                flex
                justify-between
                z-50
                items-center
                py-2
                px-4
                border-b
                border-primary/10
                bg-secondary
                h-16
            "
        >
            <div className="flex items-center">
                <MobileSidebar />
                <Link href="/">
                    <h1 className={cn("hidden md:block text-xl md:text-3xl font-bold text-primary",
                        font.className
                    )}>
                        aura.ai
                    </h1>
                </Link>
            </div>
            <div
                className="
                    flex
                    items-center
                    gap-x-3
                "
            >
                <Button variant="nl" size="sm">
                    Upgrade
                    <Sparkles
                        className="
                            h-4
                            w-4
                            fill-white
                            text-white
                            ml-2
                        "
                    />
                </Button>
                <ModeToggle />
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    )
}
