
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Bubble = {
    id: number;
    position: [number, number, number];
}

let bubbleId = 1; // Global counter for bubble IDs

type GameState = {
    gameState: "running" | "stopped" | "paused";
    debugMode: boolean;
    bubbles: Record<number, Bubble>;
    cameraPosition: [number, number, number];
    cameraRotation: [number, number, number];
}

type GameActions = {
    setGameState: (gameState: GameState["gameState"]) => void;
    setDebugMode: (debugMode: boolean) => void;
    addBubble: (bubble: Bubble) => void;
    removeBubble: (id: number) => void;
    reset: () => void;
    setCamera(position: [number, number, number], rotation: [number, number, number]): void;
}

type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>()(
    immer((set) => ({
        gameState: "stopped",
        debugMode: false,
        bubbles: {},
        cameraPosition: [0, 0, 0],
        cameraRotation: [0, 0, 0],
        setGameState: (gameState: GameState["gameState"]) => set((s) => {
            if (s.gameState == gameState) {
                return;
            }
            const oldGameState = s.gameState;
            s.gameState = gameState;
            if (s.gameState == "running" && oldGameState == "stopped") {
                doReset(s);
            }
        }),
        setDebugMode: (debugMode: boolean) => set((state) => {
            state.debugMode = debugMode;
        }),
        addBubble: (bubble: Bubble) => set((state) => {
            state.bubbles[bubble.id] = bubble;
        }),
        removeBubble: (id: number) => set((state) => {
            delete state.bubbles[id];
        }),
        reset: () => set((state) => {
            doReset(state);
        }),
        setCamera: (position: [number, number, number], rotation: [number, number, number]) => set((state) => {
            state.cameraPosition = position;
            state.cameraRotation = rotation;
        }),
    }))
);


function doReset(state: GameStore) {
    state.bubbles = {}
    for (let i = 0; i < 100; i++) {
        const bubble = {
            id: bubbleId++,
            position: [Math.random() * 5 - 2.5, Math.random() * 10 + 5, Math.random() * 8 - 4] as [number, number, number]
        };
        state.bubbles[bubble.id] = bubble;
    }
}
