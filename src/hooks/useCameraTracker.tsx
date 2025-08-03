import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Camera, Euler, Vector3 } from "three";

export function useCameraTracker(camera: Camera) {
    const [cameraPosition, setCameraPosition] = useState<Vector3>(new Vector3(0, 0, 0))
    const [cameraRotation, setCameraRotation] = useState<Euler>(new Euler(0, 0, 0))

    useFrame(() => {
        const positionChanged = !cameraPosition.equals(camera.position);
        const rotationChanged = !cameraRotation.equals(camera.rotation);

        if (positionChanged || rotationChanged) {
            setCameraPosition(camera.position.clone())
            setCameraRotation(camera.rotation.clone())
        }
    })
    return { cameraPosition, cameraRotation }
}