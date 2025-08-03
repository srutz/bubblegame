import { useStateWithLocalStorage } from "@/hooks/useStateWithLocalStorage";
import { ReactNode } from "react";
import { SidebarContext } from "./SidebarContext";


export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useStateWithLocalStorage("bubblegame-sidebar-open", true);
    return (
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SidebarContext.Provider>
    )
}

