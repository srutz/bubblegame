
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

export function ResponsiveCamera() {
    const { camera, size } = useThree();
    useEffect(() => {
        if ("aspect" in camera) {
            camera.aspect = size.width / size.height;
        }
        camera.updateProjectionMatrix();
    }, [camera, size]);
    return null;
}