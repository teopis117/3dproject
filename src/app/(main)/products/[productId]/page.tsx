import { getProductById, Product } from '@/lib/data/products';
import ProductDetailsClient from './components/ProductDetailsClient';

interface ProductPageProps {
  params: {
    productId: string;
  };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Si necesitaras searchParams
}

// Esta es la forma recomendada para acceder a params en Server Components asíncronos
// La función en sí es async, y params es una prop directa.
export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = params; // Desestructurar aquí es común y debería ser seguro

  // console.log(`[ProductPage v3] Intentando cargar producto con ID: ${productId}`);
  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500 font-semibold">
        Producto no encontrado (ID: {productId}).
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailsClient product={product as Product} />
    </div>
  );
}