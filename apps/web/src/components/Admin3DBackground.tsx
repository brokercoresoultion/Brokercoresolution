import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Plexus = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);

  const particleCount = window.innerWidth < 768 ? 60 : 200;
  const maxDistance = 3.5;
  const boxSize = 20;

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel: number[] = [];
    const col = new Float32Array(particleCount * 3);
    
    const colorCyan = new THREE.Color('#00E5FF');
    const colorEmerald = new THREE.Color('#00E676');

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * boxSize;
      pos[i * 3 + 1] = (Math.random() - 0.5) * boxSize;
      pos[i * 3 + 2] = (Math.random() - 0.5) * boxSize;

      vel.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );

      const nodeColor = Math.random() > 0.5 ? colorCyan : colorEmerald;
      col[i * 3] = nodeColor.r;
      col[i * 3 + 1] = nodeColor.g;
      col[i * 3 + 2] = nodeColor.b;
    }
    return { positions: pos, velocities: vel, colors: col };
  }, []);

  const maxLines = (particleCount * (particleCount - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      positionsArray[i * 3] += velocities[i * 3];
      positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

      for (let j = 0; j < 3; j++) {
        if (Math.abs(positionsArray[i * 3 + j]) > boxSize / 2) {
          velocities[i * 3 + j] *= -1;
        }
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    let lineIndex = 0;
    
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          const dist = Math.sqrt(distSq);
          const alpha = 1.0 - (dist / maxDistance);
          
          const r1 = colors[i * 3]; const g1 = colors[i * 3 + 1]; const b1 = colors[i * 3 + 2];
          const r2 = colors[j * 3]; const g2 = colors[j * 3 + 1]; const b2 = colors[j * 3 + 2];

          linePositions[lineIndex * 3] = positionsArray[i * 3];
          linePositions[lineIndex * 3 + 1] = positionsArray[i * 3 + 1];
          linePositions[lineIndex * 3 + 2] = positionsArray[i * 3 + 2];
          
          lineColors[lineIndex * 3] = r1 * alpha;
          lineColors[lineIndex * 3 + 1] = g1 * alpha;
          lineColors[lineIndex * 3 + 2] = b1 * alpha;
          lineIndex++;

          linePositions[lineIndex * 3] = positionsArray[j * 3];
          linePositions[lineIndex * 3 + 1] = positionsArray[j * 3 + 1];
          linePositions[lineIndex * 3 + 2] = positionsArray[j * 3 + 2];
          
          lineColors[lineIndex * 3] = r2 * alpha;
          lineColors[lineIndex * 3 + 1] = g2 * alpha;
          lineColors[lineIndex * 3 + 2] = b2 * alpha;
          lineIndex++;
        }
      }
    }

    linesRef.current.geometry.setDrawRange(0, lineIndex);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
    
    if (pointsRef.current.parent) {
      pointsRef.current.parent.rotation.y += 0.001;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={maxLines * 2} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={maxLines * 2} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.4} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
};

export default function Admin3DBackground() {
  const [isMobile, setIsMobile] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkDevice();
    setMounted(true);
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]">
      {(!mounted || isMobile) ? (
        <div className="absolute inset-0 overflow-hidden opacity-60">
          <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[70%] bg-cyan-400/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[-10%] right-[-20%] w-[70%] h-[70%] bg-white/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>
      ) : (
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }} 
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={1} />
          <fog attach="fog" args={['#020617', 5, 20]} />
          
          <group position={[0, 0, -5]}>
            <Plexus />
          </group>
        </Canvas>
      )}
    </div>
  );
}
