
import React from 'react';
import { Link } from 'react-router-dom';

export default function BarraNavegacion({ 
  estaAutenticado, 
  usuario, 
  cerrarSesion, 
  limpiarDatos 
}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid">
       
        <Link to="/" className="navbar-brand mb-0 h1 text-primary fw-bold text-decoration-none">
          JonaApp 🛡️
        </Link>
        
        <div className="d-flex align-items-center">
          {estaAutenticado ? (
         
            <>
           
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/gestor" className="nav-link">
                    📝 Gestor
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    📊 Dashboard
                  </Link>
                </li>
              </ul>
              
              <span className="navbar-text me-3 d-none d-sm-inline">
                👤 Hola, {usuario.nombreUsuario}
              </span>
              
              <button
                onClick={limpiarDatos}
                className="btn btn-warning btn-sm me-2"
                title="Limpiar todos los datos"
              >
                🗑️
              </button>
              
              <button
                onClick={cerrarSesion}
                className="btn btn-danger btn-sm"
              >
                🚪 Salir
              </button>
            </>
          ) : (
            <span className="navbar-text">Por favor, inicia sesión</span>
          )}
        </div>
      </div>
    </nav>
  );
}