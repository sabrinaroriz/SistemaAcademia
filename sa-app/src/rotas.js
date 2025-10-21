import React from 'react';

import ListagemAlunos from './views/listagem-alunos';


import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path='/listagem-alunos' element={<ListagemAlunos />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;