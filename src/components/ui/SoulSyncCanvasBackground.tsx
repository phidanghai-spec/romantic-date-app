'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

// ─── Configuration ───────────────────────────────────
const PARTICLE_COUNT = 280;
const HEART_COUNT = 12;
const COLORS = {
  roseGold: new THREE.Color('#ff70a6'),
  peach: new THREE.Color('#ff9770'),
  pearl: new THREE.Color('#fff5f5'),
  blush: new THREE.Color('#fda4af'),
  starBlue: new THREE.Color('#93c5fd'),
};

// Heart 3D shape (parametric curve)
function createHeartShape(): THREE.Shape {
  const shape = new THREE.Shape();
  const x = 0, y = 0;
  shape.moveTo(x, y + 0.5);
  shape.bezierCurveTo(x, y + 0.5, x - 0.5, y, x - 0.5, y);
  shape.bezierCurveTo(x - 0.5, y - 0.35, x, y - 0.65, x, y - 1);
  shape.bezierCurveTo(x, y - 0.65, x + 0.5, y - 0.35, x + 0.5, y);
  shape.bezierCurveTo(x + 0.5, y, x, y + 0.5, x, y + 0.5);
  return shape;
}

// ─── Component ───────────────────────────────────────
export default function SoulSyncCanvasBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const rafRef = useRef<number>(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const clockRef = useRef(new THREE.Clock());

  // Particle data refs
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const heartMeshesRef = useRef<THREE.Mesh[]>([]);
  const particleVelocitiesRef = useRef<Float32Array | null>(null);
  const particlePhasesRef = useRef<Float32Array | null>(null);

  const isVisibleRef = useRef(true);

  // Smooth mouse lerp
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Pause when tab is hidden
  const handleVisibilityChange = useCallback(() => {
    isVisibleRef.current = !document.hidden;
    if (isVisibleRef.current) {
      clockRef.current.getDelta(); // Reset delta to prevent jump
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ─── Three.js Setup ──────────────
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Transparent background — lets the cream bg show through
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // Fully transparent
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ─── Particle Cloud (BufferGeometry) ──────────
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);

    const colorPalette = [COLORS.roseGold, COLORS.peach, COLORS.pearl, COLORS.blush, COLORS.starBlue];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Distribute particles in a large sphere
      const radius = 20 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 10;

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = 0.8 + Math.random() * 2.5;

      // Floating velocity (very gentle)
      velocities[i3] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.005;

      phases[i] = Math.random() * Math.PI * 2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    particleVelocitiesRef.current = velocities;
    particlePhasesRef.current = phases;

    // Soft glowing circle sprite for particles
    const particleCanvas = document.createElement('canvas');
    particleCanvas.width = 64;
    particleCanvas.height = 64;
    const pCtx = particleCanvas.getContext('2d')!;
    const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 200, 210, 0.8)');
    gradient.addColorStop(0.7, 'rgba(255, 112, 166, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 112, 166, 0)');
    pCtx.fillStyle = gradient;
    pCtx.fillRect(0, 0, 64, 64);

    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.5,
      sizeAttenuation: true,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    particleSystemRef.current = particleSystem;

    // ─── Floating 3D Hearts ──────────
    const heartShape = createHeartShape();
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.08,
      bevelSegments: 3,
    };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

    const hearts: THREE.Mesh[] = [];

    for (let i = 0; i < HEART_COUNT; i++) {
      const heartMat = new THREE.MeshPhysicalMaterial({
        color: i % 3 === 0 ? '#ff70a6' : i % 3 === 1 ? '#fda4af' : '#ff9770',
        transparent: true,
        opacity: 0.35 + Math.random() * 0.25,
        roughness: 0.25,
        metalness: 0.5,
        side: THREE.DoubleSide,
        emissive: i % 2 === 0 ? '#ff70a6' : '#ff9770',
        emissiveIntensity: 0.15,
      });

      const heart = new THREE.Mesh(heartGeo, heartMat);
      const scale = 0.5 + Math.random() * 1.2;
      heart.scale.set(scale, scale, scale);

      heart.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20 - 8
      );

      heart.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Store animation metadata
      heart.userData = {
        floatSpeed: 0.3 + Math.random() * 0.5,
        floatAmplitude: 0.5 + Math.random() * 1.5,
        rotationSpeed: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        baseY: heart.position.y,
      };

      scene.add(heart);
      hearts.push(heart);
    }
    heartMeshesRef.current = hearts;

    // ─── Lighting ──────────
    const ambient = new THREE.AmbientLight('#fff5f5', 0.6);
    scene.add(ambient);

    const pointLight1 = new THREE.PointLight('#ff70a6', 1.2, 80);
    pointLight1.position.set(10, 10, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight('#93c5fd', 0.6, 60);
    pointLight2.position.set(-15, -5, 10);
    scene.add(pointLight2);

    // ─── Resize Handler ──────────
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ─── Animation Loop ──────────
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return; // Pause when hidden

      const elapsed = clockRef.current.getElapsedTime();

      // Smooth mouse lerp
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Camera parallax
      camera.position.x = mouse.x * 3;
      camera.position.y = mouse.y * 2;
      camera.lookAt(0, 0, 0);

      // Animate particles (heartbeat sine wave float)
      const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const vel = particleVelocitiesRef.current!;
      const pha = particlePhasesRef.current!;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        // Heartbeat-like oscillation
        const heartbeat = Math.sin(elapsed * 1.8 + pha[i]) * 0.5
          + Math.sin(elapsed * 3.6 + pha[i]) * 0.15;

        posArr[i3] += vel[i3] + Math.sin(elapsed * 0.3 + pha[i]) * 0.005;
        posArr[i3 + 1] += vel[i3 + 1] + heartbeat * 0.008;
        posArr[i3 + 2] += vel[i3 + 2];

        // Boundary soft wrap
        const dist = Math.sqrt(posArr[i3] ** 2 + posArr[i3 + 1] ** 2 + posArr[i3 + 2] ** 2);
        if (dist > 50) {
          posArr[i3] *= 0.95;
          posArr[i3 + 1] *= 0.95;
          posArr[i3 + 2] *= 0.95;
        }
      }
      posAttr.needsUpdate = true;

      // Rotate particle system subtly
      particleSystem.rotation.y = elapsed * 0.02 + mouse.x * 0.15;
      particleSystem.rotation.x = elapsed * 0.008 + mouse.y * 0.08;

      // Animate floating hearts
      hearts.forEach((heart) => {
        const { floatSpeed, floatAmplitude, rotationSpeed, phase, baseY } = heart.userData;
        heart.position.y = baseY + Math.sin(elapsed * floatSpeed + phase) * floatAmplitude;
        heart.rotation.y += rotationSpeed * 0.008;
        heart.rotation.z += rotationSpeed * 0.004;
        // Subtle mouse-driven tilt
        heart.rotation.x += (mouse.y * 0.01 - heart.rotation.x * 0.001);
      });

      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup ──────────
    return () => {
      cancelAnimationFrame(rafRef.current);

      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Dispose Three.js resources
      hearts.forEach((h) => {
        (h.material as THREE.Material).dispose();
        h.geometry.dispose();
        scene.remove(h);
      });

      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      scene.remove(particleSystem);

      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleMouseMove, handleVisibilityChange]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
