import React from 'react';


import ListagemCursos from './views/listagem-cursos';

import ListagemPlanos from './views/listagem-planos';



import CadastroCurso from './views/cadastro-curso';

import CadastroAluno from './views/cadastro-aluno';


import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        
        
        <Route path='/cadastro-cursos/:idParam?' element={<CadastroCurso />} />
        
        <Route path='/cadastro-alunos/:idParam?' element={<CadastroAluno />} />
        
        
        <Route path='/listagem-cursos' element={<ListagemCursos />} />
        
        <Route path='/listagem-planos' element={<ListagemPlanos />} />
        
      
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
