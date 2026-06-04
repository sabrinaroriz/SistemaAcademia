import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroFichasAvaliacaoFisica() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/fichasavaliacaofisica`;

  const [id, setId] = useState('');
  const [idCliente, setIdCliente] = useState(0);
  const [idFuncionario, setIdFuncionario] = useState(0);
  const [dataFicha, setDataFicha] = useState(dayjs());
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imc, setImc] = useState('');
  const [classificacaoImc, setClassificacaoImc] = useState(''); 

  const [dados, setDados] = React.useState([]);

  
  function cancelar() {
    const confirmar = window.confirm('Deseja realmente voltar?');
    if (confirmar) {
      navigate('/listagem-fichas-avaliacao-fisica');
    }
  }

  function limparFormulario() {
    const temCamposPreenchidos =
       idCliente !== '' || idFuncionario !== '' || dataFicha !== ''|| peso !== ''|| altura !== ''|| descricao !== '';

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
      setIdCliente('');
      setIdFuncionario('');
      setDataFicha(dayjs());
      setPeso('');
      setAltura('');
      setDescricao('');
    } else {
      setId(dados.id);
      setIdCliente(dados.idCliente);
      setIdFuncionario(dados.idFuncionario);
      setDataFicha(dayjs(dados.dataFicha));
      setPeso(dados.peso);
      setAltura(dados.altura);
      setDescricao(dados.descricao);
    }
  }

  function validarCampos() {
    if (idCliente == null) {
      mensagemErro('Selecione um Cliente!');
      return false;
    }
    if (idFuncionario == null) {
      mensagemErro('Selecione um Funcionario!');
      return false;
    }
    if (!dataFicha) {
      mensagemErro('O campo Data é obrigatório!');
      return false;
    }
    if (peso == null || peso === '' || Number(peso) <= 0) {
      mensagemErro('O campo Peso é obrigatório!');
      return false;
    }
    if (altura == null || altura === '' || Number(altura) <= 0) {
      mensagemErro('O campo Altura é obrigatório!');
      return false;
    }
    return true;
  }

  async function salvar() {
    if (!validarCampos()) {
      return;
    }
    let data = { id, idCliente, idFuncionario, dataFicha, peso, altura, descricao};
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
      setIdCliente(dados.idCliente);
      setIdFuncionario(dados.idFuncionario);
      setDataFicha(dayjs(dados.dataFicha));
      setPeso(dados.peso);
      setAltura(dados.altura);
      setDescricao(dados.descricao);
    }
  }

  async function calcularIMC() {
    if (!peso || Number(peso) <= 0) {
      mensagemErro('Informe um peso válido!');
      return;
    }
    if (!altura || Number(altura) <= 0) {
      mensagemErro('Informe uma altura válida!');
      return;
    }
    try {
      const response = await axios.post(`${baseURL}/calcular-imc`,
        {
          peso: Number(peso),
          altura: Number(altura)
        });
      const resultado = response.data;
      const partes = resultado.split(' - ');
      setImc(partes[0].replace('IMC: ', ''));
      setClassificacaoImc(partes[1]);
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao calcular IMC');
      console.log(error);
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
                  value={idCliente}
                  className='form-select'
                  name='idCliente'
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
                  value={idFuncionario}
                  className='form-select'
                  name='idFuncionario'
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
              <FormGroup label="Data Ficha Avaliação: *" htmlFor="inputDataFicha">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='pt-br'
                >
                  <Stack spacing={1}>
                    <DesktopDatePicker
                      value={dataFicha}
                      inputFormat='DD/MM/YYYY'
                      onChange={(e) => setDataFicha(e)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: 'small',
                          className: 'campo-data'
                        }
                      }}
                    />
                  </Stack>
                </LocalizationProvider>
              </FormGroup>
              <FormGroup label='Peso: *' htmlFor='inputPeso'>
                <input
                  type='text'
                  id='inputPeso'
                  value={peso}
                  className='form-control'
                  name='peso'
                  onChange={(e) => setPeso(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </FormGroup>
              <FormGroup label='Altura: *' htmlFor='inputAltura'>
                <input
                  type='text'
                  id='inputAltura'
                  value={altura}
                  className='form-control'
                  name='altura'
                  onChange={(e) => setAltura(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </FormGroup>

              <br></br>
              <div className="card">
                <div className='card-body'>
                  <p><strong>IMC:</strong> {imc || '-'}</p>
                  <p><strong>Classificação:</strong> {classificacaoImc || '-'}</p>
                  <button type="button" className="btn btn-warning mt-2" onClick={calcularIMC}>
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

export default CadastroFichasAvaliacaoFisica;