import Main from "@/components/Main";
import {
    ChartPie,
    FileDown,
    FileUp,
    NotebookPen,
    Tag,
    Wallet,
} from "lucide-react";
import { Outlet } from "react-router";
import "./App.css";
import Nav, { NavProps } from "./components/navigation/Navbar";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import { exportData } from "./lib/db_helpers";
import { toast } from "sonner";
const navitems: NavProps = {
    items: [
        {
            name: "Records",
            icon: <NotebookPen className="size-5" />,
            link: "/",
        },
        {
            name: "Analysis",
            icon: <ChartPie className="size-5" />,
            link: "/analysis",
        },
        {
            name: "Accounts",
            icon: <Wallet className="size-5" />,
            link: "/accounts",
        },
        {
            name: "Categories",
            icon: <Tag className="size-5" />,
            link: "/categories",
        },
    ],
};

export default function App() {
    // const [count, setCount] = useState(0);

    return (
        <>
            <Main>
                <div className="bg-sidebar text-4xl max-sm:text-lg max-sm: md:pl-10 text-center md:text-left md:self-start w-full z-10 flex  justify-between items-center">
                    <h1 className="text-shadow-lg text-shadow-violet-800 text-violet-500 font-bold font-raleway p-5 ">
                        My Expense
                    </h1>
                    <div className=" flex gap-2 justify-center items-center px-2 sm:p-5">
                        <Button
                            variant={"secondary"}
                            className="cursor-pointer hover:bg-foreground hover:text-background">
                            <FileDown />
                            Import
                        </Button>
                        <Button
                            variant={"secondary"}
                            className="cursor-pointer hover:bg-foreground hover:text-background"
                            onClick={()=>{exportData().then(()=>{
                                toast("Data exported")
                            })}}>
                            <FileUp />
                            Export
                        </Button>
                    </div>
                </div>
                <Outlet />
                <Nav items={navitems.items} />
            </Main>
            <Toaster position="top-center" />
        </>
    );
}
