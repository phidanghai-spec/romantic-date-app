"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Tulip3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ánh sáng lãng mạn Warm Rose
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf472b6, 2.5, 20);
    pointLight.position.set(3, 4, 5);
    scene.add(pointLight);

    const softBlueLight = new THREE.PointLight(0x60a5fa, 1.5, 20);
    softBlueLight.position.set(-4, -2, 4);
    scene.add(softBlueLight);

    // Group chứa búp hoa Tulip 3D trung tâm
    const tulipGroup = new THREE.Group();

    // Tạo các cánh hoa Tulip khum hình bầu dục
    const petalMaterial = new THREE.MeshStandardMaterial({
      color: 0xfb7185,
      roughness: 0.35,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
    });

    const petalCount = 6;
    for (let i = 0; i < petalCount; i++) {
      const angle = (i / petalCount) * Math.PI * 2;
      const petalGeo = new THREE.SphereGeometry(1.1, 32, 16, 0, Math.PI / 1.8, 0, Math.PI / 1.1);
      const petalMesh = new THREE.Mesh(petalGeo, petalMaterial);
      
      petalMesh.rotation.y = angle;
      petalMesh.rotation.x = 0.25;
      petalMesh.position.y = -0.3;
      tulipGroup.add(petalMesh);
    }

    // Cuống hoa cong nhẹ
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.6, 0),
      new THREE.Vector3(0.1, -1.8, 0),
      new THREE.Vector3(-0.05, -3.2, 0),
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 20, 0.06, 8, false);
    const stemMat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.6 });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    tulipGroup.add(stemMesh);

    tulipGroup.position.set(1.8, -0.2, 0);
    scene.add(tulipGroup);

    // Hệ thống hạt cánh hoa trôi nổi (Floating Flower Particles)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      speeds[i] = 0.005 + Math.random() * 0.01;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf472b6,
      size: 0.09,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Auto-pause when tab hidden
    let isVisible = true;
    const onVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Cánh hoa Tulip thở & nhấp nhô mượt mà
      tulipGroup.rotation.y = elapsedTime * 0.25;
      tulipGroup.position.y = -0.2 + Math.sin(elapsedTime * 1.2) * 0.12;

      // Parallax chuột
      targetX += (mouseX * 0.5 - targetX) * 0.05;
      targetY += (mouseY * 0.3 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Cánh hoa nhỏ rơi xoay vòng
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] -= speeds[i];
        if (posArray[i * 3 + 1] < -5) {
          posArray[i * 3 + 1] = 5;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Event
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // Cleanup tránh rò rỉ RAM/GPU
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      // Dispose geometry & materials
      tulipGroup.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (child.material as THREE.Material).dispose();
        }
      });
      particleGeo.dispose();
      particleMat.dispose();
      stemGeo.dispose();
      stemMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0" />;
}
