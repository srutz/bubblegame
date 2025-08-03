import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Overlay({ children, className, events }: { events?: boolean, children?: ReactNode; className?: string }) {
    return (
        <div
            className={cn(
                "bg-stone-900/60 top-0 right-0 absolute text-gray-800 select-none ",
                events ? "pointer-events-auto" : "pointer-events-none",
                className
            )}>
            {children}
        </div>
    )
}
