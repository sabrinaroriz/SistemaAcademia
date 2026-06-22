import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import api from '../app/api';
import { BASE_URL } from '../config/axios';

function CadastroAjustesFinanceiros() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/ajustesfinanceiros`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [unidade, setUnidade] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  const [dados, setDados] = React.useState([]);


  function cancelar() {
      const confirmar = window.confirm('Deseja realmente voltar?');
      if (confirmar) {
        navigate('/listagem-ajustes-financeiros');
      }
    }

  function limparFormulario() {
    const temCamposPreenchidos =
      nome !== '' || tipo !== '' || unidade !== '' || valor !== '' || descricao !== '';
    if (!temCamposPreenchidos) {
      inicializar();
      return;
    }
    const confirmar = window.confirm('Deseja realmente limpar o formulário?');
    if (confirmar) {
      inicializar();
    }
  }

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setTipo('');
      setUnidade('');
      setValor('');
      setDescricao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setTipo(dados.tipo);
      setUnidade(dados.unidade);
      setValor(dados.valor);
      setDescricao(dados.descricao);
    }
  }

  function validarCampos() {
    if (!nome || !nome.trim()) {
      mensagemErro('O campo Nome é obrigatório!');
      return false;
    }
    if (!tipo) {
      mensagemErro('O campo Tipo de ajuste');
      return false;
    }
    if (!unidade) {
      mensagemErro('Selecione a Unidade do ajuste!');
      return false;
    }
    if (!valor || valor === '') {
      mensagemErro('O campo Valor é obrigatório!');
      return false;
    }

    const valorNumerico = Number(valor);
    if (valorNumerico < 0) {
      mensagemErro('O valor não pode ser negativo!');
      return false;
    }
    if (unidade === 'Porcentagem' && valorNumerico > 100) {
      mensagemErro('A porcentagem não pode ser maior que 100%!');
      return false;
    }
    return true;
  }

  async function salvar() {
    if (!validarCampos()) {
      return;
    }
    let data = { id, nome, tipo, unidade, valor, descricao};
    data = JSON.stringify(data);
    if (idParam == null) {
      await api
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Ajuste financeiro ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-ajustes-financeiros`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await api
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Ajuste financeiro ${nome} alterado com sucesso!`);
          navigate(`/listagem-ajustes-financeiros`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await api.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setTipo(dados.tipo);
      setUnidade(dados.unidade);
      setValor(dados.valor);
      setDescricao(dados.descricao);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Ajuste financeiro'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  placeholder='Digite o nome do Ajuste'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Tipo: *' htmlFor='selectTipo'>
                <select
                  id='selectTipo'
                  value={tipo}
                  className='form-select'
                  name='tipo'
                  onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value=''>Selecione...</option>
                    <option value='Desconto'>Desconto</option>
                    <option value='Acréscimo'>Acréscimo</option>
                </select>
              </FormGroup>
              <FormGroup label='Unidade: *' htmlFor='SelectUnidade'>
                <select
                  id='SelectUnidade'
                  value={unidade}
                  className='form-select'
                  name='unidade'
                  onChange={(e) => setUnidade(e.target.value)}
                  >
                    <option value=''>Selecione...</option>
                    <option value='Porcentagem'>%</option>
                    <option value='Moeda'>R$</option>
                </select>
              </FormGroup>
              <FormGroup label='Valor: *' htmlFor='inputValor'>
                {unidade === 'Moeda' ? (
                  <CurrencyInput
                    id='inputValor'
                    value={valor}
                    className='form-control'
                    name='valor'
                    placeholder='R$ 0,00'
                    decimalsLimit={2}
                    decimalSeparator=','
                    groupSeparator='.'
                    prefix='R$ '
                    onValueChange={(value) => setValor(value || '')}
                  />
                ) : (
                  <input
                    type='number'
                    id='inputValor'
                    value={valor}
                    className='form-control'
                    name='valor'
                    placeholder='0%'
                    onChange={(e) => setValor(e.target.value)}
                  />
                )}
              </FormGroup>
              <FormGroup label='Descrição:' htmlFor='inputDescricao'>
                <textarea
                  type='text'
                  id='inputDescricao'
                  value={descricao}
                  className='form-control'
                  name='descricao'
                  rows="3"
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-primary'
                >
                  Salvar
                </button>
                <button
                  onClick={limparFormulario}
                  type='button'
                  className='btn btn-warning'
                >
                  Limpar
                </button>
                <button
                  onClick={cancelar}
                  type='button'
                  className='btn btn-danger'
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroAjustesFinanceiros;