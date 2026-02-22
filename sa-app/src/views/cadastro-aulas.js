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
  const baseURLlistaEquipamentoAula = `${BASE_URL}4/listaequipamentoaula`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idfuncionario, setIdFuncionario] = useState(0);
  const [dataAula, setDataAula] = useState('');
  const [horario, setHorario] = useState('');
  const [status, setStatus] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [clientes, setIdCliente] = useState([{idcliente: 0}]);
  const [descricao, setDescricao] = useState('');

  const [listaequipamentoaula , setListaEquipamentoAula] = useState([
    { idequipamento: 0, quantidade: 0, idaula: 0 }
  ]);

  const [dados, setDados] = React.useState([]);

  function adicionarEquipamento() {
    setListaEquipamentoAula([...listaequipamentoaula, { idequipamento: 0, quantidade: '' }]);
  }

  function atualizarEquipamento(index, campo, valor) {
    const novos = [...listaequipamentoaula];
    novos[index][campo] = valor;
    setListaEquipamentoAula(novos);
  }

  function removerEquipamento(index) {
    const novos = listaequipamentoaula.filter((_, i) => i !== index);
    setListaEquipamentoAula(novos);
  }

  function adicionarCliente() {
  setIdCliente([...clientes, { idcliente: 0}]);
  }

  function atualizarCliente(index, campo, valor) {
    const novosClientes = [...clientes];
    novosClientes[index][campo] = valor;
    setIdCliente(novosClientes);  
  }

  function removerCliente(index) {
  const novosClientes = clientes.filter((_, i) => i !== index);
  setIdCliente(novosClientes);
 }

  function cancelar() {
    if (idParam != null) {
      navigate('/listagem-aulas');
      return;
    }
    const temCamposPreenchidos =
      nome !== '' || idfuncionario !== '' || dataAula !== '' || horario !== '' || capacidade !== '' || clientes.some(cl => cl.idcliente !== 0);

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
      setDataAula('');
      setHorario('');
      setStatus('');
      setCapacidade('');
      setListaEquipamentoAula([{ idequipamento: 0, quantidade: 0 }]);
      setIdCliente([{ idcliente: 0 }]);
      setDescricao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setIdFuncionario(dados.idfuncionario);
      setDataAula(dados.dataAula);
      setHorario(dados.horario);
      setStatus(dados.status);
      setCapacidade(dados.capacidade);
      if(dadosListaEquipamentoAula && dadosListaEquipamentoAula.length > 0){
        setListaEquipamentoAula(
          dadosListaEquipamentoAula.map((item) => ({
            id: item.id,
            idequipamento: item.idequipamento,
            quantidade: item.quantidade
          }))
        );
      }else {
        setListaEquipamentoAula([{ idequipamento: 0, quantidade: 0 }]);
      }
      setIdCliente(dados.clientes || [{ idcliente: 0 }]);
      setDescricao(dados.descricao);
    }
  }

  function validarCampos() {

    if (!nome || !nome.trim()) {
      mensagemErro('O campo Nome é obrigatório!');
      return false;
    }
    if (!dataAula) {
      mensagemErro('O campo Data da Aula é obrigatório!');
      return false;
    }
    if (!horario) {
      mensagemErro('O campo Horário é obrigatório!');
      return false;
    }
    if (!idfuncionario || idfuncionario === 0) {
      mensagemErro('O campo Funcionário é obrigatório!');
      return false;
    }
    if (!capacidade || Number(capacidade) <= 0) {
      mensagemErro('O campo Capacidade deve ser maior que zero!');
      return false;
    }
    if (!status || !status.trim()) {
      mensagemErro('O campo Status é obrigatório!');
      return false;
    }
    const clientesValidos = clientes.filter(c => c.idcliente != 0);

    if (clientesValidos.length === 0) {
      mensagemErro('Selecione pelo menos um cliente!');
      return false;
    }
    if (clientesValidos.length > Number(capacidade)) {
      mensagemErro('A quantidade de clientes não pode ser maior que a capacidade!');
      return false;
    }
    return true;
  }

  async function salvar() {
    if (!validarCampos()) {
      return;
    }
    try {
      let data = { id,nome,idfuncionario,dataAula,horario,
          status,capacidade,clientes,descricao };
      let idAulaSalvo = idParam;
      data = JSON.stringify(data);
      
      if (idParam == null) {
        const resp = await axios.post(baseURL, data, {
            headers: { 'Content-Type': 'application/json' },
          });
          idAulaSalvo = resp.data.id;
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, {
            headers: { 'Content-Type': 'application/json' },
          });
      }

      for (const item of listaequipamentoaula) {
        if(item.idequipamento == 0 || item.quantidade === '') continue;
        if(item.id == null){
          await axios.post(baseURLlistaEquipamentoAula, {
            idaula: Number(idAulaSalvo),
            idequipamento: Number(item.idequipamento),
            quantidade: Number(item.quantidade)
          });
        }else{
          await axios.put(`${baseURLlistaEquipamentoAula}/${item.id}`, {
            idaula: Number(idAulaSalvo),
            idequipamento: Number(item.idequipamento),
            quantidade: Number(item.quantidade)
          });
        }
      }
      mensagemSucesso(`Aula ${nome} cadastrada com sucesso!`);
      navigate(`/listagem-aulas`);

    } catch (error) {
        mensagemErro(error.response.data);
        console.log(error);
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
      setDataAula(dados.dataAula);
      setHorario(dados.horario);
      setStatus(dados.status);
      setCapacidade(dados.capacidade);
      if(dadosListaEquipamentoAula && dadosListaEquipamentoAula.length > 0){
        setListaEquipamentoAula(
          dadosListaEquipamentoAula.map((item) => ({
            id: item.id,
            idequipamento: item.idequipamento,
            quantidade: item.quantidade,  
          }))
        );
      }else {
        setListaEquipamentoAula([{ idequipamento: 0, quantidade: '' }]);
      }
      setIdCliente(dados.clientes || [{ idcliente: 0}]);
      setDescricao(dados.descricao);
    }
  }

  const[ dadosClientes, setDadosClientes] = React.useState(null);  
   
  useEffect(()=> {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);  
    });
  }, []);

  const[ dadosFuncionarios, setDadosFuncionarios] = React.useState(null);  
   
  useEffect(()=> {
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);  
    });
  }, []);

  const[ dadosEquipamentos, setDadosEquipamentos] = React.useState(null);  
   
  useEffect(()=> {
    axios.get(`${BASE_URL}2/equipamentos`).then((response) => {
      setDadosEquipamentos(response.data);  
    });
  }, []);

  const[ dadosListaEquipamentoAula, setdadosListaEquipamentoAula] = useState([]);  
   
  useEffect(()=> {
    if(idParam != null){
      axios.get(`${BASE_URL}4/listaequipamentoaula?idaula=${idParam}`)
      .then((response) => setdadosListaEquipamentoAula(response.data));
    }
  }, [idParam]);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosClientes) return null;
  if (!dadosFuncionarios) return null;
  if (!dadosEquipamentos) return null;
  if (!dadosListaEquipamentoAula) return null;

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
                  value={dataAula}
                  name='data'
                  onChange={(e) => setDataAula(e.target.value)}
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

              <FormGroup label='Instrutor: *' htmlFor='selectFuncionario'>
                <select
                  id='selectFuncionario'
                  value={idfuncionario}
                  className='form-select'
                  name='idfuncionario'
                  onChange={(e) => setIdFuncionario(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosFuncionarios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ) )}

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
              <SubCard title='Equipamentos Utilizados'>
                {listaequipamentoaula.map((item, index) => (
                  <div key={index} className="mb-3">
                    <FormGroup label={`Equipamento ${index + 1}:`} htmlFor={`selectListaEquipamentoAula${index}`}>
                      <select
                        id={`selectListaEquipamentoAula${index}`}
                        value={item.idequipamento}
                        className="form-select"
                        name="idequipamento"
                        onChange={(e) => atualizarEquipamento(index, 'idequipamento', e.target.value)}
                      >
                        <option key="0" value="0">
                          {' '}
                        </option>
                        {dadosEquipamentos.map((dado) => (
                          <option key={dado.id} value={dado.id}>
                            {dado.nome}
                          </option>
                        ))}
                      </select>
                    </FormGroup>

                    <FormGroup label="Quantidade:" htmlFor={`inputQuantidadeEquipamento${index}`}>
                      <input
                        type="number"
                        id={`inputQuantidadeEquipamento${index}`}
                        className="form-control"
                        name="quantidade"
                        value={item.quantidade}
                        onChange={(e) => atualizarEquipamento(index, 'quantidade', e.target.value.replace(/[^0-9.]/g, ''))}
                        placeholder="Informe a quantidade utilizada"
                      />
                    </FormGroup>

                    <button
                      type="button"
                      className="btn btn-danger btn-sm mt-1"
                      onClick={() => removerEquipamento(index)}
                    >
                      Remover
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={adicionarEquipamento}
                >
                  + Adicionar Equipamento
                </button>

              </SubCard>

              <SubCard title='Clientes'>
                 {clientes.map((item, index) => (
                    <div key={index} className="mb-3">
                      <FormGroup label={`Cliente participante ${index + 1}: *`} htmlFor={`selectCliente${index}`}>
                        <select
                          id={`selectCliente${index}`}
                          value={item.idcliente}
                          className='form-select'
                          name='idcliente'
                          onChange={(e) => atualizarCliente(index, 'idcliente', e.target.value)}
                        >
                          <option key='0' value='0'>
                            {' '}
                          </option>
                          {dadosClientes.map((dado) => (
                            <option key={dado.id} value={dado.id}>
                              {dado.nome}
                            </option>
                          ))}
                        </select> 
                      </FormGroup>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm mt-1"
                        onClick={() => removerCliente(index)}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={adicionarCliente}
                  >
                    + Adicionar Cliente
                  </button>
              </SubCard>

              <FormGroup label='Status: *' htmlFor='inputStatus'>
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id='statusAtivo'
                            value="Ativo"
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
                            value="Inativo"
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