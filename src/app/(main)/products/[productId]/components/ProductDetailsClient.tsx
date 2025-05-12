// src/app/(main)/products/[productId]/components/ProductDetailsClient.tsx
'use client';

import { Product } from '@/lib/data/products';
import ModelViewer from '@/components/shared/3d/ModelViewer';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { ZoomIn, Image as ImageIcon, ShoppingCart, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils'; // Para manejo de clases condicionales

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [show3D, setShow3D] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [modelError, setModelError] = useState(false); // Para manejar error de carga del modelo

  useEffect(() => {
    setIsClient(true);
    if (product.modelUrl) {
      setShow3D(true);
    }
  }, [product.modelUrl]);

  const handleAddToCart = () => {
    alert(`Simulación: ${product.name} añadido al carrito! (ID: ${product.id})`);
  };

  const canShowModel = product.modelUrl && isClient;

  // Esqueleto de carga
  if (!isClient) {
    return (
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start animate-pulse">
        <div className="w-full aspect-[4/3] md:aspect-square bg-muted rounded-lg"></div>
        <div className="pt-4 md:pt-0">
          <div className="h-10 bg-muted rounded w-3/4 mb-3"></div>
          <div className="h-6 bg-muted rounded w-1/4 mb-5"></div>
          <div className="h-8 bg-muted rounded w-1/2 mb-6"></div>
          <div className="space-y-2 mb-8">
            <div className="h-5 bg-muted rounded w-full"></div>
            <div className="h-5 bg-muted rounded w-full"></div>
            <div className="h-5 bg-muted rounded w-5/6"></div>
          </div>
          <div className="mt-8 h-12 bg-primary/50 rounded w-full sm:w-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
      {/* Columna Izquierda (más ancha): Visor 3D o Imagen */}
      <div className="lg:col-span-3 w-full">
        <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800/50 rounded-xl overflow-hidden flex justify-center items-center relative shadow-xl border border-border">
          {canShowModel && (
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setShow3D(!show3D); setModelError(false); }} // Resetea error de modelo al cambiar
                className="bg-background/80 hover:bg-muted backdrop-blur-sm text-xs"
              >
                {show3D ? <ImageIcon className="mr-1.5 h-4 w-4" /> : <ZoomIn className="mr-1.5 h-4 w-4" />}
                {show3D ? 'Ver Imagen' : (product.modelUrl ? 'Ver Modelo 3D' : 'Imagen Principal')}
              </Button>
            </div>
          )}
          {show3D && canShowModel && !modelError ? (
            <ModelViewer modelPath={product.modelUrl!} />
          ) : (
            <img
              src={product.imageUrl || "/images/placeholder-600x400.png"} // Asegúrate que este placeholder exista
              alt={product.name}
              className="w-full h-full object-contain transition-opacity duration-300"
              onError={(e) => { // Fallback si la imagen principal falla
                (e.target as HTMLImageElement).src = "/images/placeholder-600x400.png";
              }}
            />
          )}
           {show3D && modelError && ( // Muestra si hay error cargando el modelo 3D
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <AlertTriangle className="w-12 h-12 text-destructive mb-2" />
                <p className="font-semibold text-destructive">Error al cargar modelo 3D</p>
                <p className="text-xs text-muted-foreground">Intenta con la vista de imagen.</p>
            </div>
          )}
        </div>
      </div>

      {/* Columna Derecha (más estrecha): Información del Producto */}
      <div className="lg:col-span-2 flex flex-col">
        <span className="text-xs text-primary dark:text-blue-400 font-semibold tracking-wider uppercase mb-2">
          {product.category}
        </span>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
          {product.name}
        </h1>
        <p className="text-3xl font-bold text-primary dark:text-blue-400 mb-6">
          ${product.price.toFixed(2)}
        </p>
        
        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none mb-8 text-muted-foreground">
          <h3 className="text-md font-semibold text-foreground mb-1 flex items-center">
            <Info size={16} className="mr-2 text-primary" /> Descripción del Producto
          </h3>
          <p className="leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <Button 
          size="lg" 
          className="w-full mt-auto bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white" 
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Añadir al Carrito
        </Button>
      </div>
    </div>
  );
}