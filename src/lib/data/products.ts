export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  modelUrl?: string;
  category: string;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Producto Ejemplo 1 (con 3D)",
    description: "Descripción detallada del producto ejemplo 1. Este tiene un modelo 3D.",
    price: 99.99,
    imageUrl: "/images/placeholder-600x400.png",
    modelUrl: "/models/placeholder_cube.glb",
    category: "Ejemplos 3D",
  },
  {
    id: "2",
    name: "Producto Ejemplo 2 (solo imagen)",
    description: "Descripción detallada del producto ejemplo 2. Este solo tiene imagen.",
    price: 49.50,
    imageUrl: "/images/placeholder-600x400.png",
    category: "Ejemplos 2D",
  },
];

export async function getProductById(productId: string): Promise<Product | undefined> {
  console.log(`Buscando producto con ID: ${productId}`);
  return mockProducts.find(p => p.id === productId);
}

export async function getAllProducts(): Promise<Product[]> {
  return mockProducts;
}
