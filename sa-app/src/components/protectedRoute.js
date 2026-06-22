import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, onlyAdmin = false }) {
  const token = sessionStorage.getItem('token_academia');
  const isAdmin = sessionStorage.getItem('admin') === 'true';

  
  // não logado
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // logado mas não é admin (quando a rota exige admin)
  if (onlyAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}