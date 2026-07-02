import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

// ─── THE PLEXUS NETWORK (INSTITUTIONAL TECH WEB) ───
const Plexus = () => {
  const pointsRef = useRef();
  const linesRef = useRef();

  // Reduce nodes on mobile to maintain 60 FPS and save battery
  const particleCount = window.innerWidth < 768 ? 60 : 200;
  const maxDistance = 3.5; // Max distance to draw a line between nodes
  const boxSize = 20; // Spread of the network

  // Initialize positions, velocities, and colors
  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    const col = new Float32Array(particleCount * 3);
    
    const colorCyan = new THREE.Color('#00E5FF');
    const colorEmerald = new THREE.Color('#00E676');

    for (let i = 0; i < particleCount; i++) {
      // Random position within a box
      pos[i * 3] = (Math.random() - 0.5) * boxSize;
      pos[i * 3 + 1] = (Math.random() - 0.5) * boxSize;
      pos[i * 3 + 2] = (Math.random() - 0.5) * boxSize;

      // Random gentle velocity
      vel.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );

      // Randomly assign cyan or emerald to nodes
      const nodeColor = Math.random() > 0.5 ? colorCyan : colorEmerald;
      col[i * 3] = nodeColor.r;
      col[i * 3 + 1] = nodeColor.g;
      col[i * 3 + 2] = nodeColor.b;
    }
    return { positions: pos, velocities: vel, colors: col };
  }, []);

  // Prepare line segments (max possible lines = (n * (n-1)) / 2)
  // We allocate a large buffer and only draw what is connected
  const maxLines = (particleCount * (particleCount - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    
    // 1. Move the nodes
    for (let i = 0; i < particleCount; i++) {
      positionsArray[i * 3] += velocities[i * 3];
      positionsArray[i * 3 + 1] += velocities[i * 3 + 1];
      positionsArray[i * 3 + 2] += velocities[i * 3 + 2];

      // Keep them inside the bounding box by bouncing them off the invisible walls
      for (let j = 0; j < 3; j++) {
        if (Math.abs(positionsArray[i * 3 + j]) > boxSize / 2) {
          velocities[i * 3 + j] *= -1; // Reverse velocity
        }
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // 2. Connect nodes that are close to each other
    let lineIndex = 0;
    
    // Very basic distance check (O(n^2) but n=200 is fast enough for JS)
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          // Calculate opacity based on distance (closer = more opaque)
          const dist = Math.sqrt(distSq);
          const alpha = 1.0 - (dist / maxDistance);
          
          // We use vertex colors to apply the fading opacity effect to the lines
          const r1 = colors[i * 3]; const g1 = colors[i * 3 + 1]; const b1 = colors[i * 3 + 2];
          const r2 = colors[j * 3]; const g2 = colors[j * 3 + 1]; const b2 = colors[j * 3 + 2];

          // Point A
          linePositions[lineIndex * 3] = positionsArray[i * 3];
          linePositions[lineIndex * 3 + 1] = positionsArray[i * 3 + 1];
          linePositions[lineIndex * 3 + 2] = positionsArray[i * 3 + 2];
          
          lineColors[lineIndex * 3] = r1 * alpha;
          lineColors[lineIndex * 3 + 1] = g1 * alpha;
          lineColors[lineIndex * 3 + 2] = b1 * alpha;
          lineIndex++;

          // Point B
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

    // Tell Three.js to only draw the exact number of lines we calculated this frame
    linesRef.current.geometry.setDrawRange(0, lineIndex);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
    
    // Slowly rotate the entire network for a very premium feel
    pointsRef.current.parent.rotation.y += 0.001;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* The Nodes (Dots) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      {/* The Connections (Lines) */}
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

// ─── MAIN SCENE ───
const Global3DScene = () => {
  const sceneGroup = useRef();
  const tl = useRef();
  const scrollTarget = useRef(0);
  const currentScroll = useRef(0);

  useLayoutEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    
    // Camera very slowly drifts through the network on scroll
    tl.current
      // Hero (Network centered, slightly pulled back)
      .to(sceneGroup.current.position, { z: -5, x: 0, y: 0, duration: 1 }, 0)
      .to(sceneGroup.current.rotation, { y: Math.PI / 16, x: 0.05, duration: 1 }, 0)
      
      // Services (Fly deeper into the network, pan left)
      .to(sceneGroup.current.position, { z: 2, x: -3, y: 1, duration: 1 }, 1)
      .to(sceneGroup.current.rotation, { y: -Math.PI / 12, x: 0, duration: 1 }, 1)
      
      // Features (Fly even deeper, pan right)
      .to(sceneGroup.current.position, { z: 5, x: 3, y: -2, duration: 1 }, 2)
      .to(sceneGroup.current.rotation, { y: Math.PI / 8, x: -0.1, duration: 1 }, 2)
      
      // Footer (Pull back to reveal the macro network)
      .to(sceneGroup.current.position, { z: -10, x: 0, y: 0, duration: 1 }, 3)
      .to(sceneGroup.current.rotation, { y: 0, x: 0, duration: 1 }, 3);

  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget.current = maxScroll > 0 ? Math.max(0, Math.min(scrollY / maxScroll, 1)) : 0;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (tl.current) {
      currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, scrollTarget.current, 1.5 * delta);
      tl.current.seek(currentScroll.current * tl.current.duration());
    }
  });

  return (
    <>
      <color attach="background" args={['#080a10']} />
      
      <ambientLight intensity={1} />
      
      {/* Fog ensures the network fades smoothly into the deep dark background */}
      <fog attach="fog" args={['#080a10', 5, 20]} />

      <group ref={sceneGroup}>
        <Plexus />
      </group>
    </>
  );
};

export default Global3DScene;
