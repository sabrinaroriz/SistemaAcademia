import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';



function CadastroClientes() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/clientes`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [status, setStatus] = useState('');
  const [datanascimento, setDatanascimento] = useState('');
  const [idplano, setIdPlano] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const [dados, setDados] = React.useState([]);

  function cancelar() {
    if (idParam != null) {
      navigate('/listagem-clientes');
      return;
    }
    const temCamposPreenchidos =
      nome !== '' || cpf !== '' || telefone !== '' || status !== '' || datanascimento !== '' || idplano !== '' || logradouro !== '' || numero !== '' || complemento !== '' || bairro !== '' || cidade !== '' || estado !== '' || cep !== '';

    if (temCamposPreenchidos) {
      if (window.confirm('Deseja realmente limpar o formulário?')) {
        inicializar();
      }
    } else {
      navigate('/listagem-clientes');
    }
  }

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setCpf('');
      setTelefone('');
      setStatus('');
      setDatanascimento('');
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
      setDatanascimento(dados.datanascimento);
      setIdPlano(dados.idplano);
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
    if (!datanascimento) {
      mensagemErro('O campo Data de Nascimento é obrigatório!');
      return false;
    }
    if (!logradouro || !logradouro.trim()) {
      mensagemErro('O campo Logradouro é obrigatório!');
      return false;
    }
    if (!numero || !numero.trim()) {
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
    if (!idplano || Number(idplano) === 0) {
      mensagemErro('Selecione um Plano!');
      return false;
    }
    if (!status) {
      mensagemErro('Selecione o Status do cliente!');
      return false;
    }
    return true;
  }

  async function salvar() {
    if (!validarCampos()) {
      return;
    }
    let data = { id, nome, cpf, telefone, status, datanascimento, idplano, logradouro, numero, complemento ,bairro ,cidade ,estado, cep};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
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
      await axios
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
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setCpf(dados.cpf);
      setTelefone(dados.telefone);
      setStatus(dados.status);
      setDatanascimento(dados.datanascimento);
      setIdPlano(dados.idplano);
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
    axios.get(`${BASE_URL}/planos`).then((response) => {
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
              <FormGroup label='CPF:' htmlFor='imputCpf'>
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
                  className='form-control'
                  name='telefone'
                  placeholder="(00) 00000-0000"
                  onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ''))}
                />
              </FormGroup>

              <FormGroup label='Data de Nascimento: *' htmlFor='inputDatanascimento'>
                <input
                  type='date'
                  id='inputDatanascimento'
                  value={datanascimento}
                  className='form-control'
                  name='datanascimento'
                  onChange={(e) => setDatanascimento(e.target.value)}
                />
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
                  type='text'
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
              <br></br>
              <br></br>

              <FormGroup label='Plano: *' htmlFor='selectPlano'>
                <select
                  id='selectPlano'
                  value={idplano}
                  className='form-select'
                  name='idplano'
                  onChange={(e) => setIdPlano(e.target.value)}
                >
                  <option key='0' value='0'>
                    {''}
                  </option>
                  {dadosPlanos.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
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
                            value="ativo"
                            className="form-check-input"
                            name='status'
                            checked={status === "ativo"}
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
                            checked={status === "inativo"}
                            onChange={(e) => setStatus(e.target.value)}
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