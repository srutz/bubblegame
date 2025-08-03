import { JSX } from "react"

export type CubeProps = {
    position: [number, number, number]
    size?: number
    color?: string
    onClick?: () => void
} & JSX.IntrinsicElements['mesh']

export function Cube({ position, size = 1, color = "#ff0000", onClick, ...props }: CubeProps) {
    return (
        <mesh {...props} position={position} onClick={onClick} >
            <boxGeometry args={[size,size,size]} />
            <meshBasicMaterial color={color} />
        </mesh>
    )
}
