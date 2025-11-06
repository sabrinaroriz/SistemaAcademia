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

function CadastroAjustesFinanceiros() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}3/ajustesfinanceiros`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setTipo('');
      setValor('');
      setDescricao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setTipo(dados.tipo);
      setValor(dados.valor);
      setDescricao(dados.descricao);
    }
  }

  async function salvar() {
    let data = { id, nome, tipo, valor, descricao};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
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
      await axios
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
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setTipo(dados.tipo);
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
              <FormGroup label='Tipo: *' htmlFor='inputTipo'>
                <select
                  id='inputTipo'
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
              <FormGroup label='Valor: *' htmlFor='inputValor'>
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

export default CadastroAjustesFinanceiros;