
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RutaProtegida({ children }) {

  const token = localStorage.getItem('taskapp_token');
  const usuario = localStorage.getItem('taskapp_usuario');
  
  if (!token || !usuario) {
    console.log('🚫 Acceso denegado a ruta protegida');
    console.log('  Token:', token ? '✅' : '❌');
    console.log('  Usuario:', usuario ? '✅' : '❌');
    console.log('  → Redirigiendo a /login');

    return <Navigate to="/login" replace />;
  }
  
  console.log('✅ Acceso permitido a ruta protegida');
  
  return children;
}