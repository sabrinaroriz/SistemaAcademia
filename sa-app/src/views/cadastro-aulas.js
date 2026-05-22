import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

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
  const baseURLlistaEquipamentoAula = `${BASE_URL}4/listasequipamentosaulas`;
  const baseURLlistaClienteAula = `${BASE_URL}5/listasclientesaulas`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idFuncionario, setIdFuncionario] = useState(0);
  const [dataAula, setDataAula] = useState(dayjs());
  const [horaAula, setHoraAula] = useState('');
  const [status, setStatus] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [descricao, setDescricao] = useState('');

  const [listaequipamentoaula , setListaEquipamentoAula] = useState([
    { idEquipamento: 0, quantidade: 0, idAula: 0 }
  ]);

  const [listaclienteaula, setListaClienteAula] = useState([
    { idCliente: 0, idAula: 0}
  ])

  const [dados, setDados] = React.useState([]);

  function adicionarEquipamento() {
    setListaEquipamentoAula([...listaequipamentoaula, { idEquipamento: 0, quantidade: '' }]);
  }

  function adicionarCliente() {
    setListaClienteAula([...listaclienteaula, {idCliente: 0}]);
  }

  function atualizarEquipamento(index, campo, valor) {
    const novos = [...listaequipamentoaula];
    novos[index][campo] = valor;
    setListaEquipamentoAula(novos);
  }

  function atualizarCliente(index, campo, valor) {
    const novos = [...listaclienteaula];
    novos[index][campo] = valor;
    setListaClienteAula(novos);
  }  

  function removerEquipamento(index) {
    const novos = listaequipamentoaula.filter((_, i) => i !== index);
    setListaEquipamentoAula(novos);
  }

  function removerCliente(index) {
    const novos = listaclienteaula.filter((_, i) => i !== index);
    setListaClienteAula(novos);
  }

  function cancelar() {
    const confirmar = window.confirm('Deseja realmente voltar?');
    if (confirmar) {
      navigate('/listagem-aulas');
    }
  }

  function limparFormulario() {
    const temCamposPreenchidos =
      nome !== '' || idFuncionario !== '' || dataAula !== '' || horaAula !== '' || capacidade !== '' || dadosClientes.some(cl => cl.idCliente !== 0) || dadosEquipamentos.some(cl => cl.idEquipamento !==0) || status !== '';
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
      setIdFuncionario('');
      setDataAula(dayjs());
      setHoraAula('');
      setStatus('');
      setCapacidade('');
      setListaEquipamentoAula([{ idEquipamento: 0, quantidade: 0 }]);
      setListaClienteAula([{ idCliente: 0 }]);
      setDescricao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setIdFuncionario(dados.idFuncionario);
      setDataAula(dayjs(dados.dataAula));
      setHoraAula(dados.horaAula);
      setStatus(dados.status);
      setCapacidade(dados.capacidade);
      if(dadosListaEquipamentoAula && dadosListaEquipamentoAula.length > 0){
        setListaEquipamentoAula(
          dadosListaEquipamentoAula.map((item) => ({
            id: item.id,
            idEquipamento: item.idEquipamento,
            quantidade: item.quantidade
          }))
        );
      }else {
        setListaEquipamentoAula([{ idEquipamento: 0, quantidade: 0 }]);
      }
      
      if(dadosListaClienteAula && dadosListaClienteAula.length > 0){
        setListaClienteAula(
          dadosListaClienteAula.map((item) => ({
            id: item.id,
            idCliente: item.idCliente
          }))
        );
      }else {
        setListaClienteAula([{ idCliente: 0 }]);
      }

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
    if (!horaAula) {
      mensagemErro('O campo Horário é obrigatório!');
      return false;
    }
    if (!idFuncionario || idFuncionario === 0) {
      mensagemErro('O campo Funcionário é obrigatório!');
      return false;
    }
    if (!capacidade || Number(capacidade) <= 0) {
      mensagemErro('O campo Capacidade deve ser maior que zero!');
      return false;
    }
    if (!status == null) {
      mensagemErro('O campo Status é obrigatório!');
      return false;
    }
    const clientesValidos = listaclienteaula.filter(c => Number(c.idCliente) !== 0);

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
      let data = { id,nome,idFuncionario,dataAula,horaAula,
          status,capacidade,descricao };
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
        if(item.idEquipamento === 0 || item.quantidade === '') continue;
        if(item.id == null){
          await axios.post(baseURLlistaEquipamentoAula, {
            idAula: Number(idAulaSalvo),
            idEquipamento: Number(item.idEquipamento),
            quantidade: Number(item.quantidade)
          });
        }else{
          await axios.put(`${baseURLlistaEquipamentoAula}/${item.id}`, {
            idAula: Number(idAulaSalvo),
            idEquipamento: Number(item.idEquipamento),
            quantidade: Number(item.quantidade)
          });
        }
      }

      for (const item of listaclienteaula) {
        if(item.idCliente === 0 ) continue;
        if(item.id == null){
          await axios.post(baseURLlistaClienteAula, {
            idAula: Number(idAulaSalvo),
            idCliente: Number(item.idCliente)
          });
        }else{
          await axios.put(`${baseURLlistaClienteAula}/${item.id}`, {
            idAula: Number(idAulaSalvo),
            idCliente: Number(item.idCliente)
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
      setIdFuncionario(dados.idFuncionario);
      setDataAula(dayjs(dados.dataAula));
      setHoraAula(dados.horaAula);
      setStatus(dados.status);
      setCapacidade(dados.capacidade);
      if(dadosListaEquipamentoAula && dadosListaEquipamentoAula.length > 0){
        setListaEquipamentoAula(
          dadosListaEquipamentoAula.map((item) => ({
            id: item.id,
            idEquipamento: item.idEquipamento,
            quantidade: item.quantidade,  
          }))
        );
      }else {
        setListaEquipamentoAula([{ idEquipamento: 0, quantidade: '' }]);
      }

      if(dadosListaClienteAula && dadosListaClienteAula.length > 0){
        setListaClienteAula(
          dadosListaClienteAula.map((item) => ({
            id: item.id,
            idCliente: item.idCliente  
          }))
        );
      }else {
        setListaClienteAula([{ idCliente: 0}]);
      }

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

  const[ dadosListaEquipamentoAula, setDadosListaEquipamentoAula] = useState([]);  
   
  useEffect(()=> {
    if(idParam != null){
      axios.get(`${BASE_URL}4/listasequipamentosaulas?idAula=${idParam}`)
      .then((response) => setDadosListaEquipamentoAula(response.data));
    }
  }, [idParam]);

  const[dadosListaClienteAula, setDadosListaClienteAula] = useState([]);

  useEffect(()=> {
    if(idParam != null){
      axios.get(`${BASE_URL}5/listasclientesaulas?idAula=${idParam}`)
      .then((response) => setDadosListaClienteAula(response.data));
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
  if (!dadosListaClienteAula) return null;

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
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='pt-br'
                >
                  <Stack spacing={1}>
                    <DesktopDatePicker
                      value={dataAula}
                      inputFormat='DD/MM/YYYY'
                      onChange={(e) => setDataAula(e)}
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

              <FormGroup label="Horário: *" htmlFor="inputHoraAula">
                <input
                  type="time"
                  id="inputHoraAula"
                  className="form-control"
                  name='horaAula'
                  value={horaAula}
                  onChange={(e) => setHoraAula(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Instrutor: *' htmlFor='selectFuncionario'>
                <select
                  id='selectFuncionario'
                  value={idFuncionario}
                  className='form-select'
                  name='idFuncionario'
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
                        value={item.idEquipamento}
                        className="form-select"
                        name="idEquipamento"
                        onChange={(e) => atualizarEquipamento(index, 'idEquipamento', e.target.value)}
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
                 {listaclienteaula.map((item, index) => (
                    <div key={index} className="mb-3">
                      <FormGroup label={`Cliente participante ${index + 1}: *`} htmlFor={`selectListaClienteAula${index}`}>
                        <select
                          id={`selectListaClienteAula${index}`}
                          value={item.idCliente}
                          className='form-select'
                          name='idCliente'
                          onChange={(e) => atualizarCliente(index, 'idCliente', e.target.value)}
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
                            className="form-check-input"
                            name='status'
                            checked={status === true}
                            onChange={(e) => setStatus(true)}
                        />
                        <label className="form-check-label" htmlFor="statusAtivo">
                            Ativo
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id='statusInativo'
                            className="form-check-input"
                            name='status'
                            checked={status === false}
                            onChange={(e) => setStatus(false)}
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
                <button
                  onClick={limparFormulario}
                  type='button'
                  className='btn btn-warning'
                >
                  Limpar
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