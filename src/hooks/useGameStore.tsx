
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type Bubble = {
    id: number;
    position: [number, number, number];
}

let bubbleId = 1; // Global counter for bubble IDs

type GameState = {
    debugMode: boolean;
    bubbles: Record<number, Bubble>;
    cameraPosition: [number, number, number];
    cameraRotation: [number, number, number];
}

type GameActions = {
    addBubble: (bubble: Bubble) => void;
    removeBubble: (id: number) => void;
    reset: () => void;
    setCamera(position: [number, number, number], rotation: [number, number, number]): void;
    setDebugMode: (debugMode: boolean) => void;
}

type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>()(
    immer((set) => ({
        debugMode: false,
        bubbles: {},
        cameraPosition: [0, 0, 0],
        cameraRotation: [0, 0, 0],
        addBubble: (bubble: Bubble) => set((state) => {
            state.bubbles[bubble.id] = bubble;
        }),
        removeBubble: (id: number) => set((state) => {
            delete state.bubbles[id];
        }),
        reset: () => set((state) => {
            state.bubbles = {}
            for (let i = 0; i < 10; i++) {
                const bubble = {
                    id: bubbleId++,
                    position: [Math.random() * 20 - 10, Math.random() * 10 + 5, Math.random() * -20] as [number, number, number]
                };
                state.bubbles[bubble.id] = bubble;
            }
        }),
        setCamera: (position: [number, number, number], rotation: [number, number, number]) => set((state) => {
            state.cameraPosition = position;
            state.cameraRotation = rotation;
        }),
        setDebugMode: (debugMode: boolean) => set((state) => {
            state.debugMode = debugMode;
        }),
    }))
);

