import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { VASTU_ZONES } from '../../data/vastuData';
import { VastuZone } from '../../types';
import { isWebGLAvailable } from '../../lib/webglDetect';

interface VastuCompass3DProps {
  selectedZone: VastuZone;
  onSelectZone: (zone: VastuZone) => void;
  className?: string;
}

export const VastuCompass3D: React.FC<VastuCompass3DProps> = ({
  selectedZone,
  onSelectZone,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (isReducedMotion || !isWebGLAvailable()) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const canvas = document.createElement('canvas');

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a14, 0.04);

    camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 5.5, 7.5);
    camera.lookAt(0, 0, 0);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xe8d5a8, 1.5);
    dirLight.position.set(4, 8, 4);
    scene.add(dirLight);

    const goldCoreLight = new THREE.PointLight(0xc8a45d, 1.8, 10);
    goldCoreLight.position.set(0, 1.5, 0);
    scene.add(goldCoreLight);

    // Master Compass Group
    const compassGroup = new THREE.Group();
    scene.add(compassGroup);

    // Outer Rim Base
    const rimGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.3, 48);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x10152a,
      roughness: 0.4,
      metalness: 0.8,
      wireframe: false
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.y = -0.15;
    compassGroup.add(rimMesh);

    // Gold Outer Border Torus
    const goldRingGeo = new THREE.TorusGeometry(3.6, 0.04, 16, 64);
    const goldRingMat = new THREE.MeshStandardMaterial({
      color: 0xc8a45d,
      roughness: 0.2,
      metalness: 0.95
    });
    const goldRing = new THREE.Mesh(goldRingGeo, goldRingMat);
    goldRing.rotation.x = Math.PI / 2;
    compassGroup.add(goldRing);

    // Brahmasthan Central Sacred Core
    const coreGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.15, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xc8a45d,
      emissive: 0x5a4312,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.9
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.02;
    compassGroup.add(coreMesh);

    // 8 Directional Wedge Sectors
    const wedgeMeshes: { mesh: THREE.Mesh; zone: VastuZone; targetAngle: number }[] = [];
    const wedgeAngle = (Math.PI * 2) / 8;

    // Angles mapped to cardinal directions in 3D (0 is North -Z, PI/2 is East +X)
    const directionAngles: { [key: string]: number } = {
      N: 0,
      NE: Math.PI / 4,
      E: Math.PI / 2,
      SE: (3 * Math.PI) / 4,
      S: Math.PI,
      SW: (5 * Math.PI) / 4,
      W: (6 * Math.PI) / 4,
      NW: (7 * Math.PI) / 4
    };

    VASTU_ZONES.forEach(zone => {
      const angle = directionAngles[zone.code] || 0;

      // Create wedge geometry using CylinderGeometry with thetaStart & thetaLength
      const sectorGeo = new THREE.CylinderGeometry(
        3.4,
        3.4,
        0.1,
        16,
        1,
        false,
        angle - wedgeAngle / 2,
        wedgeAngle * 0.94
      );

      const isCurrent = zone.code === selectedZone.code;
      const sectorMat = new THREE.MeshStandardMaterial({
        color: isCurrent ? 0xc8a45d : 0x161e38,
        emissive: isCurrent ? 0x8a6a2a : 0x050811,
        emissiveIntensity: isCurrent ? 0.8 : 0.1,
        roughness: 0.3,
        metalness: 0.6
      });

      const sectorMesh = new THREE.Mesh(sectorGeo, sectorMat);
      sectorMesh.position.y = 0.04;
      sectorMesh.userData = { zone };
      compassGroup.add(sectorMesh);

      wedgeMeshes.push({
        mesh: sectorMesh,
        zone,
        targetAngle: angle
      });

      // Pointer beacon on outer perimeter
      const beaconGeo = new THREE.BoxGeometry(0.12, 0.25, 0.4);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: 0xe8d5a8,
        metalness: 0.9
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      const bx = Math.sin(angle) * 3.4;
      const bz = -Math.cos(angle) * 3.4;
      beacon.position.set(bx, 0.15, bz);
      beacon.rotation.y = angle;
      compassGroup.add(beacon);
    });

    // Pointer Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(wedgeMeshes.map(w => w.mesh));
      if (hits.length > 0) {
        const hitZone = hits[0].object.userData.zone as VastuZone;
        if (hitZone) {
          onSelectZone(hitZone);
        }
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    // Resize
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newW = container.clientWidth || 300;
      const newH = container.clientHeight || 300;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // Target rotation toward selected direction
    let targetRotationY = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smoothly rotate compass to emphasize selected direction
      const currentTargetZoneAngle = directionAngles[selectedZone.code] || 0;
      targetRotationY = -currentTargetZoneAngle;

      compassGroup.rotation.y += (targetRotationY - compassGroup.rotation.y) * 0.05;
      compassGroup.rotation.x = 0.25 + Math.sin(Date.now() * 0.001) * 0.02;

      // Update materials
      wedgeMeshes.forEach(item => {
        const isMatch = item.zone.code === selectedZone.code;
        const mat = item.mesh.material as THREE.MeshStandardMaterial;
        if (isMatch) {
          mat.color.setHex(0xc8a45d);
          mat.emissive.setHex(0x9a7a2a);
          mat.emissiveIntensity = 0.9;
          item.mesh.position.y = 0.12; // elevated wedge
        } else {
          mat.color.setHex(0x161e38);
          mat.emissive.setHex(0x050811);
          mat.emissiveIntensity = 0.1;
          item.mesh.position.y = 0.04;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('click', handleClick);
      renderer.dispose();
      rimGeo.dispose();
      rimMat.dispose();
      goldRingGeo.dispose();
      goldRingMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isReducedMotion, selectedZone, onSelectZone]);

  if (!hasWebGL || isReducedMotion) {
    return (
      <div className={`relative flex flex-col items-center justify-center p-6 rounded-2xl bg-[#10152A] border border-[#C8A45D]/30 ${className}`}>
        <div className="relative w-64 h-64 rounded-full border border-[#C8A45D]/40 flex items-center justify-center bg-[radial-gradient(circle,rgba(200,164,93,0.15)_0%,transparent_70%)]">
          <div className="w-24 h-24 rounded-full bg-[#080A14] border border-[#C8A45D] flex flex-col items-center justify-center text-center p-2">
            <span className="text-[10px] text-[#C8A45D] uppercase tracking-widest font-mono">Center</span>
            <span className="text-xs text-[#F7F4EC] font-serif font-bold">Brahmasthan</span>
          </div>

          {/* 8 Direction buttons around compass */}
          {VASTU_ZONES.map((z, idx) => {
            const rad = (idx * (360 / 8) - 90) * (Math.PI / 180);
            const x = Math.cos(rad) * 98;
            const y = Math.sin(rad) * 98;
            const isCur = z.code === selectedZone.code;

            return (
              <button
                key={z.code}
                onClick={() => onSelectZone(z)}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isCur
                    ? 'bg-[#C8A45D] text-[#080A14] scale-125 shadow-[0_0_15px_rgba(200,164,93,0.8)]'
                    : 'bg-[#080A14] text-[#E8D5A8] border border-[#C8A45D]/30 hover:border-[#C8A45D]'
                }`}
              >
                {z.code}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-[#080A14] border border-[#C8A45D]/20 ${className}`}>
      <div ref={containerRef} className="w-full h-full cursor-pointer" />

      {/* Compass HUD Overlay */}
      <div className="absolute top-3 left-4 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#C8A45D]" />
        <span className="text-[11px] font-mono tracking-wider text-[#E8D5A8]/90 uppercase">
          Vastu Purusha Mandala · {selectedZone.direction} ({selectedZone.code})
        </span>
      </div>

      <div className="absolute bottom-3 inset-x-0 flex justify-center items-center pointer-events-none">
        <span className="text-[11px] text-[#9EA3B5] px-3 py-1 rounded-full bg-[#10152A]/85 border border-white/5 backdrop-blur-sm">
          Click any 3D sector or directional tag below to orient
        </span>
      </div>
    </div>
  );
};
