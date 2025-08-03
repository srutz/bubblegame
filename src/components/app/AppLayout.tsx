import { Sidebar } from "./Sidebar"
import { SidebarProvider } from "./SidebarProvider"

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <Sidebar />
            <main className="grow flex flex-col">
                {children}
            </main>
        </SidebarProvider>
    )
}