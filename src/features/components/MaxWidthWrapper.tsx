import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
    className, 
    children
}: {
    className?: string;
    children: ReactNode;
}) => {
    return (
    <div 
    className={cn("h-full mx-auto w-full sm:max-w-screen-lg md:max-w-screen-xl lg:max-w-screen-2xl px-2.5 md:px-10", className)}>
        {children}
    </div>
    )
}

export default MaxWidthWrapper;