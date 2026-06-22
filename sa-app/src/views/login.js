import React from 'react';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { Navigate } from 'react-router-dom';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import { autenticar } from '../app/service/authService';
import { Link } from 'react-router-dom';

import '../custom.css';

class Login extends React.Component {
  state = {
    login: '',
    senha: '',
  };

logar = () => {
  autenticar({
    login: this.state.login,
    senha: this.state.senha
  })
  .then(response => {

    sessionStorage.setItem(
      'token_academia',
      response.token
    );

    sessionStorage.setItem(
      'usuario',
      JSON.stringify(response)
    );

    sessionStorage.setItem(
      'admin',
      response.admin
    );

    mensagemSucesso('Login realizado com sucesso!');
    window.location.href = '/';

    })
    .catch(error => {

      mensagemErro(
        error.response?.data?.message ||
        'Usuário ou senha inválidos.'
      );

    });

  };

  cancelar = () => {
    this.setState({
      login: '',
      senha: '',
    });
  };

 render() {

  const token = sessionStorage.getItem('token_academia');

  if (token) {
    return <Navigate to="/" replace />;
  }

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
            <Link
              to="/cadastro-usuario"
              className="btn btn-primary"
            >
              Cadastre-se
            </Link>
          </Stack>
        </Card>
      </div>
  );
}
}

export default Login;