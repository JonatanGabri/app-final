import React from "react";
import TarjetaEstadistica from "./TarjetaEstadistica";

export default function PaginaDashboard({ listaTareas }) {
  const totalTareas = listaTareas.length;
  const tareasCompletadas = listaTareas.filter((t) => t.completada).length;
  const tareasPendientes = totalTareas - tareasCompletadas;

  return (
    <div className="container-fluid">
      <h2 className="display-5 fw-bold mb-4">📊 Dashboard</h2>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <TarjetaEstadistica
            titulo="Total de Tareas"
            valor={totalTareas}
            color="azul"
          />
        </div>
        <div className="col-md-4">
          <TarjetaEstadistica
            titulo="Completadas"
            valor={tareasCompletadas}
            color="verde"
          />
        </div>
        <div className="col-md-4">
          <TarjetaEstadistica
            titulo="Pendientes"
            valor={tareasPendientes}
            color="amarillo"
          />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white py-3">
          <h3 className="h5 mb-0">📋 Todas las Tareas</h3>
        </div>
        <ul className="list-group list-group-flush">
          {listaTareas.length > 0 ? (
            listaTareas.map((tarea) => (
              <li
                key={tarea.id}
                className="list-group-item d-flex justify-content-between align-items-center p-3"
              >
                <span
                  className={
                    tarea.completada
                      ? "text-decoration-line-through text-muted"
                      : ""
                  }
                >
                  {tarea.texto}
                </span>
                <span
                  className={`badge ${
                    tarea.completada
                      ? "bg-success-subtle text-success-emphasis"
                      : "bg-warning-subtle text-warning-emphasis"
                  }`}
                >
                  {tarea.completada ? "✅ Completada" : "⏳ Pendiente"}
                </span>
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">
              📭 No hay tareas para mostrar.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
