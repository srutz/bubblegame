
import { useGameStore } from "@/hooks/useGameStore";
import { useSidebar } from "@/hooks/useSidebar";
import { euler3ArrayToString, vector3ArrayToString } from "@/hooks/Util";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";

export function Sidebar() {
    const { isOpen } = useSidebar();
    const { bubbles, reset, debugMode, setDebugMode, cameraPosition, cameraRotation } = useGameStore();
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="bg-stone-100 overflow-hidden flex flex-col px-2 py-2 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/pexels-ahmetyuksek-32583181.jpg')"
                    }}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 320, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    <div className="bg-stone-900/60 px-2 py-4 pb-8 flex flex-col gap-2">
                        <h2 className="text-white font-bold text-lg drop-shadow-lg">Bubble Game</h2>
                        <div className="my-4 font-mono text-xs text-white flex flex-col gap-2">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="pr-2">#Bubbles:</td>
                                        <td className="text-yellow-300">{Object.keys(bubbles).length}</td>
                                    </tr>
                                    {debugMode && (
                                        <>
                                            <tr>
                                                <td className="pr-2">Cam-Pos:</td>
                                                <td className="text-yellow-300">
                                                    {vector3ArrayToString(cameraPosition, 2)}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="pr-2">Cam-Rot:</td>
                                                <td className="text-yellow-300">
                                                    {euler3ArrayToString(cameraRotation, 2)}
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="my-4 flex flex-col gap-2 self-center">
                            <Button className="text-xs" variant={"secondary"} onClick={() => reset()}>Reset Game</Button>
                            <Button className="text-xs" variant={"secondary"} onClick={() => setDebugMode(!debugMode)}>Toggle Debug</Button>
                        </div>
                    </div>
                    <div className="grow" />
                    <div className="self-center text-xs text-white drop-shadow-md">Written by stepan.rutz AT gmx.de</div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}