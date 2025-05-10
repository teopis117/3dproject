'use client';
import { Product } from "@/lib/data/products";
import ModelViewer from "@/components/shared/3d/ModelViewer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [show3D, setShow3D] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Se ejecuta solo en el cliente
    if (product.modelUrl) {
      setShow3D(true); // Por defecto mostrar 3D si existe
    }
  }, [product.modelUrl]);

  const handleAddToCart = () => {
    alert(`Simulación: ${product.name} añadido al carrito! (ID: ${product.id})`);
  };

  if (!isClient) {
    // Renderizar un placeholder o nada hasta que el cliente se hidrate
    // para evitar mismatch si setShow3D depende de product.modelUrl
    return (
      <div className="grid md:grid-cols-2 gap-8 items-start animate-pulse">
        <div className="w-full min-h-[300px] md:min-h-[400px] bg-gray-200 rounded-lg"></div>
        <div>
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-6"></div>
          <div className="h-20 bg-gray-300 rounded mb-6"></div>
          <div className="h-12 bg-gray-400 rounded w-full md:w-auto"></div>
        </div>
      </div>
    );
  }

  const canShow3D = product.modelUrl && isClient;

  return (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 items-start">
      <div className="w-full aspect-[4/3] md:aspect-square bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center relative shadow-lg">
        {canShow3D && (
          <div className="absolute top-3 right-3 z-10">
            <Button variant="outline" size="sm" onClick={() => setShow3D(!show3D)} className="bg-white/80 hover:bg-white backdrop-blur-sm">
              {show3D ? "Ver Imagen 2D" : "Ver Modelo 3D"}
            </Button>
          </div>
        )}
        {show3D && canShow3D ? (
          <ModelViewer modelPath={product.modelUrl!} />
        ) : (
          <img
            src={product.imageUrl || "/images/placeholder-600x400.png"}
            alt={product.name}
            className="w-full h-full object-contain transition-opacity duration-300"
          />
        )}
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-gray-800">{product.name}</h1>
        <p className="text-gray-500 mb-4 text-sm">Categoría: {product.category}</p>
        <p className="text-3xl font-semibold mb-6 text-blue-600">\${product.price.toFixed(2)}</p>
        <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">{product.description}</p>
        <Button size="lg" className="w-full sm:w-auto" onClick={handleAddToCart}>
          Añadir al Carrito (Simulado)
        </Button>
      </div>
    </div>
  );
}
