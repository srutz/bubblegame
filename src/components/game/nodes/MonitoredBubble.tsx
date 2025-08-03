
import { Bubble } from '@/hooks/useGameStore';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { Cube } from './Cube';

interface MonitoredBubbleProps {
    bubble: Bubble;
    onTick: (rigidBodyRef: RapierRigidBody) => void;
}

export function MonitoredBubble({ bubble, onTick }: MonitoredBubbleProps) {
    const rigidBodyRef = useRef<RapierRigidBody>(null);
    useFrame(() => {
        if (rigidBodyRef.current) {
            onTick(rigidBodyRef.current)
        }
    });

    return (
        <RigidBody 
            ref={rigidBodyRef}
            colliders={'ball'}
            userData={{ bubbleId: bubble.id }}
        >
            <Cube position={[...bubble.position]} size={0.3}/>
        </RigidBody>
    );
}
