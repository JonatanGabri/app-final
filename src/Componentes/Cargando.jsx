
import React from 'react';


export default function Cargando() {
  return (
    <div className="d-flex justify-content-center my-5 py-5">
      <div 
        className="spinner-border text-primary" 
        style={{width: '3rem', height: '3rem'}} 
        role="status"
      >
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
}