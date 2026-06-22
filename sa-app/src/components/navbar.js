import { Link } from 'react-router-dom';
import { logout } from '../app/service/authService';
import 'bootswatch/dist/brite/bootstrap.css';
import 'bootswatch/dist/brite/bootstrap.min.css';
import { useState, useEffect } from 'react';

import NavbarItem from './navbarItem';

function Navbar(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!sessionStorage.getItem('token_academia'));
  }, []);

  const isAdmin = sessionStorage.getItem('admin') === 'true';
  
  
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
          {isLoggedIn && (
            <>
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

              {isAdmin && (
                <>
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
                </>
              )}

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
                    <Link className="dropdown-item" to='/relatorio-pessoas-aulas'>Relatório de Pessoas e Aulas</Link>
                    <Link className="dropdown-item" to='/relatorio-financeiro-operacional'>Relatório Financeiro e Operacional</Link>
                    <Link className="dropdown-item" to='/relatorio-mensal-academia'>Relatório Mensal Academia</Link>
                  </div>
                </li>
              </ul>

            </>
          )}


            {isLoggedIn && (
               <ul className='navbar-nav ms-auto' style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: '#222', cursor: 'default' }}>
                    Olá, {JSON.parse(sessionStorage.getItem('usuario'))?.login}!
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={() => {
                      logout();
                      window.location.href = '/login';
                    }}
                  >
                    Sair
                  </button>
                </li>
              </ul>
            )}
          
        </div>
      </div>
    </div>
  );
}

export default Navbar;