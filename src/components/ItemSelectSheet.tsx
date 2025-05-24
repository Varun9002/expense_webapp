import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ReactElement } from "react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

export default function ItemSelectSheet({
    icon,
    triggerName,
    children,
}: {
    icon: IconName;
    triggerName: string;
    children: ReactElement[];
}) {
    return (
        <Sheet>
            <SheetTrigger className="grow basis-1/2" asChild>
                <Button variant="outline" className="py-6 w-full">
                    <DynamicIcon name={icon} className="size-7" />{" "}
                    <span className="text-lg">{triggerName}</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="bottom"
                className="h-7/10 w-full [&>button:last-of-type>svg]:size-8 [&>button:last-of-type>svg]:cursor-pointer">
                <div className="overflow-y-hidden h-full w-full ">
                    <ScrollArea className="h-full pb-18 w-full">
                        <div className="flex flex-col justify-center items-center mt-4 ">
                            <div className="max-w-xl w-full sm:min-w-lg flex flex-col ">
                                {children}
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </SheetContent>
        </Sheet>
    );
}
