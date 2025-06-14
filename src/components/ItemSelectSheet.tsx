import { ScrollArea } from "@/components/ui/scroll-area";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { JSX } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function ItemSelectSheet({
    icon,
    triggerName,
    children,
    isOpen,
    setIsOpen,
}: {
    icon: IconName;
    triggerName: string;
    children: JSX.Element[];
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}) {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="shrink" asChild>
                <Button variant="outline" className="py-6 w-full">
                    <DynamicIcon name={icon} className="size-7" />{" "}
                    <span className="text-lg">{triggerName}</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="bottom"
                className="h-7/10 [&>button:last-of-type>svg]:size-8 [&>button:last-of-type>svg]:cursor-pointer">
                <div className="overflow-y-hidden h-full w-full flex justify-center mt-20">
                    <ScrollArea className="h-full pb-18 w-full max-w-xl">
                        <div className="flex flex-col justify-center items-center mt-4 ">
                            <div className="max-w-xl w-full sm:min-w-lg flex flex-col ">
                                <div className="flex flex-wrap gap-4 px-5 ">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    );
}
