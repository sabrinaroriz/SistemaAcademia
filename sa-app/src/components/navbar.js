import React from 'react';
import 'bootswatch/dist/brite/bootstrap.css';

import NavbarItem from './navbarItem';

function Navbar(props) {
  return (
    <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-primary'>
      <div className='container'>
        <a href='/' className='navbar-brand'>
          AlphaFit
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarResponsive'
          aria-controls='navbarResponsive'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarResponsive'>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-usuarios'
              label='Atividade'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem 
              render='true' 
              href='/listagem-cursos' 
              label='Cliente' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-professores'
              label='Funcionário'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem 
              render='true' 
              href='/listagem-planos' 
              label='Plano' />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-categorias'
              label='Cobrança'
            />
          </ul>
          <ul className='navbar-nav'>
            <NavbarItem
              render='true'
              href='/listagem-atividades-complementares'
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
