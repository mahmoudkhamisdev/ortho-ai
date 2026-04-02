"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  ContactShadows,
  Environment,
  Grid,
  Bounds,
  useBounds,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useState, useCallback } from "react";
import * as THREE from "three";

/**
 * Final corrected Dental Viewer
 *
 * Key fixes:
 * 1. Preserve original material/texture if present (use it). Otherwise fallback to white MeshPhysicalMaterial.
 * 2. Do NOT mutate the original glTF mesh transforms. Instead keep a `transforms` state for each mesh and render using those values.
 * 3. Fit camera once on load (Bounds.fit called once). Disabled continuous observe so selecting/moving doesn't refit.
 * 4. Highlight is done by changing material color for simplicity (without destroying original textures).
 * 5. Sliders update transforms state and re-render the scene. No global jaw movement.
 *
 * Make sure your model file is in /public/models/Aliaa-mandible_1.glb (GLB recommended).
 */

type Transform = {
  pos: { x: number; y: number; z: number };
  rot: { x: number; y: number; z: number }; // degrees
  scl: { x: number; y: number; z: number };
};

interface ToothInfo {
  name: string;
  geometry: THREE.BufferGeometry;
  material?: THREE.Material | THREE.Material[];
  // We'll not use mesh.position from glTF for interactive transforms
}

interface ToothData {
  id: string;
}

