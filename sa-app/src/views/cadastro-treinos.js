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

function CadastroTreinos() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}2/treinos`;
  const baseURLlistaExercicioTreino = `${BASE_URL}4/listaexerciciotreino`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idcliente, setIdCliente] = useState('');
  const [idfuncionario, setIdFuncionario] = useState('');
  const [dataregistroficha, setDataRegistroFicha] = useState('');
  const [descricao, setDescricao] = useState('');

  const [listaexerciciotreino , setListaExercicioTreino] = useState([
    { id: 0, idtreino: 0, idexercicio: 0, serie: 0, repeticao: 0, carga: 0 }
  ]);

  const [dados, setDados] = React.useState([]);

  function adicionarExercicio() {
    setListaExercicioTreino([...listaexerciciotreino, { idexercicio: 0, serie: '', repeticao: '', carga: '' }]);
  }

  function atualizarExercicio(index, campo, valor) {
    const novos = [...listaexerciciotreino];
    novos[index][campo] = valor;
    setListaExercicioTreino(novos);
  }

  function removerExercicio(index) {
    const novos = listaexerciciotreino.filter((_, i) => i !== index);
    setListaExercicioTreino(novos);
  }

  function cancelar() {
    if (idParam != null) {
      navigate('/listagem-treinos');
      return;
    }
    const temCamposPreenchidos =
      nome !== '' || idcliente !== '' || idfuncionario !== '' || dataregistroficha !== '' || descricao !== '';

    if (temCamposPreenchidos) {
      if (window.confirm('Deseja realmente limpar o formulário?')) {
        inicializar();
      }
    } else {
      navigate('/listagem-treinos');
    }
  }

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setIdCliente('');
      setIdFuncionario('');
      setDataRegistroFicha('');
      setDescricao('');
      setIdExercicios('')
      setSeries('');
      setRepeticoes('');
      setCarga('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setIdCliente(dados.idcliente);
      setIdFuncionario(dados.idfuncionario);
      setDataRegistroFicha(dados.dataregistroficha);
      setDescricao(dados.descricao);
      setIdExercicios(dados.idexercicios)
      setSeries(dados.series);
      setRepeticoes(dados.repeticoes);
      setCarga(dados.carga);
    }
  }

  async function salvar() {
    let data = {id, nome, idcliente, idfuncionario, dataregistroficha, descricao, idexercicios, series, repeticoes, carga };
    data = JSON.stringify(data);

     if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Treino ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-treinos`);
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
          mensagemSucesso(`Treino ${nome} alterado com sucesso!`);
          navigate(`/listagem-treinos`);
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
      setDataRegistroFicha(dados.dataregistroficha);
      setDescricao(dados.descricao);
      setIdExercicios(dados.idexercicios)
      setSeries(dados.series);
      setRepeticoes(dados.repeticoes);
      setCarga(dados.carga);
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

  const [dadosExercicios, setDadosExercicios] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}3/exercicios`).then((response) => {
      setDadosExercicios(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosClientes) return null;
  if (!dadosFuncionarios) return null;
  if (!dadosExercicios) return null;


  function adicionarTreinos() {
    setIdExercicios([
      ...idexercicios, { id: '', nome: '' }
    ]);
  }

  return (
    <div className='container'>
      <Card title='Cadastro de Treinos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Nome do Treino: *' htmlFor='inputTreino'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  placeholder='Digite nome do Treino'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

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
             
              <FormGroup label='Instrutor: *' htmlFor='selectIdFuncionario'>
                <select
                  id='selectIdFuncionario'
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

              <FormGroup label='Data de Registro da Ficha:' htmlFor='inputDataRegistroFicha'>
                <input
                  type='date'
                  id='inputDataRegistroFicha'
                  value={dataregistroficha}
                  className='form-control'
                  name='dataregistroficha'
                  onChange={(e) => setDataRegistroFicha(e.target.value)}
                />
              </FormGroup>
              <br></br>
              <SubCard title='Treino'>
                <FormGroup label='Exercicios: *' htmlFor='selectExercicios'>
                  <select
                    id='selectExercicios'
                    value={idexercicios}
                    className='form-select'
                    name='idexercicios'
                    onChange={(e) => setIdExercicios(e.target.value)}
                  >
                  <option key='0' value='0'>
                    {''}
                  </option>
                  {dadosExercicios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
                </FormGroup>

                <FormGroup label='Séries:' htmlFor='inputSeries'>
                  <input
                    type='number'
                    id='inputSeries'
                    value={series}
                    className='form-control'
                    name='series'
                    placeholder='Ex: 3'
                    onChange={(e) => setSeries(e.target.value)}
                  />
                </FormGroup>

                <FormGroup label='Repetições:' htmlFor='inputRepeticoes'>
                  <input
                    type='number'
                    id='inputRepeticoes'
                    value={repeticoes}
                    className='form-control'
                    name='repeticoes'
                    placeholder='Ex: 3'
                    onChange={(e) => setRepeticoes(e.target.value)}
                  />
                </FormGroup>

                <FormGroup label='Carga (kg):' htmlFor='inputCarga'>
                  <input
                    type='number'
                    id='inputCarga'
                    value={carga}
                    className='form-control'
                    name='carga'
                    placeholder='Ex: 10'
                    onChange={(e) => setCarga(e.target.value)}
                  />
                </FormGroup>
                <button
                  type='button'
                  className='btn btn-secondary mb-3'
                  onClick={adicionarTreinos}
                >
                    + Adicionar Treinos
                </button>
              </SubCard>

              <FormGroup label="Descrição e observações:" htmlFor="inputDescricao">
                <textarea
                  id="inputDescricao"
                  className="form-control"
                  value={descricao}
                  name='descricao'
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Informe objetivo do aulo e observações"
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-primary'>
                  Salvar
                </button>
                <button onClick={cancelar} type='button' className='btn btn-danger'>
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

export default CadastroTreinos;
