import React, { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso } from '../components/toastr';

import '../custom.css';

class Login extends React.Component {
  state = {
    login: '',
    senha: '',
  };

  logar = () => {
    mensagemSucesso(`Usuário ${this.state.login} logado com sucesso!`);
  };

  cancelar = () => {
    this.setState({
      login: '',
      senha: '',
    });
  };

 render() {
  return (
    <div className="login-page">
        <Card title="Acesso">
          <FormGroup label="Login: *" htmlFor="inputLogin">
            <input
              type="text"
              id="inputLogin"
              value={this.state.login}
              className="form-control"
              onChange={(e) => this.setState({ login: e.target.value })}
            />
          </FormGroup>

          <FormGroup label="Senha: *" htmlFor="inputSenha">
            <input
              type="password"
              id="inputSenha"
              value={this.state.senha}
              className="form-control"
              onChange={(e) => this.setState({ senha: e.target.value })}
            />
          </FormGroup>

          <Stack spacing={1} padding={1} direction="row">
            <button onClick={this.logar} className="btn btn-success">
              Entrar
            </button>
            <button onClick={this.cancelar} className="btn btn-danger">
              Cancelar
            </button>
          </Stack>
        </Card>
      </div>
  );
}
}

export default Login;