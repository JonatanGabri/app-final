
import React, { useState } from 'react';


export default function FormularioTarea({ agregarTarea }) {
 
  const [textoTarea, setTextoTarea] = useState('');


  const manejarEnvio = (evento) => {
    evento.preventDefault();
    
   
    if (textoTarea.trim()) {
      agregarTarea(textoTarea); 
      setTextoTarea('');         
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="mb-4">
      <div className="input-group input-group-lg shadow-sm">
        <input
          type="text"
          value={textoTarea}
          onChange={(e) => setTextoTarea(e.target.value)}
          placeholder="¿Qué necesitas hacer?"
          className="form-control"
        />
        <button
          type="submit"
          className="btn btn-primary fw-medium"
        >
          ➕ Añadir Tarea
        </button>
      </div>
    </form>
  );
}