import React from 'react';

import PaginaInicial from "./views/PaginaInicial";
import Home from './views/Home';
import ProtectedRoute from './components/protectedRoute';

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

import RelatorioFinanceiroOperacional from './views/relatorio-financeiro-operacional';
import RelatorioPessoasAulas from './views/relatorio-pessoas-aulas';
import RelatorioMensalAcademia from './views/relatorio-mensal-academia';


import Login from './views/login';
import CadastroUsuario from './views/cadastro-usuario';

import CadastroPlanos from './views/cadastro-planos';
import CadastroExercicios from './views/cadastro-exercicios';
import CadastroFormasPagamento from './views/cadastro-formas-pagamento';
import CadastroAjustesFinanceiros from './views/cadastro-ajustes-financeiros';
import CadastroCargos from './views/cadastro-cargos';
import CadastroFuncionarios from './views/cadastro-funcionarios';
import CadastroClientes from './views/cadastro-clientes';
import CadastroTreinos from './views/cadastro-treinos';
import CadastroAulas from './views/cadastro-aulas';
import CadastroEquipamentos from './views/cadastro-equipamentos';
import CadastroFaturas from './views/cadastro-faturas';
import CadastroFichasAvaliacaoFisica from './views/cadastro-fichas-avaliacao-fisica';


import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Rotas(props) {
  return (
    
    <Routes>

      <Route path="/PaginaInicial" element={<ProtectedRoute><PaginaInicial /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro-usuario" element={<CadastroUsuario />} />

      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

      <Route path="/cadastro-planos/:idParam?" element={<ProtectedRoute onlyAdmin={true}><CadastroPlanos /></ProtectedRoute>} />
      <Route path="/cadastro-exercicios/:idParam?" element={<ProtectedRoute><CadastroExercicios /></ProtectedRoute>} />
      <Route path="/cadastro-formas-pagamento/:idParam?" element={<ProtectedRoute onlyAdmin={true}><CadastroFormasPagamento /></ProtectedRoute>} />
      <Route path="/cadastro-ajustes-financeiros/:idParam?" element={<ProtectedRoute onlyAdmin={true}><CadastroAjustesFinanceiros /></ProtectedRoute>} />
      <Route path="/cadastro-cargos/:idParam?" element={<ProtectedRoute onlyAdmin={true}><CadastroCargos /></ProtectedRoute>} />
      <Route path="/cadastro-funcionarios/:idParam?" element={<ProtectedRoute onlyAdmin={true}><CadastroFuncionarios /></ProtectedRoute>} />
      <Route path="/cadastro-treinos/:idParam?" element={<ProtectedRoute><CadastroTreinos /></ProtectedRoute>} />
      <Route path="/cadastro-aulas/:idParam?" element={<ProtectedRoute><CadastroAulas /></ProtectedRoute>} />
      <Route path="/cadastro-equipamentos/:idParam?" element={<ProtectedRoute><CadastroEquipamentos /></ProtectedRoute>} />
      <Route path="/cadastro-clientes/:idParam?" element={<ProtectedRoute><CadastroClientes /></ProtectedRoute>} />
      <Route path="/cadastro-faturas/:idParam?" element={<ProtectedRoute onlyAdmin={true}><CadastroFaturas /></ProtectedRoute>} />
      <Route path="/cadastro-fichas-avaliacao-fisica/:idParam?" element={<ProtectedRoute><CadastroFichasAvaliacaoFisica /></ProtectedRoute>} />

      <Route path="/listagem-planos" element={<ProtectedRoute onlyAdmin={true}><ListagemPlanos /></ProtectedRoute>} />
      <Route path="/listagem-cargos" element={<ProtectedRoute onlyAdmin={true}><ListagemCargos /></ProtectedRoute>} />
      <Route path="/listagem-clientes" element={<ProtectedRoute><ListagemClientes /></ProtectedRoute>} />
      <Route path="/listagem-ajustes-financeiros" element={<ProtectedRoute onlyAdmin={true}><ListagemAjustesFinanceiros /></ProtectedRoute>} />
      <Route path="/listagem-aulas" element={<ProtectedRoute><ListagemAulas /></ProtectedRoute>} />
      <Route path="/listagem-equipamentos" element={<ProtectedRoute><ListagemEquipamentos /></ProtectedRoute>} />
      <Route path="/listagem-faturas" element={<ProtectedRoute onlyAdmin={true}><ListagemFaturas /></ProtectedRoute>} />
      <Route path="/listagem-fichas-avaliacao-fisica" element={<ProtectedRoute><ListagemFichasAvaliacaoFisica /></ProtectedRoute>} />
      <Route path="/listagem-formas-pagamento" element={<ProtectedRoute onlyAdmin={true}><ListagemFormasPagamento /></ProtectedRoute>} />
      <Route path="/listagem-funcionarios" element={<ProtectedRoute onlyAdmin={true}><ListagemFuncionarios /></ProtectedRoute>} />
      <Route path="/listagem-treinos" element={<ProtectedRoute><ListagemTreinos /></ProtectedRoute>} />
      <Route path="/listagem-exercicios" element={<ProtectedRoute><ListagemExercicios /></ProtectedRoute>} />

      <Route path="/relatorio-pessoas-aulas" element={<ProtectedRoute><RelatorioPessoasAulas/></ProtectedRoute>} />
      <Route path="/relatorio-financeiro-operacional" element={<ProtectedRoute><RelatorioFinanceiroOperacional /></ProtectedRoute>} />
      <Route path="/relatorio-mensal-academia" element={<ProtectedRoute><RelatorioMensalAcademia /></ProtectedRoute>} />


    </Routes>
    
  );
}

export default Rotas;