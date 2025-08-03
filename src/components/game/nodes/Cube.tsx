import { JSX } from "react"

export type CubeProps = {
    position: [number, number, number]
    color?: string
    onClick?: () => void
} & JSX.IntrinsicElements['mesh']

export function Cube({ position, color = "#ff0000", onClick, ...props }: CubeProps) {
    return (
        <mesh {...props} position={position} onClick={onClick} >
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={color} />
        </mesh>
    )
}
