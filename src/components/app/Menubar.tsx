import { useGameStore } from "@/hooks/useGameStore";
import { useSidebar } from "@/hooks/useSidebar";
import { LucidePauseCircle, LucidePlayCircle, LucideStopCircle } from "lucide-react";
import { MdMenu } from "react-icons/md";

export function Menubar() {
    const { isOpen, setIsOpen } = useSidebar();
    const { gameState, setGameState } = useGameStore();
    return (
        <div className="h-16 pl-2 pr-4 py-1 border-b border-stone-300 flex items-center gap-2">
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 rounded hover:bg-stone-200">
                <MdMenu className="w-6 h-6" />
            </button>
            <div className="w-10" />
            <div>Bubble Game</div>
            <div className="w-10" />
            {gameState != "running" && (
                <button onClick={() => { setGameState("running") }}>
                    <LucidePlayCircle className="w-6 h-6" />
                </button>
            )}
            {gameState == "running" && (
                <button onClick={() => { setGameState("paused") }}>
                    <LucidePauseCircle className="w-6 h-6" />
                </button>
            )}
            {gameState !== "stopped" && (
                <button onClick={() => { setGameState("stopped") }}>
                <LucideStopCircle className="w-6 h-6" />
                </button>
            )}
            <button>
            </button>
            <div className="grow" />
            <a href="https://github.com/srutz/bubblegame" target="_blank" rel="noopener noreferrer">
            Show in GitHub
            </a>
        </div>
    )
}