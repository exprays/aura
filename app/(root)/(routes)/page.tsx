import { Auras } from "@/components/auras";
import { Categories } from "@/components/categories";
import { SearchInput } from "@/components/searchinput";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
    searchParams: {
        categoryId: string;
        name: string;
    }
}

const Rootpage = async ({
    searchParams
}: RootPageProps) => {

    const data = await prismadb.aura.findMany({
        where: {
            categoryId: searchParams.categoryId,
            name: {
                search: searchParams.name
            }
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    const categories = await prismadb.category.findMany();

    return ( 
        <div className="h-full p-4 space-y-2">
            <SearchInput />
            <Categories data={categories}/>
            <Auras data={data} />
        </div>
     );
}
 
export default Rootpage;