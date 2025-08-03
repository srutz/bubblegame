import { Euler, Vector3 } from "three";

export function deg2rad(degrees: number) {
    return degrees * (Math.PI / 180);
}

export function rad2deg(radians: number) {
    return radians * (180 / Math.PI);
}

export function vector3ArrayToString(v: [number, number, number], precision: number = 3) {
    const [x, y, z] = v;
    return `${x.toFixed(precision)}, ${y.toFixed(precision)}, ${z.toFixed(precision)}`
}

export function vector3ToString(v: Vector3, precision: number = 3) {
    return `(${v.x.toFixed(precision)}, ${v.y.toFixed(precision)}, ${v.z.toFixed(precision)})`
}

export function euler3ToString(e: Euler, precision: number = 1) {
    return `(${rad2deg(e.x).toFixed(precision)}, ${rad2deg(e.y).toFixed(precision)}, ${rad2deg(e.z).toFixed(precision)})`
}

export function euler3ArrayToString(e: [number, number, number], precision: number = 1) {
    const [x, y, z] = e;
    return `${rad2deg(x).toFixed(precision)}, ${rad2deg(y).toFixed(precision)}, ${rad2deg(z).toFixed(precision)}`
}

export function gcd(a: number, b: number) {
  a = Math.abs(Math.floor(a))
  b = Math.abs(Math.floor(b))
  while (b !== 0) {
    const temp: number = b
    b = a % b
    a = temp
  }
  return Math.max(a, 1)
}
