import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { cadastrar } from '../app/service/authService';

function CadastroUsuario() {

  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaRepeticao, setSenhaRepeticao] = useState('');

  function cancelar() {
    navigate('/login');
  }

  function limparFormulario() {
    setLogin('');
    setCpf('');
    setSenha('');
    setSenhaRepeticao('');
  }

  function validarCampos() {

    if (!login || !login.trim()) {
      mensagemErro('O login é obrigatório.');
      return false;
    }

    if (!cpf || !cpf.trim()) {
      mensagemErro('O CPF é obrigatório.');
      return false;
    }

    if (!senha || !senha.trim()) {
      mensagemErro('A senha é obrigatória.');
      return false;
    }

    if (senha !== senhaRepeticao) {
      mensagemErro('As senhas não conferem.');
      return false;
    }

    return true;
  }

  async function salvar() {

    if (!validarCampos()) {
      return;
    }

    try {

      await cadastrar({
        login,
        cpf,
        senha,
        senhaRepeticao,
        admin: false
      });

      mensagemSucesso(
        `Usuário ${login} cadastrado com sucesso!`
      );

      navigate('/login');

    } catch (error) {

      mensagemErro(
        error.response?.data ||
        'Erro ao cadastrar usuário.'
      );

    }
  }

  return (
    <div className='container'>
      <Card title='Cadastro de Usuário'>

        <FormGroup label='Login: *' htmlFor='inputLogin'>
          <input
            type='text'
            id='inputLogin'
            className='form-control'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </FormGroup>

        <FormGroup label='CPF: *' htmlFor='inputCpf'>
          <input
            type='text'
            id='inputCpf'
            className='form-control'
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </FormGroup>

        <FormGroup label='Senha: *' htmlFor='inputSenha'>
          <input
            type='password'
            id='inputSenha'
            className='form-control'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </FormGroup>

        <FormGroup
          label='Confirmar Senha: *'
          htmlFor='inputSenhaRepeticao'
        >
          <input
            type='password'
            id='inputSenhaRepeticao'
            className='form-control'
            value={senhaRepeticao}
            onChange={(e) =>
              setSenhaRepeticao(e.target.value)
            }
          />
        </FormGroup>

        <Stack spacing={1} padding={1} direction='row'>

          <button
            onClick={salvar}
            className='btn btn-primary'
          >
            Salvar
          </button>

          <button
            onClick={limparFormulario}
            className='btn btn-warning'
          >
            Limpar
          </button>

          <button
            onClick={cancelar}
            className='btn btn-danger'
          >
            Cancelar
          </button>

        </Stack>

      </Card>
    </div>
  );
}

export default CadastroUsuario;