import { gcd } from "@/hooks/Util";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SpirographParams = {
    R: number;           // Radius of fixed circle
    r: number;           // Radius of rolling circle  
    d: number;           // Distance from center of rolling circle to drawing point
    zAmplitude: number;  // Height variation
    zFrequency: number;  // Z-axis frequency multiplier
    segments: number;    // Number of points to generate
}

/*
export const presets: { name: string, params: Omit<SpirographParams, "segments"> }[] = [
    { name: "Classic", params: { R: 30, r: 8, d: 15, zAmplitude: 0, zFrequency: 1 } },
    { name: "Helix", params: { R: 25, r: 5, d: 20, zAmplitude: 15, zFrequency: 1 } },
    { name: "Twisted", params: { R: 35, r: 12, d: 18, zAmplitude: 8, zFrequency: 3 } },
    { name: "Spring", params: { R: 20, r: 3, d: 25, zAmplitude: 12, zFrequency: 4 } },
    { name: "Organic", params: { R: 40, r: 15, d: 10, zAmplitude: 6, zFrequency: 2.5 } }
] as const;
*/

export function Spirograph3D({ R, r, d, zAmplitude, zFrequency, segments }: SpirographParams) {
    const meshRef = useRef<THREE.Mesh<THREE.TubeGeometry, THREE.MeshStandardMaterial>>(null);

    // Generate spirograph points with proper typing
    const points = useMemo((): THREE.Vector3[] => {
        const pts: THREE.Vector3[] = [];
        const gcd_ = gcd(R, r);
        const maxT: number = 2 * Math.PI * Math.abs(r) / Math.abs(gcd_) * (R / r);

        for (let i = 0; i <= segments; i++) {
            const t: number = (i / segments) * maxT;

            // Classic spirograph equations with explicit typing
            const x: number = (R - r) * Math.cos(t) + d * Math.cos((R - r) * t / r);
            const y: number = (R - r) * Math.sin(t) - d * Math.sin((R - r) * t / r);

            // Add 3D component with sinusoidal height variation
            const z: number = zAmplitude * Math.sin(zFrequency * t);

            pts.push(new THREE.Vector3(x, y, z));
        }

        return pts;
    }, [R, r, d, zAmplitude, zFrequency, segments]);

    // Create tube geometry from points with proper error handling
    const geometry = useMemo((): THREE.TubeGeometry | THREE.BufferGeometry => {
        if (points.length < 2) {
            console.warn('Insufficient points for spirograph generation');
            return new THREE.BufferGeometry();
        }
        try {
            const curve = new THREE.CatmullRomCurve3(points, true);
            return new THREE.TubeGeometry(curve, Math.max(segments, 100), 0.5, 8, true);
        } catch (error) {
            console.error('Error creating tube geometry:', error);
            return new THREE.BufferGeometry();
        }
    }, [points, segments]);


    return (
        <mesh ref={meshRef} geometry={geometry}>
            <meshStandardMaterial
                color="#4f46e5"
                emissive="#312e81"
                emissiveIntensity={0.2}
                metalness={0.8}
                roughness={0.2}
            />
        </mesh>
    )
}