function FitOnce() {
  // call fit once on mount
  const api = useBounds();
  useEffect(() => {
    // small timeout to ensure GLTF loaded
    const t = setTimeout(() => api.refresh().fit(), 100);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/* ---------- MandibleModel: loads glb and renders every tooth from transforms state ---------- */
function MandibleModel({
  url,
  selected,
  onClickTooth,
  transforms,
  setInitialTransformsCallback,
}: {
  url: string;
  selected: Set<string>;
  onClickTooth: (name: string) => void;
  transforms: Record<string, Transform>;
  // callback to parent to initialize transforms map once model loaded
  setInitialTransformsCallback: (initial: Record<string, Transform>) => void;
}) {
  const gltf = useGLTF(url) as any;
  const scene = gltf.scene || gltf;
  // collect meshes info (geometry + material)
  const teeth: ToothInfo[] = useMemo(() => {
    const arr: ToothInfo[] = [];
    scene.traverse((c: any) => {
      if (c.isMesh && c.geometry) {
        arr.push({
          name: c.name || c.uuid,
          geometry: c.geometry,
          material: c.material,
        });
      }
    });
    return arr;
  }, [scene]);

  // On first load provide initial transforms for every tooth (use 0/0/1 defaults)
  useEffect(() => {
    const initial: Record<string, Transform> = {};
    teeth.forEach((t) => {
      // We don't rely on mesh.position because many GLTFs have vertex-level placement.
      // We'll initialize to zeros so sliders are relative to current visual.
      initial[t.name] = {
        pos: { x: 0, y: 0, z: 0 },
        rot: { x: 0, y: 0, z: 0 },
        scl: { x: 1, y: 1, z: 1 },
      };
    });
    setInitialTransformsCallback(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teeth]);

  return (
    <group /* scale jaw to reasonable size */ scale={0.01}>
      {teeth.map((t) => {
        const name = t.name;
        const tr = transforms[name] || {
          pos: { x: 0, y: 0, z: 0 },
          rot: { x: 0, y: 0, z: 0 },
          scl: { x: 1, y: 1, z: 1 },
        };

        // choose material:
        // - if original material exists and has a map/color, use it (clone to avoid mutating gltf)
        // - otherwise fallback to a white physical material
        const hasOriginalMaterial =
          t.material && (t.material as any).isMaterial !== false;

        // create material per-mesh to allow color override for hover/selected without touching original maps
        let materialToUse: THREE.Material;
        if (hasOriginalMaterial) {
          // clone original material to be safe (so we don't mutate glTF's shared materials)
          try {
            const original = (t.material as THREE.Material).clone();
            materialToUse = original;
          } catch {
            // fallback
            materialToUse = new THREE.MeshPhysicalMaterial({
              color: "#FFFFFF",
              roughness: 0.2,
              metalness: 0.05,
              clearcoat: 1,
              clearcoatRoughness: 0.03,
            });
          }
        } else {
          materialToUse = new THREE.MeshPhysicalMaterial({
            color: "#FFFFFF",
            roughness: 0.2,
            metalness: 0.05,
            clearcoat: 1,
            clearcoatRoughness: 0.03,
          });
        }

        // if selected, we'll tint the material's color a bit (without removing texture). If texture exists,
        // changing material.color won't remove the texture but may tint it.
        const isSelected = selected.has(name);

        // create a key so React re-creates material when selection changes to ensure visual update
        const materialKey = `${name}-${isSelected ? "sel" : "norm"}`;

        return (
          <mesh
            key={name}
            geometry={t.geometry}
            position={[tr.pos.x, tr.pos.y, tr.pos.z]}
            rotation={[
              THREE.MathUtils.degToRad(tr.rot.x),
              THREE.MathUtils.degToRad(tr.rot.y),
              THREE.MathUtils.degToRad(tr.rot.z),
            ]}
            scale={[tr.scl.x, tr.scl.y, tr.scl.z]}
            onClick={(e) => {
              e.stopPropagation();
              onClickTooth(name);
            }}
            castShadow
            receiveShadow
          >
            {/* primitive material (cloned original or fallback) */}
            <primitive
              key={materialKey}
              object={materialToUse}
              attach="material"
            />
            {/* Overlay emissive highlight when selected (a thin scaled copy) */}
            {isSelected && (
              <mesh
                geometry={t.geometry}
                scale={[1.002, 1.002, 1.002]}
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
                raycast={() => null} // don't capture pointer events
              >
                <meshBasicMaterial
                  color="#007BFF"
                  transparent
                  opacity={0.18}
                  depthWrite={false}
                />
              </mesh>
            )}
          </mesh>
        );
      })}
    </group>
  );
}

/* ---------- Parent Viewer Page ---------- */
export default function ViewerPage() {
  const modelUrl = "/models/Aliaa-mandible_1.glb"; // put file here

  // transforms state keyed by mesh name — this is the single source of truth for position/rotation/scale
  const [transforms, setTransforms] = useState<Record<string, Transform>>({});

  // selected set (use Set for quick contains)
  const [selectedSet, setSelectedSet] = useState<Set<string>>(new Set());

  // UI: list of currently selected in order (for panel rendering)
  const selectedList = useMemo(() => Array.from(selectedSet), [selectedSet]);

  // callback from MandibleModel to set initial transforms (only once)
  const handleInitialTransforms = useCallback(
    (initial: Record<string, Transform>) => {
      // only set if empty to avoid overwriting user changes
      setTransforms((prev) => (Object.keys(prev).length ? prev : initial));
    },
    []
  );

  // clicking a tooth toggles selection
  const handleClickTooth = useCallback((name: string) => {
    setSelectedSet((prev) => {
      const copy = new Set(prev);
      if (copy.has(name)) copy.delete(name);
      else copy.add(name);
      return copy;
    });
  }, []);

  // slider change updates transforms state (no mutation of gLTF objects)
  const handleSliderChange = useCallback(
    (
      name: string,
      type: "pos" | "rot" | "scl",
      axis: "x" | "y" | "z",
      value: number
    ) => {
      setTransforms((prev) => {
        const curr = prev[name] || {
          pos: { x: 0, y: 0, z: 0 },
          rot: { x: 0, y: 0, z: 0 },
          scl: { x: 1, y: 1, z: 1 },
        };
        const next = {
          ...prev,
          [name]: {
            ...curr,
            [type]:
              type === "scl"
                ? { x: value, y: value, z: value }
                : { ...curr[type], [axis]: value },
          },
        };
        return next;
      });
    },
    []
  );

  // helper to reset a tooth transforms back to defaults
  const resetTooth = useCallback((name: string) => {
    setTransforms((prev) => ({
      ...prev,
      [name]: {
        pos: { x: 0, y: 0, z: 0 },
        rot: { x: 0, y: 0, z: 0 },
        scl: { x: 1, y: 1, z: 1 },
      },
    }));
  }, []);

  return (
    <div className="w-full h-screen bg-white flex">
      {/* left panel */}
      <div className="w-80 p-4 border-r border-gray-200 bg-white overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">🦷 Control Panel</h2>
        <p className="text-sm text-gray-600 mb-4">
          Selected: {selectedList.length}
        </p>

        {selectedList.length === 0 && (
          <div className="text-gray-400 text-center py-12">
            Click a tooth to select it.
          </div>
        )}

        {selectedList.map((name) => {
          const t = transforms[name] || {
            pos: { x: 0, y: 0, z: 0 },
            rot: { x: 0, y: 0, z: 0 },
            scl: { x: 1, y: 1, z: 1 },
          };
          return (
            <div
              key={name}
              className="mb-4 border rounded p-3 bg-gray-50 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">Tooth {name}</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => resetTooth(name)}
                    className="text-xs px-2 py-1 bg-gray-200 rounded"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Position sliders */}
              <div className="text-xs text-gray-600 mb-1">Position (mm)</div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {(["x", "y", "z"] as ("x" | "y" | "z")[]).map((axis) => (
                  <div key={axis}>
                    <div className="text-xs mb-1">
                      {axis.toUpperCase()}: {t.pos[axis].toFixed(2)}
                    </div>
                    <input
                      type="range"
                      min={-10}
                      max={10}
                      step={0.1}
                      value={t.pos[axis]}
                      onChange={(e) =>
                        handleSliderChange(
                          name,
                          "pos",
                          axis,
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>
                ))}
              </div>

              {/* Rotation sliders */}
              <div className="text-xs text-gray-600 mb-1">Rotation (deg)</div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {(["x", "y", "z"] as ("x" | "y" | "z")[]).map((axis) => (
                  <div key={axis}>
                    <div className="text-xs mb-1">
                      {axis.toUpperCase()}: {t.rot[axis].toFixed(0)}°
                    </div>
                    <input
                      type="range"
                      min={-180}
                      max={180}
                      step={1}
                      value={t.rot[axis]}
                      onChange={(e) =>
                        handleSliderChange(
                          name,
                          "rot",
                          axis,
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full"
                    />
                  </div>
                ))}
              </div>

              {/* Scale */}
              <div className="text-xs text-gray-600 mb-1">Scale</div>
              <div className="mb-1">
                <div className="text-xs mb-1">All: {t.scl.x.toFixed(2)}x</div>
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.01}
                  value={t.scl.x}
                  onChange={(e) =>
                    handleSliderChange(
                      name,
                      "scl",
                      "x",
                      parseFloat(e.target.value)
                    )
                  }
                  className="w-full"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3D canvas */}
      <div className="flex-1">
        <Canvas
          shadows
          camera={{ position: [0.4, 0.25, 0.8], fov: 45 }}
          dpr={[1, 2]}
        >
          <Suspense fallback={null}>
            <color attach="background" args={["#ffffff"]} />

            {/* lighting: key + fill + rim */}
            <ambientLight intensity={0.8} />
            <directionalLight
              position={[1.2, 2, 1.2]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <hemisphereLight
              skyColor="#ffffff"
              groundColor="#dddddd"
              intensity={0.5}
            />
            <pointLight position={[-2, 2, -1]} intensity={0.6} />

            {/* Bounds fit once; observe disabled so moving teeth doesn't refit */}
            <Bounds fit clip observe={false} margin={1}>
              <MandibleModel
                url={modelUrl}
                selected={selectedSet}
                onClickTooth={handleClickTooth}
                transforms={transforms}
                setInitialTransformsCallback={handleInitialTransforms}
              />
              <FitOnce />
            </Bounds>

            <Grid
              args={[10, 10]}
              cellColor="#EEF2F6"
              sectionColor="#E2E8F0"
              fadeDistance={30}
              position={[0, -0.05, 0]}
            />
            <ContactShadows
              position={[0, -0.08, 0]}
              opacity={0.3}
              blur={2}
              scale={8}
            />
            <Environment preset="studio" />
            <OrbitControls enablePan enableZoom enableRotate />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
