import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { auraId: string } }
    ) {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if (!params.auraId) {
            return new NextResponse("aura ID is required", { status: 400 });
        }

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("missing required fields", { status: 400 });
        }

        //check for subscription


        //aura database creation
        const aura = await prismadb.aura.update({
            where: {
                id: params.auraId,
            },
            data: {
                categoryId,
                userId: user.id,
                userName: user.firstName,
                src,
                name,
                description,
                instructions,
                seed
            }
        });

        return NextResponse.json(aura);

    } catch (error) {
        console.log("[AURA_PATCH]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { auraId: string } }
) {
    try {
        
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const aura = await prismadb.aura.delete({
            where: {
                userId,
                id: params.auraId
            }
        })

        return NextResponse.json(aura);

    } catch (error) {
        console.log("[AURA_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}