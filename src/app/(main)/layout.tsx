import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 sticky top-0 z-40">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="/catalog" className="text-xl font-bold hover:text-gray-300">NexusCommerce</a>
          <div>
            <a href="/catalog" className="hover:text-gray-300 px-3">Catálogo</a>
            {/* <a href="/cart" className="hover:text-gray-300 px-3">Carrito</a> */}
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-200 text-center p-4 mt-auto">
        © 2025 Mi E-commerce IA (Estudiantes)
      </footer>
    </div>
  );
}
