import React from 'react';
import 'bootswatch/dist/brite/bootstrap.css';
import 'bootswatch/dist/brite/bootstrap.min.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-light bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          AlphaFit
        </a>
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
              <a 
                className="nav-link dropdown-toggle" 
                data-bs-toggle="dropdown" 
                href="#" 
                role="button" 
                aria-haspopup="true" 
                aria-expanded="false">
                Atividade
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href='/listagem-aulas'>Aulas</a>
                <a className="dropdown-item" href='/listagem-treinos'>Treinos</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href='/listagem-equipamentos'>Equipamentos</a>
              </div>
            </li>
          </ul>  

          <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                data-bs-toggle="dropdown" 
                href="#" 
                role="button" 
                aria-haspopup="true" 
                aria-expanded="false">
                Cliente
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href='/listagem-clientes'>Cliente</a>
                <a className="dropdown-item" href='/listagem-fichas-avaliacao-fisica'>Ficha de Avaliação Física</a>
              </div>
            </li>
          </ul> 

          <ul className='navbar-nav'>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                data-bs-toggle="dropdown" 
                href="#" 
                role="button" 
                aria-haspopup="true" 
                aria-expanded="false">
                Funcionário
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href='/listagem-funcionarios'>Funcionário</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href='/listagem-cargos'>Cargos</a>
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
              <a 
                className="nav-link dropdown-toggle" 
                data-bs-toggle="dropdown" 
                href="#" 
                role="button" 
                aria-haspopup="true" 
                aria-expanded="false">
                Cobrança
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href='/listagem-faturas'>Fatura</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href='/listagem-ajustes-financeiros'>Ajuste Financeiro</a>
                <a className="dropdown-item" href='/listagem-formas-pagamento'>Forma de Pagamento</a>
              </div>
            </li>
          </ul>

          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-relatorios'
              label='Relatório'
            />
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
