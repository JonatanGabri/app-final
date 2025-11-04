
import React from 'react';


import TarjetaTarea from './TarjetaTarea';


export default function ListaTareas({ tareas, cambiarEstadoTarea, eliminarTarea }) {
  return (
    <div className="card shadow-sm">
      <div className="card-body p-0">
        {tareas.length === 0 ? (
        
          <p className="text-center text-muted p-4 mb-0">
            📭 No hay tareas en esta categoría.
          </p>
        ) : (
         
          <ul className="list-group list-group-flush">
            {tareas.map((tarea) => (
              <TarjetaTarea 
                key={tarea.id} 
                tarea={tarea}
                cambiarEstadoTarea={cambiarEstadoTarea}
                eliminarTarea={eliminarTarea}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}