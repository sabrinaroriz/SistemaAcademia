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

import api from '../app/api';
import formatarMoeda from '../config/util';
import { BASE_URL } from '../config/axios';


function CadastroClientes() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/clientes`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [status, setStatus] = useState(null);
  const [dataNascimento, setDataNascimento] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [idPlano, setIdPlano] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const [dados, setDados] = React.useState([]);


  function cancelar() {
    const confirmar = window.confirm('Deseja realmente voltar?');
    if (confirmar) {
      navigate('/listagem-clientes');
    }
  }

  function limparFormulario() {
    const temCamposPreenchidos =
      nome !== '' || cpf !== '' || telefone !== '' || status !== '' || dataNascimento !== '' || sexo !== '' || idPlano !== '' || logradouro !== '' || numero !== '' || complemento !== '' || bairro !== '' || cidade !== '' || estado !== '' || cep !== '';

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
      setCpf('');
      setTelefone('');
      setStatus(null);
      setDataNascimento(null);
      setSexo(null);
      setIdPlano('');
      setLogradouro('');
      setNumero('');
      setComplemento('');
      setBairro('');
      setCidade('');
      setEstado('');
      setCep('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setTelefone(dados.telefone);
      setStatus(dados.status);
      setDataNascimento(dayjs(dados.dataNascimento));
      setSexo(dados.sexo);
      setIdPlano(dados.idPlano);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setCep(dados.cep);
    }
  }

  function validarCampos() {
    if (!nome || !nome.trim()) {
      mensagemErro('O campo Nome é obrigatório!');
      return false;
    }
    if (!cpf || !cpf.trim()) {
      mensagemErro('O campo CPF é obrigatório!');
      return false;
    }
    if (cpf.length !== 11) {
      mensagemErro('O CPF deve conter 11 dígitos!');
      return false;
    }
    if (!telefone || !telefone.trim()) {
      mensagemErro('O campo Telefone é obrigatório!');
      return false;
    }
    if (!dataNascimento) {
      mensagemErro('O campo Data de Nascimento é obrigatório!');
      return false;
    }
    if (sexo == null) {
      mensagemErro('Selecione o sexo do cliente!');
      return false;
    }
    if (!logradouro || !logradouro.trim()) {
      mensagemErro('O campo Logradouro é obrigatório!');
      return false;
    }
    if (numero === '' || !numero == null) {
      mensagemErro('O campo Número é obrigatório!');
      return false;
    }
    if (Number(numero) < 0) {
      mensagemErro('O Número não pode ser negativo!');
      return false;
    }
    if (!bairro || !bairro.trim()) {
      mensagemErro('O campo Bairro é obrigatório!');
      return false;
    }
    if (!cidade || !cidade.trim()) {
      mensagemErro('O campo Cidade é obrigatório!');
      return false;
    }
    if (!estado) {
      mensagemErro('Selecione Estado!');
      return false;
    }

    if (!cep || !cep.trim()) {
      mensagemErro('O campo CEP é obrigatório!');
      return false;
    }

    if (cep.length !== 8) {
      mensagemErro('O CEP deve conter 8 dígitos!');
      return false;
    }
    if (idPlano == null) {
      mensagemErro('Selecione um Plano!');
      return false;
    }
    if (status == null) {
      mensagemErro('Selecione o Status do cliente!');
      return false;
    }
    return true;
  }

  async function salvar() {
    if (!validarCampos()) {
      return;
    }
    let data = { id, nome, cpf, telefone, status, sexo, dataNascimento, idPlano, logradouro, numero, complemento ,bairro ,cidade ,estado, cep};
    data = JSON.stringify(data);
    if (idParam == null) {
      await api
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Cliente ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-clientes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await api
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Cliente ${nome} alterado com sucesso!`);
          navigate(`/listagem-clientes`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    if (idParam != null) {
      await api.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setTelefone(dados.telefone);
      setSexo(dados.sexo);
      setStatus(dados.status);
      setDataNascimento(dayjs(dados.dataNascimento));
      setIdPlano(dados.idPlano);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setCep(dados.cep);
    }
  }

  const [dadosPlanos, setDadosPlanos] = React.useState(null);

  useEffect(() => {
    api.get(`${BASE_URL}/planos`).then((response) => { console.log(response.data);
      setDadosPlanos(response.data);
    });
  }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosPlanos) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Clientes'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <h5 className="mb-3 mt-3">Dados Pessoais</h5>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  placeholder='Digite o nome do cliente'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='CPF: *' htmlFor='imputCpf'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  placeholder="000.000.000-00"
                  onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
                />
              </FormGroup>
              <FormGroup label='Telefone: *' htmlFor='inputTelefone'>
                <input
                  type='text'
                  id='inputTelefone'
                  value={telefone}
                  maxLength='11'
                  className='form-control'
                  name='telefone'
                  placeholder="(00) 00000-0000"
                  onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ''))}
                />
              </FormGroup>

              <FormGroup label='Data de Nascimento: *' htmlFor='inputDataNascimento'>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='pt-br'
                >
                  <Stack spacing={1}>
                    <DesktopDatePicker
                      value={dataNascimento}
                      inputFormat='DD/MM/YYYY'
                      onChange={(e) => setDataNascimento(e)}
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


              <FormGroup label='Sexo: *' htmlFor='inputSexo'>
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id='sexoAtivo'
                            className="form-check-input"
                            name='sexo'
                            checked={sexo === true}
                            onChange={() => setSexo(true)}
                        />
                        <label className="form-check-label" htmlFor="sexoAtivo">
                            Masculino
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id='sexoInativo'
                            className="form-check-input"
                            name='sexo'
                            checked={sexo === false}
                            onChange={() => setSexo(false)}
                        />
                        <label className="form-check-label" htmlFor="sexoInativo">
                            Feminino
                        </label>
                    </div>
                </div>
              </FormGroup>


              <h5 className="mb-3 mt-4">Endereço</h5>
              <FormGroup label='Logradouro: *' htmlFor='inputLogradouro'>
                <input
                  type='text'
                  id='inputLogradouro'
                  value={logradouro}
                  className='form-control'
                  name='logradouro'
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Número: *' htmlFor='inputNumero'>
                <input
                  type='number'
                  min='0'
                  id='inputNumero'
                  value={numero}
                  className='form-control'
                  name='numero'
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Complemento: ' htmlFor='inputComplemento'>
                <input
                  type='text'
                  id='inputComplemento'
                  value={complemento}
                  className='form-control'
                  name='complemento'
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Bairro: *' htmlFor='inputBairro'>
                <input
                  type='text'
                  id='inputBairro'
                  value={bairro}
                  className='form-control'
                  name='bairro'
                  onChange={(e) => setBairro(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Cidade: *' htmlFor='inputCidade'>
                <input
                  type='text'
                  id='inputCidade'
                  value={cidade}
                  className='form-control'
                  name='cidade'
                  onChange={(e) => setCidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Estado: *' htmlFor='inputEstado'>
                <select
                  id='inputEstado'
                  value={estado}
                  className='form-select'
                  name='estado'
                  onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value=''>Selecione um estado</option>
                    <option value='AC'>AC</option>
                    <option value='AL'>AL</option>
                    <option value='AP'>AP</option>
                    <option value='AM'>AM</option>
                    <option value='BA'>BA</option>
                    <option value='CE'>CE</option>
                    <option value='DF'>DF</option>
                    <option value='ES'>ES</option>
                    <option value='GO'>GO</option>
                    <option value='MA'>MA</option>
                    <option value='MT'>MT</option>
                    <option value='MS'>MS</option>
                    <option value='MG'>MG</option>
                    <option value='PA'>PA</option>
                    <option value='PB'>PB</option>
                    <option value='PR'>PR</option>
                    <option value='PE'>PE</option>
                    <option value='PI'>PI</option>
                    <option value='RJ'>RJ</option>
                    <option value='RN'>RN</option>
                    <option value='RS'>RS</option>
                    <option value='RO'>RO</option>
                    <option value='RR'>RR</option>
                    <option value='SC'>SC</option>
                    <option value='SP'>SP</option>
                    <option value='SE'>SE</option>
                    <option value='TO'>TO</option>
                </select>
              </FormGroup>
              <FormGroup label='CEP: *' htmlFor='inputCep'>
                <input
                  type='text'
                  id='inputCep'
                  value={cep}
                  className='form-control'
                  name='cep'
                  placeholder='00000-000'
                  maxLength='8'
                  onChange={(e) =>
                    setCep(e.target.value.replace(/\D/g, ''))
                  }
                />
              </FormGroup>
              <br></br>
              <br></br>

              <FormGroup label='Plano: *' htmlFor='selectPlano'>
                <select
                  id='selectPlano'
                  value={idPlano}
                  className='form-select'
                  name='idPlano'
                  onChange={(e) => setIdPlano(e.target.value)}
                >
                  <option key='0' value='0'>
                    {''}
                  </option>
                  {dadosPlanos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {`${formatarMoeda(dado.valor)} - ${dado.nome} - ${dado.descricao?.trim() || 'Sem descrição'}`}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Status: *' htmlFor='inputStatus'>
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id='statusAtivo'
                            className="form-check-input"
                            name='status'
                            checked={status === true}
                            onChange={() => setStatus(true)}
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
                            onChange={() => setStatus(false)}
                        />
                        <label className="form-check-label" htmlFor="statusInativo">
                            Inativo
                        </label>
                    </div>
                </div>
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

export default CadastroClientes;