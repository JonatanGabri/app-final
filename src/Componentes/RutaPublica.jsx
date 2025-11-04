
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RutaPublica({ children }) {

  const token = localStorage.getItem('taskapp_token');
  const usuario = localStorage.getItem('taskapp_usuario');

  if (token && usuario) {
    console.log('ℹ️ Usuario ya autenticado intentando acceder a login');
    console.log('  → Redirigiendo a /gestor');
    
    return <Navigate to="/gestor" replace />;
  }
 
  console.log('🔓 Usuario no autenticado - Mostrando página pública');

  return children;
}