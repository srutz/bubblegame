import { useCameraTracker } from "@/hooks/useCameraTracker";
import { useGameStore } from "@/hooks/useGameStore";
import { deg2rad } from "@/hooks/Util";
import { Cloud, Clouds, Environment, OrbitControls, Sky, Stats } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useCallback, useEffect, useRef } from "react";
import * as THREE from 'three';
import { Spirograph3D } from "./Graoh";
import { Box } from "./nodes/Box";
import { BoysSurface } from "./nodes/BoysSurface";
import { MonitoredBubble } from "./nodes/MonitoredBubble";
import { RiemannSurface } from "./nodes/RiemannSurface";



export function BubbleGame() {
    const { gameState, bubbles, addBubble, removeBubble, reset, setCamera, debugMode } = useGameStore();
    const { camera } = useThree()
    const { cameraPosition, cameraRotation } = useCameraTracker(camera)
    const statsParent = useRef(document.getElementById("gamecanvas")!);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Debounced setCamera function
    const debouncedSetCamera = useCallback((position: [number, number, number], rotation: [number, number, number]) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        debounceTimeoutRef.current = setTimeout(() => {
            setCamera(position, rotation);
        }, 50);
    }, [setCamera]);

    // sync camera position and rotation with the gamestate but debounce updates
    useEffect(() => {
        debouncedSetCamera(
            [cameraPosition.x, cameraPosition.y, cameraPosition.z],
            [cameraRotation.x, cameraRotation.y, cameraRotation.z]);
    }, [cameraPosition, cameraRotation, debouncedSetCamera]);

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
            {gameState != "stopped" && (
                <Physics timeStep={"vary"} colliders={false}>
                    <RigidBody type="fixed" rotation={[0, 0, deg2rad(-35)]} colliders={'cuboid'}>
                        <Box position={[0, -0.2, 0]} size={[20, 0.5, 20]} color="#2f3000" />
                    </RigidBody>
                    <RigidBody type="fixed" rotation={[0, 0, deg2rad(-35)]} colliders={'cuboid'}>
                        <Box position={[0, -30.2, 0]} size={[20, 0.5, 20]} color="#2f3000" />
                    </RigidBody>
                    {Object.values(bubbles).map((bubble) => (
                        <MonitoredBubble key={bubble.id} bubble={bubble} onTick={(body) => {
                            const position = body.translation();
                            // Check if Y coordinate dropped below -10 (assuming this is your threshold)
                            if (position.y < -100) {
                                removeBubble(bubble.id);
                            }
                        }} />
                    ))}
                <Spirograph3D R={35} r={12} d={3} zAmplitude={38} zFrequency={1} segments={6} />
                <RiemannSurface segments={120} radius={3} scale={0.8} color="#3498db" />
                </Physics>
            )}
            <BoysSurface />
            <OrbitControls />
  
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


