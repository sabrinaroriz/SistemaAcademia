import React from 'react';


import ListagemPlanos from './views/listagem-planos';
import ListagemCargos from './views/listagem-cargos';
import ListagemAjustesFinanceiros from './views/listagem-ajustes-financeiros';
import ListagemAulas from './views/listagem-aulas';
import ListagemEquipamentos from './views/listagem-equipamentos';
import ListagemFaturas from './views/listagem-faturas';
import ListagemFichasAvaliacaoFisica from './views/listagem-fichas-avaliacao-fisica';
import ListagemFormasPagamento from './views/listagem-formas-pagamento';
import ListagemFuncionarios from './views/listagem-funcionarios';
import ListagemTreinos from './views/listagem-treinos';
import ListagemClientes from './views/listagem-clientes';
import ListagemExercicios from './views/listagem-exercicios';


import CadastroPlanos from './views/cadastro-planos';
import CadastroExercicios from './views/cadastro-exercicios';
import CadastroFormasPagamento from './views/cadastro-formas-pagamento';
import CadastroAjustesFinanceiros from './views/cadastro-ajustes-financeiros';
import CadastroCargos from './views/cadastro-cargos';




import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/cadastro-planos/:idParam?'element={<CadastroPlanos />} />
        <Route path='/cadastro-exercicios/:idParam?'element={<CadastroExercicios />} />
        <Route path='/cadastro-formas-pagamento/:idParam?'element={<CadastroFormasPagamento />} />
        <Route path='/cadastro-ajustes-financeiros/:idParam?'element={<CadastroAjustesFinanceiros />} />
        <Route path='/cadastro-cargos/:idParam?'element={<CadastroCargos />} />




        <Route path='/listagem-planos' element={<ListagemPlanos />} />
        <Route path='/listagem-cargos' element={<ListagemCargos />} />
        <Route path='/listagem-clientes' element={<ListagemClientes />} />
        <Route path='/listagem-ajustes-financeiros' element={<ListagemAjustesFinanceiros />} />
        <Route path='/listagem-aulas' element={<ListagemAulas />} />
        <Route path='/listagem-equipamentos' element={<ListagemEquipamentos />} />
        <Route path='/listagem-faturas' element={<ListagemFaturas />} />
        <Route path='/listagem-fichas-avaliacao-fisica' element={<ListagemFichasAvaliacaoFisica />} />
        <Route path='/listagem-formas-pagamento' element={<ListagemFormasPagamento />} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />
        <Route path='/listagem-treinos' element={<ListagemTreinos />} /> 
        <Route path='/listagem-exercicios' element={<ListagemExercicios />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
