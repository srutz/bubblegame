import { JSX } from "react"

export type BoxProps = {
    position: [number, number, number]
    size: [number, number, number]
    color?: string
    onClick?: () => void
} & JSX.IntrinsicElements['mesh']

export function Box({ position, size, color = "#ff0000", onClick, ...props }: BoxProps) {
    return (
        <mesh {...props} position={position} onClick={onClick} >
            <boxGeometry args={size} />
            <meshBasicMaterial color={color} />
        </mesh>
    )
}
