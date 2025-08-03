import { Canvas } from "@react-three/fiber";
import { ReactNode } from "react";
import { ResizeObserver } from "../game/nodes/ResizeObserver";

export function GamePanel({ children }: { children?: ReactNode }) {
    return (
        <div className="p-8 h-1 grow flex flex-col relative">
            <div className="h-1 grow p-0 relative flex flex-row" >
                <div className="w-1 grow p-0 relative" id="gamecanvas">
                    <Canvas camera={{ position: [20, 1, 15], fov: 30, far: 2_000 }} >
                        <ResizeObserver />
                        {children}
                    </Canvas>
                </div>
            </div>
        </div>

    )
}