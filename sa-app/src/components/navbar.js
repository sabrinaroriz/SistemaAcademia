import { Link } from 'react-router-dom';
import 'bootswatch/dist/brite/bootstrap.css';
import 'bootswatch/dist/brite/bootstrap.min.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-light bg-primary'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          AlphaFit
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>

          <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                data-bs-toggle="dropdown"
                type="button"
                aria-haspopup="true"
                aria-expanded="false">
                Atividade
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to='/listagem-aulas'>Aulas</Link>
                <Link className="dropdown-item" to='/listagem-treinos'>Treinos</Link>

                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to='/listagem-equipamentos'>Equipamentos</Link>
                <Link className="dropdown-item" to='/listagem-exercicios'>Exercícios</Link>
              </div>
            </li>
          </ul>

          <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                data-bs-toggle="dropdown"
                type="button"
                aria-haspopup="true"
                aria-expanded="false">
                Cliente
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to='/listagem-clientes'>Cliente</Link>
                <Link className="dropdown-item" to='/listagem-fichas-avaliacao-fisica'>Ficha de Avaliação Física</Link>
              </div>
            </li>
          </ul>

          <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                data-bs-toggle="dropdown"
                type='button'
                aria-haspopup="true"
                aria-expanded="false">
                Funcionário
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to='/listagem-funcionarios'>Funcionário</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to='/listagem-cargos'>Cargos</Link>
              </div>
            </li>
          </ul>

          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-planos'
              label='Plano' />
          </ul>

          <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                data-bs-toggle="dropdown"
                type='button'
                aria-haspopup="true"
                aria-expanded="false">
                Cobrança
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to='/listagem-faturas'>Fatura</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to='/listagem-ajustes-financeiros'>Ajuste Financeiro</Link>
                <Link className="dropdown-item" to='/listagem-formas-pagamento'>Forma de Pagamento</Link>
              </div>
            </li>
          </ul>

          <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link"
                data-bs-toggle="dropdown"
                type='button'
                aria-haspopup="true"
                aria-expanded="false">
                Relatórios
              </button>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to='/relatorio-presenca'>Relatório de Presença</Link>
                <Link className="dropdown-item" to='/controle-presenca'>Controle de Presença</Link>
                <div className="dropdown-divider"></div>
                <Link className="dropdown-item" to='/relatorio-financeiro-academia'>Relatório Financeiro da Academia</Link>
                <Link className="dropdown-item" to='/resumo-do-dia'>Resumo do Dia</Link>
              </div>
            </li>
          </ul>

          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/login' label='Entrar' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem render='true' href='/' label='Sair' />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;