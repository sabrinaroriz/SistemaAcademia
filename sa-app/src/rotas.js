import React from 'react';


import ListagemPlanos from './views/listagem-planos';
import ListagemCargos from './views/listagem-cargos';
//import ListagemAjustesFinanceiros from './views/listagem-ajustes-financeiros';
//import ListagemAulas from './views/listagem-aulas';
//import ListagemEquipamentos from './views/listagem-equipamentos';
//import ListagemFaturas from './views/listagem-faturas';
//import ListagemFichasAvaliacaoFisica from './views/listagem-fichas-avaliacao-fisica';
//import ListagemFormasPagamento from './views/listagem-formas-pagamento';
import ListagemFuncionarios from './views/listagem-funcionarios';
//import ListagemTreinos from './views/listagem-treinos';
import ListagemCliente from './views/listagem-cliente';




import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/listagem-planos' element={<ListagemPlanos />} />
        <Route path='/listagem-cargos' element={<ListagemCargos />} />
        <Route path='/listagem-cliente' element={<ListagemCliente />} />
       {/* <Route path='/listagem-ajustes-financeiros' element={<ListagemAjustesFinanceiros />} /> */}
       {/*<Route path='/listagem-aulas' element={<ListagemAulas />} /> */}
       {/* <Route path='/listagem-equipamentos' element={<ListagemEquipamentos />} /> */}
       {/* <Route path='/listagem-faturas' element={<ListagemFaturas />} /> */}
       {/*<Route path='/listagem-fichas-avaliacao-fisica' element={<ListagemFichasAvaliacaoFisica />} /> */}
       {/*<Route path='/listagem-formas-pagamento' element={<ListagemFormasPagamento />} /> */}
       <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />
       {/*<Route path='/listagem-treinos' element={<ListagemTreinos />} /> */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
