
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
  segments = 80,
  scale = 24,
  color = '#ff6f61',
  wireframe = !false,
  rotationSpeed = 0.2,
} : BoysSurfaceProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Parametric equation for Boy's surface
  const boySurface = (u: number, v: number, target: THREE.Vector3) => {
    const U = u * Math.PI;
    const V = v * Math.PI;
    const denom = 2 - Math.sqrt(2) * Math.sin(3 * U) * Math.sin(2 * V);

    const x = (Math.sqrt(2) * Math.cos(U) * Math.sin(2 * V)) / denom;
    const y = (Math.sqrt(2) * Math.sin(U) * Math.sin(2 * V)) / denom;
    const z = (Math.sqrt(2) * Math.cos(V)) / denom;

    target.set(x, y, z).multiplyScalar(scale);
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