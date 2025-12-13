import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import SubCard from '../components/sub-card';
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
  const [idcliente, setIdCliente] = useState(0);
  const [idfuncionario, setIdFuncionario] = useState(0);
  const [datafichaavaliacao, setDataFichaAvaliacao] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');

  const [dados, setDados] = React.useState([]);

  function cancelar() {
    if (idParam != null) {
      navigate('/listagem-fichas-avaliacao-fisica');
      return;
    }
    const temCamposPreenchidos =
       idcliente !== '' || idfuncionario !== '' || datafichaavaliacao !== ''|| peso !== ''|| altura !== ''|| descricao !== '';

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
      setIdCliente('');
      setIdFuncionario('');
      setDataFichaAvaliacao('');
      setPeso('');
      setAltura('');
      setDescricao('');
    } else {
      setId(dados.id);
      setIdCliente(dados.idcliente);
      setIdFuncionario(dados.idfuncionario);
      setDataFichaAvaliacao(dados.datafichaavaliacao);
      setPeso(dados.peso);
      setAltura(dados.altura);
      setDescricao(dados.descricao);
    }
  }

  async function salvar() {
    let data = { id, idcliente, idfuncionario, datafichaavaliacao, peso, altura, descricao};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Ficha de Avaliação Física cadastrada com sucesso!`);
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
          mensagemSucesso(`Ficha de Avaliação Física alterada com sucesso!`);
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
      setIdCliente(dados.idcliente);
      setIdFuncionario(dados.idfuncionario);
      setDataFichaAvaliacao(dados.datafichaavaliacao);
      setPeso(dados.peso);
      setAltura(dados.altura);
      setDescricao(dados.descricao);
    }
  }

  const [dadosClientes, setDadosClientes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  const [dadosFuncionarios, setDadosFuncionarios] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosClientes) return null;
  if (!dadosFuncionarios) return null;


  return (
    <div className='container'>
      <Card title='Cadastro de Ficha de Avaliação Física'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                <select
                  id='selectCliente'
                  value={idcliente}
                  className='form-select'
                  name='idcliente'
                  onChange={(e) => setIdCliente(e.target.value)}
                  >
                  <option key='0' value='0'>
                    {''}
                  </option>
                  {dadosClientes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>
              <FormGroup label='Funcionario: *' htmlFor='selectFuncionario'>
                <select
                  id='selectFuncionario'
                  value={idfuncionario}
                  className='form-select'
                  name='idfuncionario'
                  onChange={(e) => setIdFuncionario(e.target.value)}
                  >
                  <option key='0' value='0'>
                    {''}
                  </option>
                  {dadosFuncionarios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
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

              <br></br>
              <div className="card">
                <div className='card-body'>
                  <p><strong>IMC:</strong> {imc}</p>
                  <p><strong>Classificação:</strong> {classificacao}</p>
                  <button type="button" className="btn btn-warning mt-2">
                    Calcular IMC
                  </button>
                </div>
              </div>
              
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