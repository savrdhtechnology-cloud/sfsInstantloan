"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function FinancialObject() {
  const ref = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.x += (pointer.y * 0.12 - ref.current.rotation.x) * 0.04;
    ref.current.rotation.z += (-pointer.x * 0.08 - ref.current.rotation.z) * 0.04;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08;
  });

  return (
    <group ref={ref}>
      <Float speed={1.2} rotationIntensity={0.18} floatIntensity={0.35}>
        <RoundedBox args={[3.3, 2.15, 0.22]} radius={0.18} smoothness={8}>
          <meshPhysicalMaterial color="#151515" metalness={0.2} roughness={0.12} transmission={0.35} transparent opacity={0.92} clearcoat={1} clearcoatRoughness={0.08}/>
        </RoundedBox>
        <mesh position={[0, 0, -0.18]}>
          <boxGeometry args={[3.08, 1.9, 0.05]} />
          <meshStandardMaterial color="#050505" metalness={0.45} roughness={0.28} />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 2.65, 0.15, 0]} scale={1.32}>
        <torusGeometry args={[1.8, 0.012, 12, 120]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.52} />
      </mesh>
      <mesh rotation={[Math.PI / 2.15, -0.3, 0.3]} scale={1.05}>
        <torusGeometry args={[1.8, 0.008, 12, 120]} />
        <meshBasicMaterial color="#f5f5f5" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export function FinancialScene() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5.8], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 4]} intensity={2.4} color="#fff2c0" />
      <pointLight position={[-3, -1, 3]} intensity={16} distance={8} color="#d4af37" />
      <FinancialObject />
    </Canvas>
  );
}
