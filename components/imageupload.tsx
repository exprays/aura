"use client";

import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disabled?: boolean;
}

export const ImageUpload = ({
    value,
    onChange,
    disabled
}: ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false);


    //Cloudinary code should run when ssr ends and user is mounted
    // prevents hydration error and code breaking
    useEffect(() =>{
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <div
            className="
                space-y-4
                w-full
                flex
                flex-col
                justify-center
                items-center
            "
        >
            <CldUploadButton
                onUpload={(result: any) => onChange(result.info.secure_url)}
                options={{
                    maxFiles: 1
                }}
                uploadPreset="vwjks42b"
            >
                <div className="
                    p-4
                    border-4
                    border-dashed
                    border-primary/10
                    rounded-lg
                    hover:opacity-75
                    transition
                    flex
                    flex-col
                    space-y-2
                    items-center
                    justify-center
                ">
                    <div className="
                        relative
                        h-40
                        w-40
                    ">
                        <Image
                            fill
                            alt="upload"
							src={value || "/placeholder.gif"}
                            className="rounded-lg object-cover"
                        />
                    </div>
                </div>
            </CldUploadButton>
        </div>
    )
}
