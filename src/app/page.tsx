// src/app/page.tsx
import Link from "next/link";
import { getAllProducts, Product } from "@/lib/data/products";
import MainLayout from "./(main)/layout"; // ESTO ES CRUCIAL
import { Button } from "@/components/ui/button"; // Asumiendo que tienes el componente button de Shadcn/UI
import { ArrowRight, PackageOpen } from "lucide-react";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <MainLayout> {/* Aplicamos el layout de la tienda a la página de inicio */}
      <div className="w-full">
        {/* Sección Hero Ejecutiva */}
        <section className="bg-slate-100 dark:bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
              Soluciones <span className="text-primary dark:text-blue-400">Innovadoras</span> para tu Negocio
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Descubre nuestro catálogo de productos y prototipos diseñados para impulsar la eficiencia y la experiencia ejecutiva, integrando el poder de la IA.
            </p>
            <div>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-white" asChild>
                <Link href="#catalog-section"> {/* El href debe ser solo el ID para scroll en la misma página */}
                  Explorar Catálogo <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Sección del Catálogo con Estilo Ejecutivo */}
        <section id="catalog-section" className="py-16 md:py-20 bg-background"> {/* Usa color de fondo base */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Nuestro Catálogo
              </h2>
              <p className="text-md text-gray-600 dark:text-gray-400 mt-2">Productos destacados y novedades.</p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-16">
                <PackageOpen size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  Actualmente no hay productos disponibles.
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">Vuelve a consultar más tarde.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-card text-card-foreground rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col border border-border overflow-hidden"
                  >
                    <Link href={`/products/${product.id}`} className="flex flex-col h-full group">
                      <div className="relative w-full h-60 bg-muted overflow-hidden">
                        <img
                          src={product.imageUrl || "/images/placeholder-600x400.png"} // Asegúrate que esta imagen exista
                          alt={product.name}
                          className="w-full h-full object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary dark:group-hover:text-blue-400 transition-colors" title={product.name}>
                          {product.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-3">
                          {product.category}
                        </p>
                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-border/60">
                          <p className="text-xl font-bold text-foreground">
                            ${product.price.toFixed(2)}
                          </p>
                          <Button variant="ghost" size="sm" className="text-primary dark:text-blue-400 group-hover:underline px-0">
                            Ver Detalles
                            {/* <ArrowRight className="ml-1.5 h-4 w-4" /> // Quitado para hacerlo más limpio */}
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}