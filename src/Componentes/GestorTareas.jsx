import React, { useState } from 'react';
import Formulario from './Formulario';
import ListaTareas from './ListasTareas';

export default function PaginaGestorTareas({ 
  listaTareas, 
  agregarTarea, 
  cambiarEstadoTarea, 
  eliminarTarea 
}) {

  const [filtroActivo, setFiltroActivo] = useState('todas');

  const tareasFiltradas = listaTareas.filter(tarea => {
    if (filtroActivo === 'completadas') return tarea.completada;
    if (filtroActivo === 'pendientes') return !tarea.completada;
    return true;
  });

  return (
    <div className="row justify-content-center">
      <div className="col-lg-10 col-xl-8">
        {/* Título */}
        <h2 className="display-5 fw-bold mb-4">📝 Gestor de Tareas</h2>
        
        <Formulario agregarTarea={agregarTarea} />
        <div className="d-flex justify-content-center mb-4">
          <div className="btn-group shadow-sm" role="group">
            <button 
              onClick={() => setFiltroActivo('todas')} 
              className={`btn ${filtroActivo === 'todas' ? 'btn-primary' : 'btn-outline-secondary'}`}
            >
              Todas ({listaTareas.length})
            </button>
            <button 
              onClick={() => setFiltroActivo('pendientes')} 
              className={`btn ${filtroActivo === 'pendientes' ? 'btn-primary' : 'btn-outline-secondary'}`}
            >
              Pendientes ({listaTareas.filter(t => !t.completada).length})
            </button>
            <button 
              onClick={() => setFiltroActivo('completadas')} 
              className={`btn ${filtroActivo === 'completadas' ? 'btn-primary' : 'btn-outline-secondary'}`}
            >
              Completadas ({listaTareas.filter(t => t.completada).length})
            </button>
          </div>
        </div>
      
        <ListaTareas 
          tareas={tareasFiltradas}
          cambiarEstadoTarea={cambiarEstadoTarea}
          eliminarTarea={eliminarTarea}
        />
      </div>
    </div>
  );
}
