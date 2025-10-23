import React from 'react';


import ListagemPlanos from './views/listagem-planos';





import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/listagem-planos' element={<ListagemPlanos />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
