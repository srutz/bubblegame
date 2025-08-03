import { useCameraTracker } from "@/hooks/useCameraTracker";
import { useGameStore } from "@/hooks/useGameStore";
import { deg2rad } from "@/hooks/Util";
import { Cloud, Clouds, Environment, OrbitControls, Sky, Stats } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from 'three';
import { Box } from "./nodes/Box";
import { MonitoredBubble } from "./nodes/MonitoredBubble";


export function BubbleGame() {
    const { bubbles, addBubble, removeBubble, reset, setCamera, debugMode } = useGameStore();
    const { camera } = useThree()
    const { cameraPosition, cameraRotation } = useCameraTracker(camera)
    const statsParent = useRef(document.getElementById("gamecanvas")!);

    // sync camera position and rotation with the gamestate
    useEffect(() => {
        setCamera(
            [cameraPosition.x, cameraPosition.y, cameraPosition.z],
            [cameraRotation.x, cameraRotation.y, cameraRotation.z]);
    }, [cameraPosition, cameraRotation, setCamera]);

    // reset and initialize the game
    useEffect(() => {
        reset();
    }, [addBubble, reset]);


    return (
        <Suspense>
            <Clouds material={THREE.MeshBasicMaterial}>
                <Cloud seed={10} bounds={50} volume={80} position={[40, 0, -80]} />
                <Cloud seed={10} bounds={50} volume={80} position={[-40, 10, -80]} />
            </Clouds>
            <Environment preset="city" />
            <Sky />
            <Physics  >
                <RigidBody type="fixed"  >
                    <Box position={[0, -0.2, 0]} size={[20, 0.1, 20]} rotation={[0, 0, deg2rad(-30)]} color="#2f3000" />
                </RigidBody>
                {Object.values(bubbles).map((bubble) => (
                    <MonitoredBubble key={bubble.id} bubble={bubble} onTick={(body) => {
                        const position = body.translation();
                        // Check if Y coordinate dropped below -10 (assuming this is your threshold)
                        if (position.y < -30) {
                            removeBubble(bubble.id);
                        }
                    }} />
                ))}
                <OrbitControls />
            </Physics>
            {debugMode && (
                <>
                    <gridHelper args={[20, 20, 'red', 'blue']} position={[0, -0.1, 0]} />
                    <axesHelper args={[10]} position={[0, 0, 0]} />
                    <Stats parent={statsParent} className="stats"/>
                </>
            )}
        </Suspense>
    )
}

