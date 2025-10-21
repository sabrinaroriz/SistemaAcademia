import React from 'react';


import ListagemCursos from './views/listagem-cursos';

import ListagemAlunos from './views/listagem-alunos';



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
        
        <Route path='/listagem-alunos' element={<ListagemAlunos />} />
        
      
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
