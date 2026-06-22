import React from 'react';
import { Navigate } from 'react-router-dom';

function Home() {
  const isLoggedIn = !!sessionStorage.getItem('token_academia');

  if (isLoggedIn) {
    return <Navigate to="/PaginaInicial" />;
  }

  return <Navigate to="/login" />;
}

export default Home;