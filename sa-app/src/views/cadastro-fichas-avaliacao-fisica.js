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

function CadastroFichasAvaliacaoFisica() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}3/fichasavaliacaofisica`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idcliente, setIdCliente] = useState('');
  const [idfuncionario, setIdFuncionario] = useState('');
  const [datafichaavaliacao, setDataFichaAvaliacao] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [descricao, setDescricao] = useState('');

  const [dados, setDados] = React.useState([]);

  function cancelar() {
    if (idParam != null) {
    navigate('/listagem-fichas-avaliacao-fisica');
    return;
    }
    const temCamposPreenchidos =
      nome !== '' || idcliente !== '' || idfuncionario !== '' || datafichaavaliacao !== ''|| peso !== ''|| altura !== ''|| descricao !== '';

    if (temCamposPreenchidos) {
      if (window.confirm('Deseja realmente limpar o formulário?')) {
        inicializar();
      }
    } else {
      navigate('/listagem-fichas-avaliacao-fisica');
    }
  }

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setIdCliente('');
      setIdFuncionario('');
      setDataFichaAvaliacao('');
      setPeso('');
      setAltura('');
      setDescricao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setIdCliente(dados.idcliente);
      setIdFuncionario(dados.idfuncionario);
      setDataFichaAvaliacao(dados.datafichaavaliacao);
      setPeso(dados.peso);
      setAltura(dados.altura);
      setDescricao(dados.descricao);
    }
  }

  async function salvar() {
    let data = { id, nome, idcliente, idfuncionario, datafichaavaliacao, peso, altura, descricao};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Ficha de Avaliação Física ${nome} cadastrada com sucesso!`);
          navigate(`/listagem-fichas-avaliacao-fisica`);
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
          mensagemSucesso(`Ficha de Avaliação Física ${nome} alterada com sucesso!`);
          navigate(`/listagem-fichas-avaliacao-fisica`);
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
      setIdCliente(dados.idcliente);
      setIdFuncionario(dados.idfuncionario);
      setDataFichaAvaliacao(dados.datafichaavaliacao);
      setPeso(dados.peso);
      setAltura(dados.altura);
      setDescricao(dados.descricao);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Ficha de Avaliação Física'>
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
                  placeholder='Digite o nome da Ficha'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cliente: *' htmlFor='selectIdCliente'>
                <select
                  id='selectIdCliente'
                  value={idcliente}
                  className='form-select'
                  name='cliente'
                  onChange={(e) => setIdCliente(e.target.value)}
                  >
                    <option></option>
                </select>
              </FormGroup>
              <FormGroup label='Funcionario: *' htmlFor='selectIdFuncionario'>
                <select
                  id='selectIdFuncionario'
                  value={idfuncionario}
                  className='form-select'
                  name='funcionario'
                  onChange={(e) => setIdFuncionario(e.target.value)}
                  >
                    <option></option>
                </select>
              </FormGroup>
              <FormGroup label="Data Ficha Avaliação:" htmlFor="inputDataFichaAvaliacao">
                <input
                  type="date"
                  id="inputDataFichaAvaliacao"
                  className="form-control"
                  value={datafichaavaliacao}
                  name='dataFichaAvaliacao'
                  onChange={(e) => setDataFichaAvaliacao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Peso: *' htmlFor='inputPeso'>
                <input
                  type='text'
                  id='inputPeso'
                  value={peso}
                  className='form-control'
                  name='peso'
                  onChange={(e) => setPeso(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Altura: *' htmlFor='inputAltura'>
                <input
                  type='text'
                  id='inputAltura'
                  value={altura}
                  className='form-control'
                  name='altura'
                  onChange={(e) => setAltura(e.target.value)}
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

export default CadastroFichasAvaliacaoFisica;