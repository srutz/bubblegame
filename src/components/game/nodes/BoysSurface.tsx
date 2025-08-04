
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { ParametricGeometry } from 'three-stdlib';

type BoysSurfaceProps = {
  segments?: number;
  scale?: number;
  color?: string;
  wireframe?: boolean;
  rotationSpeed?: number;
}

export function BoysSurface({
  segments = 180,
  scale = 24,
  color = '#ff6f61',
  wireframe = !false,
  rotationSpeed = 0.2,
} : BoysSurfaceProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Parametric equation for Boy's surface
  const boySurface = (u: number, v: number, target: THREE.Vector3) => {
    /*
    const U = u * Math.PI;
    const V = v * Math.PI;
    const denom = 2 - Math.sqrt(2) * Math.sin(3 * U) * Math.sin(2 * V);

    const x = (Math.sqrt(2) * Math.cos(U) * Math.sin(2 * V)) / denom;
    const y = (Math.sqrt(2) * Math.sin(U) * Math.sin(2 * V)) / denom;
    const z = (Math.sqrt(2) * Math.cos(V)) / denom;

    target.set(x, y, z).multiplyScalar(scale);
    */
    // pseudocode for mathematica
    /*
    z := u + v I
g1 := -(3/2) Im[(z (1 - z^4))/(z^6 + z^3 Sqrt[5] - 1)]
g2 := -(3/2) Re[(z (1 + z^4))/(z^6 + z^3 Sqrt[5] - 1)]
g3 := Im[(1 + z^6)/(z^6 + z^3 Sqrt[5] - 1)] - 1/2
g = g1^2 + g2^2 + g3^2;
    */
    const zRe = u + v * Math.PI;
    const zIm = v * Math.PI;
    const z2Re = zRe * zRe - zIm * zIm;
    const z2Im = 2 * zRe * zIm;

    // Compute numerator and denominator
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

    target.set(x * scale, y * scale, z * scale);

  };

  const geometry = new ParametricGeometry(boySurface, segments, segments);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * delta;
      meshRef.current.rotation.x += rotationSpeed * 0.3 * delta;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color={color} wireframe={wireframe} metalness={0.6} roughness={0.3} />
    </mesh>
  );
};