import { getProductById } from "@/lib/data/products";
import ProductDetailsClient from "./components/ProductDetailsClient";

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await getProductById(params.productId);

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500 font-semibold">Producto no encontrado.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailsClient product={product} />
    </div>
  );
}
