import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroPlanos() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/planos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [duracao, setDuracao] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setDuracao('');
      setValor('');
      setDescricao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setDuracao(dados.duracao);
      setValor(dados.valor);
      setDescricao(dados.descricao);
    }
  }

  async function salvar() {
    let data = { id, nome, duracao, valor, descricao};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Plano ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-planos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Plano ${nome} alterado com sucesso!`);
          navigate(`/listagem-planos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNome(dados.nome);
    setDuracao(dados.duracao);
    setValor(dados.valor);
    setDescricao(dados.descricao);
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Plano'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome do Plano: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  placeholder='Digite o nome do Plano'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Duração do Plano (meses): *' htmlFor='inputDuracao'>
                <select
                  id='inputDuracao'
                  value={duracao}
                  className='form-select'
                  name='duracao'
                  aria-describedby="descricaoHelp"
                  onChange={(e) => setDuracao(e.target.value)}
                  >
                    <option value=''>Selecione...</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                    <option value='11'>11</option>
                    <option value='12'>12</option>
                </select>
              </FormGroup>
              <FormGroup label='Valor do Plano: *' htmlFor='inputValor'>
                <CurrencyInput
                  id='inputValor'
                  value={valor}
                  className='form-control'
                  name='valor'
                  placeholder='R$ 0,00'
                  decimalsLimit={2}
                  decimalSeparator=','
                  groupSeparator='.'
                  prefix='R$'
                  onValueChange={(value) => setValor(value||'')}
                />
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
                  onClick={inicializar}
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

export default CadastroPlanos;