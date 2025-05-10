'use client';
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html, ContactShadows } from "@react-three/drei";

interface ModelViewerProps { modelPath: string; }

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1} position={[0, -0.75, 0]} />; // Ajusta escala y posición
}

function LoadingFallback() {
  return <Html center className="text-sm text-gray-600 whitespace-nowrap">Cargando modelo 3D...</Html>;
}

export default function ModelViewer({ modelPath }: ModelViewerProps) {
  return (
    <Canvas shadows camera={{ position: [0, 0.5, 3.5], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <spotLight 
        position={[5, 5, 5]} 
        angle={0.3} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      <Suspense fallback={<LoadingFallback />}>
        <Model modelPath={modelPath} />
        <Environment preset="apartment" /> 
        <ContactShadows
          opacity={0.7}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color="#000000"
        />
      </Suspense>
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={0.5} 
        enableZoom={true} 
        enablePan={false}
        minDistance={1.5}
        maxDistance={6}
        minPolarAngle={Math.PI / 4} // No mirar desde abajo
        maxPolarAngle={Math.PI / 1.8} // No mirar muy desde arriba
      />
    </Canvas>
  );
}
