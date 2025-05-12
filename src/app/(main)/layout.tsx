// src/app/(main)/products/[productId]/page.tsx
import Link from 'next/link'; // Asegúrate que Link esté importado
import { getProductById, Product } from '@/lib/data/products';
import ProductDetailsClient from './components/ProductDetailsClient';
import MainLayout from '../../layout'; // Aplicamos el layout de la tienda

interface ProductPageProps {
  params: {
    productId: string;
  };
}

async function ProductDetailsLoader(props: { params: ProductPageProps['params'] } ) {
  const { productId } = props.params;
  const product = await getProductById(productId);

  if (!product) {
    return (
      // Este contenido se renderizará dentro del MainLayout
      <div className="container mx-auto px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-semibold text-destructive mb-4">Producto no Encontrado</h1>
        <p className="text-muted-foreground mb-6">
          No pudimos encontrar un producto con el ID: <span className="font-semibold">{productId}</span>.
        </p>
        <Button asChild>
          <Link href="/">
            Volver al Catálogo
          </Link>
        </Button>
      </div>
    );
  }

  return (
    // Este contenido se renderizará dentro del MainLayout
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
      <ProductDetailsClient product={product as Product} />
    </div>
  );
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <MainLayout>
      <ProductDetailsLoader params={params} />
    </MainLayout>
  );
}