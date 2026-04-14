import React from 'react';

export default function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="text-center p-10 bg-white rounded-xl shadow-lg border-t-4 border-teal-500">
        <h1 className="text-3xl font-bold text-teal-600">Luma Reconecta</h1>
        <p className="text-slate-500 mt-4 text-lg">
          ¡El sistema base ha sido cargado con éxito! 🚀
        </p>
        <div className="mt-6 text-sm text-slate-400">
          Si ves este mensaje, significa que GitHub y Vite están funcionando.
        </div>
      </div>
    </div>
  );
}
