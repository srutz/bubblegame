import { useMemo } from 'react';
import * as THREE from 'three';

type RiemannSurfaceProps = {
    radius?: number;
    segments?: number;
    scale?: number;
    color?: string;
};

export function RiemannSurface({
    radius = 2,
    segments = 100,
    scale = 1,
    color = '#8e44ad',
}: RiemannSurfaceProps) {
    const geometry = useMemo(() => {
        const geom = new THREE.BufferGeometry();
        const positions: number[] = [];
        const normals: number[] = [];
        const uvs: number[] = [];

        // Generate parametric grid
        for (let i = 0; i <= segments; i++) {
            const u = (i / segments) * Math.PI * 2; // angle for z in polar form
            for (let j = 0; j <= segments; j++) {
                const v = (j / segments) * radius; // radial distance for z

                // Compute z in complex form
                const zRe = v * Math.cos(u);
                const zIm = v * Math.sin(u);
                const z2Re = zRe * zRe - zIm * zIm;
                const z2Im = 2 * zRe * zIm;

                // Compute (z^2 - 1)/(z^2 + 1)
                const numRe = z2Re - 1;
                const numIm = z2Im;
                const denRe = z2Re + 1;
                const denIm = z2Im;

                // Complex division
                const denom = denRe * denRe + denIm * denIm;
                const fracRe = (numRe * denRe + numIm * denIm) / denom;
                const fracIm = (numIm * denRe - numRe * denIm) / denom;

                // Compute cube root for y
                const r = Math.sqrt(fracRe * fracRe + fracIm * fracIm);
                const theta = Math.atan2(fracIm, fracRe);
                const yMag = Math.cbrt(r);
                const yArg = theta / 3;

                const yRe = yMag * Math.cos(yArg);
                const yIm = yMag * Math.sin(yArg);

                // Map to 3D coords
                const x = zRe;
                const y = zIm;
                const z = yRe; // Use Re(y) as height

                positions.push(x * scale, y * scale, z * scale);
                normals.push(0, 0, 1); // placeholder normals
                uvs.push(i / segments, j / segments);
            }
        }

        const indices: number[] = [];
        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < segments; j++) {
                const a = i * (segments + 1) + j;
                const b = a + segments + 1;
                const c = b + 1;
                const d = a + 1;
                indices.push(a, b, d);
                indices.push(b, c, d);
            }
        }

        geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        geom.setIndex(indices);
        geom.computeVertexNormals();

        return geom;
    }, [radius, segments, scale]);

    return (
        <mesh geometry={geometry}>
            <meshStandardMaterial color={color} side={THREE.DoubleSide} />
        </mesh>
    );
}