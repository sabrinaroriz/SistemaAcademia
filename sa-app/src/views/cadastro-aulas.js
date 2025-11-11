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

function CadastroAulas() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}2/aulas`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idfuncionario, setIdFuncionario] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [status, setStatus] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [idequipamentos, setIdEquipamento] = useState('');
  const [quantidadeEquipamentoUtilizado, setQuantidadeEquipamentoUtilizado] = useState('');
  const [idclientes, setIdCliente] = useState('');
  const [descricao, setDescricao] = useState('');

  const [dados, setDados] = React.useState([]);

  function cancelar() {
    if (idParam != null) {
      navigate('/listagem-aulas');
      return;
    }
    const temCamposPreenchidos =
      nome !== '' || idfuncionario !== '' || data !== '' || horario !== '' || capacidade !== '' || idequipamentos !== '' || quantidadeEquipamentoUtilizado!== '' ||idclientes !== '';

    if (temCamposPreenchidos) {
      if (window.confirm('Deseja realmente limpar o formulário?')) {
        inicializar();
      }
    } else {
      navigate('/listagem-aulas');
    }
  }

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setIdFuncionario('');
      setData('');
      setHorario('');
      setStatus('');
      setCapacidade('');
      setIdEquipamento('');
      setQuantidadeEquipamentoUtilizado('');
      setIdCliente('');
      setDescricao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setIdFuncionario(dados.idfuncionario);
      setData(dados.data);
      setHorario(dados.horario);
      setStatus(dados.status);
      setCapacidade(dados.capacidade);
      setIdEquipamento(dados.idequipamentos);
      setQuantidadeEquipamentoUtilizado(dados.quantidadeEquipamentoUtilizado);
      setIdCliente(dados.idclientes);
      setDescricao(dados.descricao);
    }
  }

  async function salvar() {
    let data = { id,nome,idfuncionario,data,horario,
        status,capacidade,idequipamentos,quantidadeEquipamentoUtilizado,idclientes,descricao };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Aula ${nome} cadastrada com sucesso!`);
          navigate(`/listagem-aulas`);
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
          mensagemSucesso(`Aula ${nome} alterada com sucesso!`);
          navigate(`/listagem-aulas`);
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
      setIdFuncionario(dados.idfuncionario);
      setData(dados.data);
      setHorario(dados.horario);
      setStatus(dados.status);
      setCapacidade(dados.capacidade);
      setIdEquipamento(dados.idequipamentos);
      setQuantidadeEquipamentoUtilizado(dados.quantidadeEquipamentoUtilizado);
      setIdCliente(dados.idclientes);
      setDescricao(dados.descricao);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  function adicionarEquipamentos() {
    setIdEquipamento([
      ...idequipamentos, { id: '', nome: '' }
    ]);
  }

  return (
    <div className="container">
      <Card title="Cadastro de Aulas">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">

              <FormGroup label='Nome da Aula: *' htmlFor='inputAula'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  placeholder='Digite nome da aula'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Data da Aula: *" htmlFor="inputData">
                <input
                  type="date"
                  id="inputData"
                  className="form-control"
                  value={data}
                  name='data'
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Horário: *" htmlFor="inputHorario">
                <input
                  type="time"
                  id="inputHorario"
                  className="form-control"
                  name='horario'
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Instrutor: *' htmlFor='selectIdFuncionario'>
                <select
                  id='selectIdFuncionario'
                  value={idfuncionario}
                  className='form-select'
                  name='idfuncionario'
                  onChange={(e) => setIdFuncionario(e.target.value)}
                >
                  <option></option>

                </select>
              </FormGroup>

              <FormGroup label="Capacidade Máxima: *" htmlFor="inputCapacidade">
                <input
                  type="number"
                  id="inputCapacidade"
                  className="form-control"
                  name='capacidade'
                  value={capacidade}
                  onChange={(e) => setCapacidade(e.target.value)}
                />
              </FormGroup>
              <br></br>
              <SubCard title='Equipamentos'>
                <FormGroup label='Equipamentos Utilizados: *' htmlFor='selectEquipamentos'>
                  <select
                    id='selectEquipamentos'
                    value={idequipamentos}
                    className='form-select'
                    name='idequipamentos'
                    onChange={(e) => setIdEquipamento(e.target.value)}
                  >
                    <option></option>

                  </select> 
                </FormGroup>

                
                <button
                  type='button'
                  className='btn btn-secondary mb-3'
                  onClick={adicionarEquipamentos}
                >
                    + Adicionar Equipamentos
                </button>

              </SubCard>

              <SubCard title='Clientes'>
                <FormGroup label='Clientes participantes: *' htmlFor='selectClientes'>
                  <select
                    id='selectClientes'
                    value={idclientes}
                    className='form-select'
                    name='idclientes'
                    onChange={(e) => setIdCliente(e.target.value)}
                  >
                    <option></option>

                  </select> 
                </FormGroup>
              </SubCard>

              <FormGroup label='Status: *' htmlFor='inputStatus'>
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id='statusAtivo'
                            value="ativo"
                            className="form-check-input"
                            name='status'
                            checked={status === "Ativo"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="statusAtivo">
                            Ativo
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id='statusInativo'
                            value="inativo"
                            className="form-check-input"
                            name='status'
                            checked={status === "Inativo"}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="statusInativo">
                            Inativo
                        </label>
                    </div>
                </div>
              </FormGroup>

              <FormGroup label="Descrição da Aula:" htmlFor="inputDescricao">
                <textarea
                  id="inputDescricao"
                  className="form-control"
                  value={descricao}
                  name='descricao'
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Informe uma breve descrição da aula"
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction="row">
                <button onClick={salvar} type="button" className="btn btn-primary">
                  Salvar
                </button>
                <button onClick={cancelar} type="button" className="btn btn-danger">
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

export default CadastroAulas;
