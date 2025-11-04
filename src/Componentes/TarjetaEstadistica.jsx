
import React from 'react';


export default function TarjetaEstadistica({ titulo, valor, color }) {
  return (
    <div className={`card shadow-sm tarjeta-estadistica borde-${color}`}> 
      <div className="card-body p-4">
        <h4 className="card-title text-muted h6 mb-2">{titulo}</h4>
        <p className="card-text display-4 fw-bold">{valor}</p>
      </div>
    </div>
  );
}