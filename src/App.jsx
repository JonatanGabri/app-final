
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navegacion from './Componentes/Navegacion';
import RutaProtegida from './Componentes/RutaProtegida';
import RutaPublica from './Componentes/RutaPublica';
import Login from './Componentes/Login';
import Dashboard from './Componentes/Dashboard';
import GestorTareas from './Componentes/GestorTareas';
import Cargando from './Componentes/Cargando';

const CLAVE_USUARIO = 'taskapp_usuario';
const CLAVE_TAREAS = 'taskapp_tareas';
const CLAVE_TOKEN = 'taskapp_token';

const TAREAS_INICIALES = [
  { id: 1, texto: 'Aprender React Router', completada: true },
  { id: 2, texto: 'Implementar rutas protegidas', completada: false },
  { id: 3, texto: 'Usar tokens de autenticación', completada: false },
];

export default function App() {
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem(CLAVE_USUARIO);
    const token = localStorage.getItem(CLAVE_TOKEN);
    
    if (usuarioGuardado && token) {
      try {
        return JSON.parse(usuarioGuardado);
      } catch (error) {
        console.error('Error al parsear usuario:', error);
        return null;
      }
    }
    return null;
  });

 
  const [listaTareas, setListaTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem(CLAVE_TAREAS);
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : TAREAS_INICIALES;
  });

 
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(CLAVE_USUARIO);
      localStorage.removeItem(CLAVE_TOKEN);
    }
  }, [usuario]);


  useEffect(() => {
    localStorage.setItem(CLAVE_TAREAS, JSON.stringify(listaTareas));
  }, [listaTareas]);

  useEffect(() => {
    setTimeout(() => setCargando(false), 500);
  }, []);

  const iniciarSesion = (nombreUsuario, contraseña) => {
    if (nombreUsuario === 'admin' && contraseña === '1234') {
  
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(CLAVE_TOKEN, token);
      
      const nuevoUsuario = { 
        nombreUsuario: 'admin',
        loginTime: Date.now()
      };
      setUsuario(nuevoUsuario);
      
      return true;
    }
    return false;
  };


  const cerrarSesion = () => {
    localStorage.removeItem(CLAVE_TOKEN);
    localStorage.removeItem(CLAVE_USUARIO);
    setUsuario(null);
  };
  
  const agregarTarea = (textoTarea) => {
    const nuevaTarea = { 
      id: Date.now(), 
      texto: textoTarea, 
      completada: false 
    };
    setListaTareas([...listaTareas, nuevaTarea]);
  };

  const cambiarEstadoTarea = (idTarea) => {
    setListaTareas(
      listaTareas.map((tarea) =>
        tarea.id === idTarea 
          ? { ...tarea, completada: !tarea.completada } 
          : tarea
      )
    );
  };

  const eliminarTarea = (idTarea) => {
    setListaTareas(listaTareas.filter((tarea) => tarea.id !== idTarea));
  };

  const limpiarDatos = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todos los datos?')) {
      localStorage.clear();
      setUsuario(null);
      setListaTareas(TAREAS_INICIALES);
      alert('✅ Todos los datos han sido eliminados');
    }
  };

  const estaAutenticado = !!usuario;

  if (cargando) {
    return <Cargando />;
  }

  return (
    <BrowserRouter>
      <div className="altura-completa">
       
        <Navegacion 
          estaAutenticado={estaAutenticado}
          usuario={usuario}
          cerrarSesion={cerrarSesion}
          limpiarDatos={limpiarDatos}
        />
        
        <main className="container p-4 p-md-5">
          <Routes>
            <Route 
              path="/login" 
              element={
                <RutaPublica>
                  <Login iniciarSesion={iniciarSesion} />
                </RutaPublica>
              } 
            />

           
            <Route 
              path="/gestor" 
              element={
                <RutaProtegida>
                  <GestorTareas 
                    listaTareas={listaTareas}
                    agregarTarea={agregarTarea}
                    cambiarEstadoTarea={cambiarEstadoTarea}
                    eliminarTarea={eliminarTarea}
                  />
                </RutaProtegida>
              } 
            />

            <Route 
              path="/dashboard" 
              element={
                <RutaProtegida>
                  <Dashboard listaTareas={listaTareas} />
                </RutaProtegida>
              } 
            />

       
            <Route 
              path="/" 
              element={
                estaAutenticado 
                  ? <Navigate to="/gestor" replace /> 
                  : <Navigate to="/login" replace />
              } 
            />

        
            <Route 
              path="*" 
              element={
                <div className="text-center mt-5">
                  <h1 className="display-1 fw-bold text-primary">404</h1>
                  <p className="lead text-muted mb-4">Página no encontrada</p>
                  <a href="/" className="btn btn-primary btn-lg">
                    🏠 Volver al inicio
                  </a>
                </div>
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}