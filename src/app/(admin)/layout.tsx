import React from "react";
import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Settings, Users } from "lucide-react"; // Iconos para la navegación

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-900">
      {/* Barra Lateral de Navegación (Sidebar) */}
      <aside className="w-60 bg-slate-800 dark:bg-black text-slate-200 p-5 flex flex-col fixed h-full shadow-xl z-40">
        <div className="text-center mb-8">
          <Link href="/dashboard" className="text-2xl font-bold text-white hover:text-slate-300 transition-colors">
            AdminNexus
          </Link>
        </div>
        <nav className="flex-grow space-y-3">
          <Link
            href="/dashboard"
            className="flex items-center py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-700/60 hover:text-white transition-all duration-200"
          >
            <LayoutDashboard size={18} className="mr-3 flex-shrink-0" />
            Dashboard
          </Link>
          <Link
            href="/admin-products" // Cambiaremos esta ruta después a products-admin para que no colisione con /products de la tienda
            className="flex items-center py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-700/60 hover:text-white transition-all duration-200"
          >
            <ShoppingBag size={18} className="mr-3 flex-shrink-0" />
            Productos
          </Link>
          {/* <Link
            href="/admin/users" // Placeholder
            className="flex items-center py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-700/60 hover:text-white transition-all duration-200"
          >
            <Users size={18} className="mr-3 flex-shrink-0" />
            Usuarios
          </Link> */}
        </nav>
        <div className="pt-5 mt-auto border-t border-slate-700">
          <Link
            href="/admin-settings" // Cambiaremos esta ruta después
            className="flex items-center py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-700/60 hover:text-white transition-all duration-200"
          >
            <Settings size={18} className="mr-3 flex-shrink-0" />
            Configuración
          </Link>
          <p className="text-xs text-slate-500 text-center mt-4">
            © {currentYear} Nexus Admin
          </p>
        </div>
      </aside>

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col ml-60"> {/* ml-60 para dejar espacio a la sidebar fija de w-60 */}
        {/* Header del Área de Contenido */}
        <header className="bg-white dark:bg-slate-800 shadow-sm p-4 sticky top-0 z-30 border-b dark:border-slate-700">
          <div className="mx-auto flex justify-between items-center h-12 px-4"> {/* Altura fija y padding */}
            <div>
              {/* Podríamos poner un breadcrumb o el título de la página actual aquí, manejado dinámicamente */}
              <h1 className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                Panel Administrativo
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-slate-600 dark:text-slate-400">Admin Usuario</span>
              <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200">
                AU {/* Iniciales del Admin Usuario */}
              </div>
            </div>
          </div>
        </header>

        {/* Contenido de la Página Específica del Admin */}
        <main className="flex-grow p-6 overflow-y-auto"> {/* Padding y scroll si el contenido es largo */}
          {children}
        </main>
      </div>
    </div>
  );
}
