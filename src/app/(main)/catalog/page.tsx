import Link from "next/link";
import { getAllProducts, Product } from "@/lib/data/products";

export default async function CatalogPage() {
  const products = await getAllProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Nuestro Catálogo</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No hay productos disponibles en este momento.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <Link href={`/products/${product.id}`} className="flex flex-col h-full">
                <div className="relative w-full h-52 mb-4 rounded-md overflow-hidden">
                  <img
                    src={product.imageUrl || "/images/placeholder-600x400.png"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold mb-2 truncate" title={product.name}>{product.name}</h2>
                  <p className="text-gray-500 text-sm mb-2 flex-grow">{product.description.substring(0, 60)}...</p>
                  <p className="text-lg font-bold text-blue-600 mt-auto">\${product.price.toFixed(2)}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export const revalidate = 60;

