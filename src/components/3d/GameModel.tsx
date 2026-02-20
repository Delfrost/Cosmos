'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function CyberCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Rotate slowly
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        {/* The Shape: Icosahedron (20-sided die) */}
        <icosahedronGeometry args={[1, 0]} />
        {/* The Material: Wireframe Neon Green */}
        <meshStandardMaterial 
          color="#00ff9d" 
          wireframe 
          emissive="#00ff9d"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* Inner Core (Solid Black to block background) */}
      <mesh scale={1.75}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </Float>
  );
}

export default function GameModel() {
  return (
    <div className="w-full h-[50vh] md:h-[600px] cursor-move">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00ff9d" intensity={2} />
        <spotLight position={[-10, -10, -10]} color="purple" intensity={2} />
        
        {/* The Object */}
        <CyberCrystal />
        
        {/* Floor Reflection */}
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.5} 
          scale={10} 
          blur={2.5} 
          far={4} 
          color="#00ff9d" 
        />
        
        {/* Environment Reflection */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}