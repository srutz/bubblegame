import { useThree } from "@react-three/fiber"
import { useEffect } from "react"

export function ResizeObserver() {
    const { gl, camera, size } = useThree()

    useEffect(() => {
        const handleResize = () => {
            if ("aspect" in camera) {
               camera.aspect = size.width / size.height
            }
            camera.updateProjectionMatrix()

            // Update renderer size
            gl.setSize(size.width, size.height)
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        }

        handleResize()
    }, [gl, camera, size])
    return null
}