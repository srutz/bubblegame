import { createContext } from "react";

type SidebarContextType = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);
