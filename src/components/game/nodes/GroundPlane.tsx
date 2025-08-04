import { useMemo, useRef } from "react";
import * as THREE from "three";

export function GroundPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 80, 80);
    const colors = new Float32Array(geo.attributes.position.count * 3);
    
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const x = geo.attributes.position.getX(i);
      const z = geo.attributes.position.getZ(i);
      
      // Create a proper hexagonal pattern using distance-based approach
      const hexSize = 1.5;
      
      // Convert to hexagonal grid coordinates
      const q = (Math.sqrt(3)/3 * x - 1./3 * z) / hexSize;
      const r = (2./3 * z) / hexSize;
      
      // Round to nearest hex using cube coordinates
      const cubeX = q;
      const cubeZ = r;
      const cubeY = -cubeX - cubeZ;
      
      let rx = Math.round(cubeX);
      let ry = Math.round(cubeY);
      let rz = Math.round(cubeZ);
      
      const xDiff = Math.abs(rx - cubeX);
      const yDiff = Math.abs(ry - cubeY);
      const zDiff = Math.abs(rz - cubeZ);
      
      if (xDiff > yDiff && xDiff > zDiff) {
        rx = -ry - rz;
      } else if (yDiff > zDiff) {
        ry = -rx - rz;
      } else {
        rz = -rx - ry;
      }
      
      // Create alternating hex pattern
      const hexIndex = (rx + ry + rz) % 3;
      const distance = Math.sqrt(rx*rx + ry*ry + rz*rz);
      
      let intensity = 0.3;
      if (hexIndex === 0) {
        intensity = 0.7;
      } else if (hexIndex === 1) {
        intensity = 0.5;
      }
      
      // Add some variation based on distance from center
      const variation = (Math.sin(distance * 0.5) + 1) * 0.1;
      intensity += variation;
      
      colors[i * 3] = intensity * 0.4 + 0.1;     // r
      colors[i * 3 + 1] = intensity * 0.5 + 0.2; // g
      colors[i * 3 + 2] = intensity * 0.6 + 0.3; // b
    }
    
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} scale={5} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <meshBasicMaterial vertexColors />
    </mesh>
  );
}