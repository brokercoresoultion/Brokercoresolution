import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Icosahedron, Torus, Octahedron, Cylinder, Box } from '@react-three/drei';

const LiquidSphere = ({ isHovered }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * (isHovered ? 2 : 0.5);
    meshRef.current.rotation.y += delta * (isHovered ? 2 : 0.5);
  });
  return (
    <mesh ref={meshRef} scale={1.2}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial color="#06b6d4" emissive="#002244" distort={isHovered ? 0.6 : 0.3} speed={isHovered ? 4 : 1} roughness={0.2} metalness={0.8} />
    </mesh>
  );
};

const PlatformTorus = ({ isHovered }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * (isHovered ? 2 : 0.5);
    meshRef.current.rotation.y += delta * (isHovered ? 1.5 : 0.3);
  });
  return (
    <Torus ref={meshRef} args={[0.8, 0.3, 16, 100]} scale={0.8}>
      <meshStandardMaterial color="#b026ff" emissive="#2a004d" roughness={0.1} metalness={0.9} wireframe={isHovered} />
    </Torus>
  );
};

const CrmRings = ({ isHovered }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * (isHovered ? 3 : 1);
    meshRef.current.rotation.y -= delta * (isHovered ? 2 : 0.5);
  });
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.6, 0.15, 100, 16]} />
      <meshStandardMaterial color="#00ff88" emissive="#003311" roughness={0.3} metalness={0.8} />
    </mesh>
  );
};

const VpsCube = ({ isHovered }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * (isHovered ? 2 : 0.2);
    meshRef.current.rotation.y += delta * (isHovered ? 2 : 0.2);
  });
  return (
    <Box ref={meshRef} args={[1.2, 1.2, 1.2]}>
      <meshStandardMaterial color="#3b82f6" emissive="#0a1a3a" roughness={0.2} metalness={0.8} wireframe={true} />
    </Box>
  );
};

const RiskShield = ({ isHovered }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * (isHovered ? 4 : 1);
  });
  return (
    <Octahedron ref={meshRef} args={[1.2]} rotation={[0, 0, Math.PI / 4]}>
      <meshStandardMaterial color="#ef4444" emissive="#330000" roughness={0.1} metalness={0.9} />
    </Octahedron>
  );
};

const ComplianceCylinder = ({ isHovered }) => {
  const meshRef = useRef();
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * (isHovered ? 2 : 0.5);
    meshRef.current.rotation.z += delta * (isHovered ? 2 : 0.5);
  });
  return (
    <Cylinder ref={meshRef} args={[0.8, 0.8, 1.5, 32]}>
      <meshStandardMaterial color="#f59e0b" emissive="#331a00" roughness={0.2} metalness={0.7} />
    </Cylinder>
  );
};

export default function Service3DElement({ type, isHovered }) {
  return (
    <div className="w-24 h-24 absolute right-4 top-4 opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <React.Suspense fallback={null}>
          {type === 'liquidity' && <LiquidSphere isHovered={isHovered} />}
          {type === 'platform' && <PlatformTorus isHovered={isHovered} />}
          {type === 'crm' && <CrmRings isHovered={isHovered} />}
          {type === 'vps' && <VpsCube isHovered={isHovered} />}
          {type === 'risk' && <RiskShield isHovered={isHovered} />}
          {type === 'compliance' && <ComplianceCylinder isHovered={isHovered} />}
        </React.Suspense>
      </Canvas>
    </div>
  );
}
