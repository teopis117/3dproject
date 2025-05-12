import React from "react";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
        Panel de Control Principal
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {/* Widget de Ejemplo 1 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Ventas Totales (Simulado)</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$1,234.56</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">+5.2% desde el mes pasado</p>
        </div>

        {/* Widget de Ejemplo 2 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Productos Activos</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">(De datos mock)</p>
        </div>

        {/* Widget de Ejemplo 3 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Nuevos Usuarios (Simulado)</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">+3 esta semana</p>
        </div>
        
        {/* Widget de Ejemplo 4 - Puedes añadir más */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-slate-400 mb-1">Órdenes Pendientes (Simulado)</h3>
          <p className="text-2xl font-bold text-red-600 dark:text-red-500">3</p>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">Requieren atención</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-200 mb-4">Actividad Reciente (Placeholder)</h3>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-400">
            <li>- Nuevo producto "Silla Gamer Ergonómica" añadido.</li>
            <li>- Orden #1025 marcada como enviada.</li>
            <li>- Usuario "cliente_feliz" se registró.</li>
            <li>- Comentario recibido en "Lámpara de Escritorio LED".</li>
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-200 mb-4">Estadísticas Rápidas (Placeholder)</h3>
          <p className="text-gray-500 dark:text-slate-400">Aquí podríamos poner un gráfico simple o más KPIs...</p>
          {/* Placeholder para un gráfico */}
          <div className="mt-4 h-40 bg-gray-200 dark:bg-slate-700 rounded flex items-center justify-center text-gray-400 dark:text-slate-500">
            Gráfico de Ejemplo
          </div>
        </div>
      </div>
    </div>
  );
}
