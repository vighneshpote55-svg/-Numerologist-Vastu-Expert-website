import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CanvasFallback } from './CanvasFallback';
import { isWebGLAvailable } from '../../lib/webglDetect';

interface NumericalUniverseProps {
  activeNumber: number;
  onSelectNumber: (num: number) => void;
  className?: string;
}

export const NumericalUniverse: React.FC<NumericalUniverseProps> = ({
  activeNumber,
  onSelectNumber,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const activeNumberRef = useRef(activeNumber);

  useEffect(() => {
    activeNumberRef.current = activeNumber;
  }, [activeNumber]);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReducedMotion || !isWebGLAvailable()) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const canvas = document.createElement('canvas');

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a14, 0.035);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 3, 11);
    camera.lookAt(0, 0, 0);

    // Adaptive pixel ratio: cap at 2 for performance, 1 on lower devices
    const isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.75));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xc8a45d, 2.5, 15);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const rimLight = new THREE.DirectionalLight(0xe8d5a8, 1.2);
    rimLight.position.set(5, 8, 5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x2a3b66, 0.8);
    fillLight.position.set(-5, -3, -5);
    scene.add(fillLight);

    // Central Radiant Sphere
    const coreGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xc8a45d,
      emissive: 0x8a6a2a,
      emissiveIntensity: 0.6,
      roughness: 0.25,
      metalness: 0.85
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreSphere);

    // Inner Glowing Halo Wireframe
    const haloGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xe8d5a8,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // Concentric Orbital Rings
    const ringsGroup = new THREE.Group();
    scene.add(ringsGroup);

    const ringRadii = [3.2, 4.3, 5.2];
    const ringTilts = [
      { x: 0.35, y: 0.1, z: 0.1 },
      { x: -0.4, y: 0.2, z: -0.2 },
      { x: 0.1, y: -0.3, z: 0.4 }
    ];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.02, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xc8a45d,
        roughness: 0.3,
        metalness: 0.9,
        transparent: true,
        opacity: 0.6 - i * 0.12
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.set(ringTilts[i].x, ringTilts[i].y, ringTilts[i].z);
      ringsGroup.add(ringMesh);
    });

    // 9 Interactive Number Nodes
    const nodeMeshes: { mesh: THREE.Mesh; number: number; baseAngle: number; ringIndex: number }[] = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodeGeo = new THREE.SphereGeometry(0.32, 24, 24);

    for (let i = 1; i <= 9; i++) {
      const ringIdx = (i - 1) % 3;
      const radius = ringRadii[ringIdx];
      const baseAngle = ((i - 1) / 9) * Math.PI * 2;

      const nodeMat = new THREE.MeshStandardMaterial({
        color: i === activeNumberRef.current ? 0xf7f4ec : 0xc8a45d,
        emissive: i === activeNumberRef.current ? 0xc8a45d : 0x221a08,
        emissiveIntensity: i === activeNumberRef.current ? 1.2 : 0.2,
        roughness: 0.2,
        metalness: 0.8
      });

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.userData = { number: i };
      nodeGroup.add(nodeMesh);

      nodeMeshes.push({
        mesh: nodeMesh,
        number: i,
        baseAngle,
        ringIndex: ringIdx
      });
    }

    // Floating Stardust Particles
    const particleCount = isMobile ? 120 : 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount * 3; p += 3) {
      particlePositions[p] = (Math.random() - 0.5) * 18;
      particlePositions[p + 1] = (Math.random() - 0.5) * 14;
      particlePositions[p + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xc8a45d,
      size: 0.06,
      transparent: true,
      opacity: 0.55
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Raycaster for Interactivity
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
      const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.mesh));

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData?.number) {
          onSelectNumber(hit.userData.number);
        }
      }
    };

    renderer.domElement.addEventListener('click', onPointerDown);

    // Smooth dragging / orbit rotation
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let rotVelocityX = 0;
    let rotVelocityY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      rotVelocityY = deltaX * 0.005;
      rotVelocityX = deltaY * 0.005;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newW = container.clientWidth || 300;
      const newH = container.clientHeight || 300;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // WebGL Context recovery listener
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setHasWebGL(false);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow orbital drift
      ringsGroup.rotation.y += 0.0018 + rotVelocityY;
      ringsGroup.rotation.x += 0.001 + rotVelocityX;
      haloMesh.rotation.y -= 0.003;
      haloMesh.rotation.x += 0.002;
      particles.rotation.y += 0.0006;

      // Pulse core gently
      const pulse = 1 + Math.sin(elapsedTime * 2) * 0.04;
      coreSphere.scale.set(pulse, pulse, pulse);

      // Dampen manual drag velocity
      rotVelocityX *= 0.94;
      rotVelocityY *= 0.94;

      // Position number nodes along orbits with subtle 3D wave
      nodeMeshes.forEach(item => {
        const speed = 0.25 - item.ringIndex * 0.04;
        const currentAngle = item.baseAngle + elapsedTime * speed;
        const r = ringRadii[item.ringIndex];
        const tilt = ringTilts[item.ringIndex];

        // Spherical parametric trajectory
        const x = Math.cos(currentAngle) * r;
        const z = Math.sin(currentAngle) * r;
        const y = Math.sin(currentAngle * 2 + item.number) * 0.45;

        // Apply tilt transformation
        const pos = new THREE.Vector3(x, y, z);
        pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), tilt.x);
        pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), tilt.y);
        pos.applyAxisAngle(new THREE.Vector3(0, 0, 1), tilt.z);
        item.mesh.position.copy(pos);

        // Highlight selected node
        const isSelected = item.number === activeNumberRef.current;
        const mat = item.mesh.material as THREE.MeshStandardMaterial;
        if (isSelected) {
          mat.color.setHex(0xf7f4ec);
          mat.emissive.setHex(0xc8a45d);
          mat.emissiveIntensity = 1.4;
          const targetScale = 1.35 + Math.sin(elapsedTime * 4) * 0.08;
          item.mesh.scale.set(targetScale, targetScale, targetScale);
        } else {
          mat.color.setHex(0xc8a45d);
          mat.emissive.setHex(0x1a1205);
          mat.emissiveIntensity = 0.2;
          item.mesh.scale.set(1, 1, 1);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('click', onPointerDown);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);

      // Clean GPU memory
      coreGeo.dispose();
      coreMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      nodeGeo.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isReducedMotion, onSelectNumber]);

  if (!hasWebGL || isReducedMotion) {
    return (
      <CanvasFallback
        activeNumber={activeNumber}
        onSelectNumber={onSelectNumber}
        className={className}
      />
    );
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#080A14] border border-[#C8A45D]/20 ${className}`}>
      {/* 3D WebGL Canvas Target */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Overlays */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#C8A45D] animate-ping" />
        <span className="text-[11px] font-mono tracking-widest uppercase text-[#E8D5A8]/80">
          Vibrational Matrix 1–9
        </span>
      </div>

      <div className="absolute bottom-4 inset-x-0 flex justify-center items-center pointer-events-none">
        <span className="text-[11px] text-[#9EA3B5] px-3 py-1 rounded-full bg-[#10152A]/80 border border-white/5 backdrop-blur-sm">
          Drag to rotate · Click orbital node to inspect
        </span>
      </div>
    </div>
  );
};
