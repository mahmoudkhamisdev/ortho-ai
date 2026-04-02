
"use client";

import type React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Html,
  ContactShadows,
  Environment,
  Bounds,
  Grid,
} from "@react-three/drei";
import { Suspense, useState, useRef, useCallback, useMemo } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface ToothData {
  id: string;
  mesh: THREE.Mesh;
  center: THREE.Vector3;
  size: THREE.Vector3;
  volume: number;
  area: number;
}

interface Transform {
  pos: { x: number; y: number; z: number };
  rot: { x: number; y: number; z: number };
  scl: number;
}

/**
 * MandibleModel now auto-centers and auto-scales the loaded GLTF so it fits nicely.
 * scaleFactor and center are computed once per loaded scene (useMemo).
 */
function MandibleModel({
  url,
  selectedTeeth,
  onSelect,
  orbitControlsRef,
  transforms,
}: {
  url: string;
  selectedTeeth: string[];
  onSelect: (t: ToothData) => void;
  orbitControlsRef: React.MutableRefObject<any>;
  transforms: Record<string, Transform>;
}) {
  const { scene } = useGLTF(url);

  // compute meshes and per-mesh userData as before
  const meshes: any[] = [];
  scene.traverse((child: any) => {
    if (child.isMesh) {
      // ensure geometry stats exist
      if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();
      child.geometry.computeVertexNormals();

      const box = child.geometry.boundingBox;
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);

      const volume = size.x * size.y * size.z;
      const area = 2 * (size.x * size.y + size.x * size.z + size.y * size.z);

      child.userData.center = center;
      child.userData.size = size;
      child.userData.volume = volume;
      child.userData.area = area;

      meshes.push(child);
    }
  });

  // compute global bounding box, center and scale factor once
  const { scaleFactor, center } = useMemo(() => {
    // Make sure world matrices are up to date
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    // desired maximum size in world units (adjust if you want larger/smaller)
    const desiredSize = 1.0;
    const scaleFactor = maxDim > 0 ? desiredSize / maxDim : 1;

    const center = new THREE.Vector3();
    box.getCenter(center);

    return { scaleFactor, center };
  }, [scene]);

  const animationRef = useRef<number | null>(null);

  const zoomOnSelected = (
    orbitControlsRef: React.MutableRefObject<any>,
    centerLocal: any,
    sizeLocal: any
  ) => {
    if (orbitControlsRef.current && animationRef.current === null) {
      const controls = orbitControlsRef.current;
      const startTarget = controls.target.clone();
      const endTarget = centerLocal.clone().multiplyScalar(scaleFactor); // scaled center
      const distance = Math.max(sizeLocal.x, sizeLocal.y, sizeLocal.z) * 8 * scaleFactor;
      const duration = 600;
      const startTime = Date.now();

      const startPos = controls.object.position.clone();
      const direction = new THREE.Vector3(0.3, 0.3, 1).normalize();
      const endPos = endTarget.clone().add(direction.multiplyScalar(distance));

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeProgress =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        controls.target.lerpVectors(startTarget, endTarget, easeProgress);
        controls.object.position.lerpVectors(startPos, endPos, easeProgress);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          animationRef.current = null;
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }
  };

  return (
    // root group: recenter and scale the entire loaded scene so it fits nicely
    <group
      // move scene so its center becomes origin, then scale uniformly
      position={[
        -center.x * scaleFactor,
        -center.y * scaleFactor,
        -center.z * scaleFactor,
      ]}
      scale={[scaleFactor, scaleFactor, scaleFactor]}
    >
      {meshes.map((mesh, i) => {
        const isSelected = selectedTeeth.includes(mesh.name);
        // transforms (pos/rot) are applied in model units — they will be affected by the group scale
        const t = transforms[mesh.name] || {
          pos: { x: 0, y: 0, z: 0 },
          rot: { x: 0, y: 0, z: 0 },
          scl: 1,
        };

        const centerLocal = mesh.userData.center || new THREE.Vector3(0, 0, 0);
        const sizeLocal = mesh.userData.size || new THREE.Vector3(0, 0, 0);

        return (
          <group key={i}>
            <mesh
              geometry={mesh.geometry}
              // mesh.position/rotation are in GLTF local coordinates — we add transforms (t) on top
              position={[
                mesh.position.x + t.pos.x,
                mesh.position.y + t.pos.y,
                mesh.position.z + t.pos.z,
              ]}
              rotation={[
                mesh.rotation.x + THREE.MathUtils.degToRad(t.rot.x),
                mesh.rotation.y + THREE.MathUtils.degToRad(t.rot.y),
                mesh.rotation.z + THREE.MathUtils.degToRad(t.rot.z),
              ]}
              // apply mesh scale * per-tooth scl
              scale={mesh.scale.clone().multiplyScalar(t.scl)}
              onClick={(e) => {
                e.stopPropagation();
                const toothData = {
                  id: mesh.name,
                  mesh,
                  center: centerLocal,
                  size: sizeLocal,
                  volume: mesh.userData.volume,
                  area: mesh.userData.area,
                };
                zoomOnSelected(orbitControlsRef, centerLocal, sizeLocal);
                onSelect(toothData);
              }}
            >
              <meshPhysicalMaterial
                color={isSelected ? "#4A90E2" : "#F2F2F2"}
                roughness={0.15}
                metalness={0.05}
                clearcoat={1}
                clearcoatRoughness={0.03}
                transmission={0.05}
                ior={1.45}
              />
            </mesh>

            {isSelected && (
              <Html
                position={[
                  centerLocal.x,
                  centerLocal.y + sizeLocal.y * 0.6,
                  centerLocal.z,
                ]}
                style={{
                  background: "rgba(74,144,226,0.9)",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  textAlign: "center",
                  minWidth: "120px",
                }}
              >
                <b>Tooth {mesh.name}</b>
                <br />
                Vol: {mesh.userData.volume?.toFixed(1)} mm³
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* --------------------- ViewerPage (unchanged UI + bottom box) --------------------- */

export default function ViewerPage() {
  const [selectedTeeth, setSelectedTeeth] = useState<string[]>([]);
  const [transforms, setTransforms] = useState<Record<string, Transform>>({});
  const orbitControlsRef = useRef<any>(null);
  const modelUrl = "/models/Aliaa-mandible_1.gltf";
  const cameraAnimationRef = useRef<number | null>(null);

  const handleSelect = (tooth: ToothData) => {
    setSelectedTeeth((prev) =>
      prev.includes(tooth.id)
        ? prev.filter((id) => id !== tooth.id)
        : [...prev, tooth.id]
    );
  };

  const handleSliderChange = (
    id: string,
    type: "pos" | "rot" | "scl",
    axis: "x" | "y" | "z",
    value: number
  ) => {
    setTransforms((prev) => {
      const current = prev[id] || {
        pos: { x: 0, y: 0, z: 0 },
        rot: { x: 0, y: 0, z: 0 },
        scl: 1,
      };
      const updated =
        type === "scl"
          ? { ...current, scl: value }
          : {
              ...current,
              [type]: { ...current[type], [axis]: value },
            };
      return { ...prev, [id]: updated };
    });
  };

  const resetTransform = (id: string) => {
    setTransforms((prev) => ({
      ...prev,
      [id]: { pos: { x: 0, y: 0, z: 0 }, rot: { x: 0, y: 0, z: 0 }, scl: 1 },
    }));
  };

  // animate camera + target helper
  const animateCameraTo = useCallback(
    (targetPos: THREE.Vector3, targetTarget: THREE.Vector3, duration = 700) => {
      if (!orbitControlsRef.current) return;
      const controls = orbitControlsRef.current;
      if (cameraAnimationRef.current) cancelAnimationFrame(cameraAnimationRef.current);

      const startTime = Date.now();
      const startPos = controls.object.position.clone();
      const startTarget = controls.target.clone();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const t = Math.min(1, elapsed / duration);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        controls.object.position.lerpVectors(startPos, targetPos, ease);
        controls.target.lerpVectors(startTarget, targetTarget, ease);
        controls.update();

        if (t < 1) cameraAnimationRef.current = requestAnimationFrame(animate);
        else cameraAnimationRef.current = null;
      };

      cameraAnimationRef.current = requestAnimationFrame(animate);
    },
    []
  );

  // view presets (origin-centered — model is already recentered by MandibleModel)
  const viewFront = () => animateCameraTo(new THREE.Vector3(0, 0.25, 0.9), new THREE.Vector3(0, 0, 0));
  const viewBack = () => animateCameraTo(new THREE.Vector3(0, 0.25, -0.9), new THREE.Vector3(0, 0, 0));
  const viewLeft = () => animateCameraTo(new THREE.Vector3(-0.9, 0.25, 0), new THREE.Vector3(0, 0, 0));
  const viewRight = () => animateCameraTo(new THREE.Vector3(0.9, 0.25, 0), new THREE.Vector3(0, 0, 0));
  const viewTop = () => animateCameraTo(new THREE.Vector3(0, 1.2, 0.01), new THREE.Vector3(0, 0, 0));
  const viewBottom = () => animateCameraTo(new THREE.Vector3(0, -0.6, 0.01), new THREE.Vector3(0, 0, 0));
  const viewIso = () => {
    const dir = new THREE.Vector3(1, 0.7, 1).normalize();
    const pos = dir.multiplyScalar(1.2);
    animateCameraTo(pos, new THREE.Vector3(0, 0, 0));
  };
  const fitView = () => {
    // short animate back to typical camera position (Bounds.fit is called on mount via <Bounds fit>)
    animateCameraTo(new THREE.Vector3(0.35, 0.3, 0.75), new THREE.Vector3(0, 0, 0), 500);
  };

  return (
    <div className="w-full h-[500px] bg-zinc-950 relative flex">
      {/* 3D Viewer */}
      <div className="flex-1 relative">
        <Canvas camera={{ position: [0.35, 0.3, 0.75], fov: 40 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 3, 2]} intensity={1.2} />
            <Bounds fit margin={1}>
              <MandibleModel
                url={modelUrl}
                selectedTeeth={selectedTeeth}
                onSelect={handleSelect}
                orbitControlsRef={orbitControlsRef}
                transforms={transforms}
              />
            </Bounds>

            <Grid
              args={[10, 10]}
              cellColor="#DCE3EA"
              sectionColor="#B0BAC5"
              fadeDistance={30}
              position={[0, -0.05, 0]}
            />
            <ContactShadows
              position={[0, -0.1, 0]}
              opacity={0.45}
              blur={1.8}
              scale={10}
            />
            <Environment preset="forest" />
            <OrbitControls
              ref={orbitControlsRef}
              enablePan
              enableZoom
              enableRotate
              makeDefault
            />
          </Suspense>
        </Canvas>

        {/* Animated Control Panel (right) */}
        <AnimatePresence>
          {selectedTeeth.length > 0 && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="w-80 bg-zinc-900 border-l border-zinc-800 text-white p-4 overflow-y-auto absolute right-0 top-0 bottom-0"
            >
              <h2 className="text-lg font-semibold mb-3">
                🦷 Control Panel ({selectedTeeth.length})
              </h2>
              {selectedTeeth.map((id) => {
                const t = transforms[id] || {
                  pos: { x: 0, y: 0, z: 0 },
                  rot: { x: 0, y: 0, z: 0 },
                  scl: 1,
                };
                return (
                  <div
                    key={id}
                    className="mb-4 border border-zinc-700 rounded-xl p-3 bg-zinc-800/50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-sm">Tooth {id}</span>
                      <button
                        onClick={() => resetTransform(id)}
                        className="text-xs bg-zinc-700 px-2 py-1 rounded hover:bg-zinc-600"
                      >
                        Reset
                      </button>
                    </div>

                    {/* Position */}
                    <div className="text-xs text-gray-400 mb-1">Position (mm)</div>
                    {(["x", "y", "z"] as ("x" | "y" | "z")[]).map((axis) => (
                      <div key={axis} className="mb-2">
                        <label className="flex justify-between text-xs mb-1">
                          <span>{axis.toUpperCase()}</span>
                          <span>{t.pos[axis].toFixed(2)}</span>
                        </label>
                        <input
                          type="range"
                          min={-10}
                          max={10}
                          step={0.1}
                          value={t.pos[axis]}
                          onChange={(e) =>
                            handleSliderChange(
                              id,
                              "pos",
                              axis,
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    ))}

                    {/* Rotation */}
                    <div className="text-xs text-gray-400 mb-1 mt-3">
                      Rotation (deg)
                    </div>
                    {(["x", "y", "z"] as ("x" | "y" | "z")[]).map((axis) => (
                      <div key={axis} className="mb-2">
                        <label className="flex justify-between text-xs mb-1">
                          <span>{axis.toUpperCase()}</span>
                          <span>{t.rot[axis].toFixed(1)}°</span>
                        </label>
                        <input
                          type="range"
                          min={-180}
                          max={180}
                          step={1}
                          value={t.rot[axis]}
                          onChange={(e) =>
                            handleSliderChange(
                              id,
                              "rot",
                              axis,
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full"
                        />
                      </div>
                    ))}

                    {/* Scale */}
                    <div className="text-xs text-gray-400 mb-1 mt-3">
                      Scale ({t.scl.toFixed(2)}x)
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={2}
                      step={0.01}
                      value={t.scl}
                      onChange={(e) =>
                        handleSliderChange(
                          id,
                          "scl",
                          "x",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom view control box */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 z-40">
          <div className="bg-zinc-900/90 text-white rounded-xl shadow-lg border border-zinc-800 px-3 py-2 flex gap-2 items-center">
            <button onClick={viewFront} className="px-2 py-1 text-xs rounded hover:bg-zinc-800" title="Front">Front</button>
            <button onClick={viewBack} className="px-2 py-1 text-xs rounded hover:bg-zinc-800" title="Back">Back</button>
            <button onClick={viewLeft} className="px-2 py-1 text-xs rounded hover:bg-zinc-800" title="Left">Left</button>
            <button onClick={viewRight} className="px-2 py-1 text-xs rounded hover:bg-zinc-800" title="Right">Right</button>
            <button onClick={viewTop} className="px-2 py-1 text-xs rounded hover:bg-zinc-800" title="Top">Top</button>
            <button onClick={viewBottom} className="px-2 py-1 text-xs rounded hover:bg-zinc-800" title="Bottom">Bottom</button>
            <button onClick={viewIso} className="px-2 py-1 text-xs rounded hover:bg-zinc-800" title="Isometric">Iso</button>
            <button onClick={fitView} className="px-2 py-1 text-xs rounded bg-zinc-800/60 hover:bg-zinc-700" title="Fit">Fit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
