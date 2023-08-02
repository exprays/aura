import { UserButton } from "@clerk/nextjs";

const Rootpage = () => {
    return ( 
        <div>
            <UserButton afterSignOutUrl="/"/>
        </div>
     );
}
 
export default Rootpage;