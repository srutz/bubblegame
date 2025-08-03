import AppLayout from "./components/app/AppLayout";
import { GamePanel } from "./components/app/GamePanel";
import { Menubar } from "./components/app/Menubar";
import { BubbleGame } from "./components/game/BubbleGame";

export function App() {
    return (
        <div className="self-stretch w-auto h-1 grow flex flex-row">
            <AppLayout>
                <Menubar />
                <GamePanel>
                    <BubbleGame />
                </GamePanel>
            </AppLayout>
        </div>
    )
}

