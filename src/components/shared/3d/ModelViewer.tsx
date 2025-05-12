// src/components/shared/3d/ModelViewer.tsx
'use client';
import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber"; // Importa useLoader si lo necesitas para texturas, etc.
import { OrbitControls, useGLTF, Environment, Html, ContactShadows, PresentationControls } from "@react-three/drei";
// import * as THREE from 'three'; // Descomenta si usas el auto-centrado/escalado

interface ModelViewerProps {
  modelPath: string;
  onModelError?: () => void; // Callback para error de carga
}

function Model({ modelPath, onModelError }: { modelPath: string, onModelError?: () => void }) {
  try {
    const { scene } = useGLTF(modelPath); // useGLTF puede lanzar error si no encuentra o no puede parsear
    // React.useEffect(() => { // Opcional: Auto-centrado y escalado
    //   if (scene) {
    //     const box = new THREE.Box3().setFromObject(scene);
    //     const center = box.getCenter(new THREE.Vector3());
    //     scene.position.sub(center);
    //     const size = box.getSize(new THREE.Vector3());
    //     const maxDim = Math.max(size.x, size.y, size.z);
    //     if (maxDim > 0) { // Evitar división por cero
    //       const scale = 1.5 / maxDim;
    //       scene.scale.set(scale, scale, scale);
    //     }
    //   }
    // }, [scene]);
    return <primitive object={scene} dispose={null} />;
  } catch (error) {
    console.error("Error cargando modelo GLTF:", error);
    if (onModelError) onModelError();
    return <Html center><p className="text-xs text-destructive">Error al cargar modelo.</p></Html>;
  }
}

function LoadingFallback() {
  return (
    <Html center wrapperClass="flex items-center justify-center h-full">
      <div className="text-sm text-slate-500 dark:text-slate-400 p-4 bg-slate-100/80 dark:bg-slate-800/80 rounded-md shadow backdrop-blur-sm">
        Cargando modelo 3D...
      </div>
    </Html>
  );
}

export default function ModelViewer({ modelPath, onModelError }: ModelViewerProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]} // Ajustado
      camera={{ position: [0, 0.5, 3], fov: 50, near: 0.1, far: 1000 }}
      style={{ touchAction: 'pan-y' }} // Permitir scroll vertical en la página
    >
      <color attach="background" args={['transparent']} /> {/* Fondo transparente para que se vea el del div padre */}
      
      <ambientLight intensity={1} />
      <hemisphereLight intensity={0.5} groundColor="white" />
      <directionalLight
        position={[3, 3, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 3, -5]} intensity={1} />

      <Suspense fallback={<LoadingFallback />}>
        <PresentationControls
          global
          cursor={true}
          snap={{ mass: 4, tension: 500 }} // Ajustes para el snap
          speed={1.2}
          zoom={0.9}
          rotation={[0.1, 0.2, 0]} // Rotación inicial leve
          polar={[-0.3, Math.PI / 2.4]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <group position-y={-0.70}> {/* Ajusta esta 'y' para la altura del modelo */}
            <Model modelPath={modelPath} onModelError={onModelError} />
          </group>
        </PresentationControls>
        <ContactShadows
          opacity={0.6}
          scale={10}
          blur={1.5}
          far={2.5} // Ajusta para que la sombra no se corte
          resolution={512}
          color="#000000"
        />
        {/* <Environment preset="sunset" /> // Elige un preset que te guste o usa luces manuales */}
        <Environment files="/hdr/industrial_sunset_02_1k.hdr" /> {/* Si tienes un HDR custom */}
      </Suspense>
    </Canvas>
  );
}