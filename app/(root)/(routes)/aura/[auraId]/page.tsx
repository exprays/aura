import prismadb from "@/lib/prismadb";

import { AuraForm } from "./interface/auraform";

interface AuraIdPageProps {
    params: {
        auraId: string;
    }
}


const AuraIdPage = async ({
    params
}: AuraIdPageProps) => {

    //TODO: check subscription

    const aura = await prismadb.aura.findUnique({
        where: {
            id: params.auraId
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