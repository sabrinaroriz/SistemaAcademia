import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import Card from '../components/card';
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
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [capacidade, setCapacidade] = useState('');
  const [descricao, setDescricao] = useState('');

  
  const [funcionario, setFuncionario] = useState('');
  const [equipamento, setEquipamento] = useState('');
  const [cliente, setCliente] = useState('');

  
  const [aulasList, setAulasList] = useState([]);
  const [funcionariosList, setFuncionariosList] = useState([]);
  const [equipamentosList, setEquipamentosList] = useState([]);
  const [clientesList, setClientesList] = useState([]);

  
  useEffect(() => {
    
    setAulasList([
      { id: 1, nome: 'Dança' },
      { id: 2, nome: 'Spinning' },
    ]);

    setFuncionariosList([
      { id: 1, nome: 'Carlos Matos' },
      { id: 2, nome: 'Marina Silva' },
    ]);

    setEquipamentosList([
      { id: 1, nome: 'Esteira' },
      { id: 2, nome: 'Bicicleta Ergométrica' },
    ]);

    setClientesList([
      { id: 1, nome: 'Mateus Bruno' },
      { id: 2, nome: 'Pedro Fonseca' },
    ]);
  }, []);

  function cancelar() {
    if (window.confirm('Deseja realmente cancelar o cadastro?')) {
      navigate('/listagem-aulas');
    }
  }

  async function salvar() {
    try {
      const dataEnvio = {
        id,
        nome,
        funcionario: { id: funcionario },
        data,
        horario,
        status,
        capacidade,
        equipamentos: { id: equipamento },
        clientes: { id: cliente },
        descricao,
      };

      if (idParam == null) {
        await axios.post(baseURL, dataEnvio, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Aula "${nome}" cadastrada com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, dataEnvio, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Aula "${nome}" atualizada com sucesso!`);
      }

      navigate('/listagem-aulas');
    } catch (error) {
      mensagemErro('Erro ao salvar a aula. Verifique os dados.');
    }
  }

  return (
    <div className="container">
      <Card title="Cadastro de Aulas">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">

              <FormGroup label="Nome da Aula: *" htmlFor="selectAula">
                <select
                  id="selectAula"
                  className="form-select"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                >
                  <option value="">Selecione uma aula</option>
                  {aulasList.map((aula) => (
                    <option key={aula.id} value={aula.nome}>
                      {aula.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Funcionário Responsável: *" htmlFor="selectFuncionario">
                <select
                  id="selectFuncionario"
                  className="form-select"
                  value={funcionario}
                  onChange={(e) => setFuncionario(e.target.value)}
                >
                  <option value="">Selecione um funcionário</option>
                  {funcionariosList.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Equipamento Utilizado: *" htmlFor="selectEquipamento">
                <select
                  id="selectEquipamento"
                  className="form-select"
                  value={equipamento}
                  onChange={(e) => setEquipamento(e.target.value)}
                >
                  <option value="">Selecione um equipamento</option>
                  {equipamentosList.map((equi) => (
                    <option key={equi.id} value={equi.id}>
                      {equi.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Cliente: *" htmlFor="selectCliente">
                <select
                  id="selectCliente"
                  className="form-select"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                >
                  <option value="">Selecione um cliente</option>
                  {clientesList.map((cli) => (
                    <option key={cli.id} value={cli.id}>
                      {cli.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Data da Aula: *" htmlFor="inputData">
                <input
                  type="date"
                  id="inputData"
                  className="form-control"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Horário: *" htmlFor="inputHorario">
                <input
                  type="time"
                  id="inputHorario"
                  className="form-control"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Capacidade Máxima: *" htmlFor="inputCapacidade">
                <input
                  type="number"
                  id="inputCapacidade"
                  className="form-control"
                  value={capacidade}
                  onChange={(e) => setCapacidade(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Status: *" htmlFor="inputStatus">
                <select
                  id="inputStatus"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </FormGroup>

              <FormGroup label="Descrição da Aula:" htmlFor="inputDescricao">
                <textarea
                  id="inputDescricao"
                  className="form-control"
                  value={descricao}
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
