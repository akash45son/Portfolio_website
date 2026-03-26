import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export function LeftHero3D() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    if (outerRef.current) {
      outerRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      outerRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = state.clock.getElapsedTime() * -0.2;
      innerRef.current.rotation.y = state.clock.getElapsedTime() * -0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[-1, -0.5, -2]}>
          
          {/* Outer Minimalist Tech Wireframe */}
          <mesh ref={outerRef} scale={0.7}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial 
              color="#ff4d2d" 
              wireframe={true} 
              transparent 
              opacity={0.2} 
            />
          </mesh>
          
          {/* Inner Solid Tech Node */}
          <mesh ref={innerRef} scale={0.25}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color="#ff4d2d" 
              emissive="#ff4d2d"
              emissiveIntensity={1.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>

        </group>
      </Float>
    </>
  );
}
