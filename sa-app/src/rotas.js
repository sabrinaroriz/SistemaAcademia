import React from 'react';


import ListagemPlanos from './views/listagem-planos';
import ListagemCargos from './views/listagem-cargos';




import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/listagem-planos' element={<ListagemPlanos />} />
        <Route path='/listagem-cargos' element={<ListagemCargos />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
