import prismadb from "@/lib/prismadb";

import { AuraForm } from "./interface/auraform";
import { auth, redirectToSignIn } from "@clerk/nextjs";


interface AuraIdPageProps {
    params: {
        auraId: string;
    }
}


const AuraIdPage = async ({
    params
}: AuraIdPageProps) => {

    const { userId } = auth();

    //TODO: check subscription

    if (!userId) {
        return redirectToSignIn();
    }

    const aura = await prismadb.aura.findUnique({
        where: {
            id: params.auraId,
            userId
        }
    });

    const categories  = await prismadb.category.findMany();

    return ( 
        <AuraForm 
            initialData={aura}
            categories={categories}
        />
     );
}
 
export default AuraIdPage;