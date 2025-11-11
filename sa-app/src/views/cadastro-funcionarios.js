import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroFuncionarios() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/funcionarios`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [idcargo, setIdCargo] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [observacoes, setObservacoes] = useState('');
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
    navigate('/listagem-funcionarios');
    return;
    }
    const temCamposPreenchidos =
      nome !== '' || cpf !== '' || telefone !== '' || email !== '' || dataNascimento !== '' || idcargo !== '' || dataAdmissao !== '' || status !== '' || observacoes !== '' || logradouro !== '' || numero !== '' || complemento !== '' || bairro !== '' || cidade !== '' || estado !== '' || cep !== '';

    if (temCamposPreenchidos) {
      if (window.confirm('Deseja realmente limpar o formulário?')) {
        inicializar();
      }
    } else {
      navigate('/listagem-funcionarios');
    }
  }

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setCpf('');
      setTelefone('');
      setEmail('');
      setDataNascimento('');
      setIdCargo('');
      setDataAdmissao('');
      setStatus('');
      setObservacoes('');
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
      setEmail(dados.email);
      setDataNascimento(dados.dataNascimento);
      setIdCargo(dados.idcargo);
      setDataAdmissao(dados.dataAdmissao);
      setStatus(dados.status);
      setObservacoes(dados.observacoes);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setCep(dados.cep);
    }
  }

  async function salvar() {
    let data = { id, nome, cpf, telefone, email, dataNascimento, idcargo, dataAdmissao, status, observacoes, logradouro, numero, complemento ,bairro ,cidade ,estado, cep};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Funcionário ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-funcionarios`);
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
          mensagemSucesso(`Funcionário ${nome} alterado com sucesso!`);
          navigate(`/listagem-funcionarios`);
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
      setEmail(dados.email);
      setDataNascimento(dados.dataNascimento);
      setIdCargo(dados.idcargo);
      setDataAdmissao(dados.dataAdmissao);
      setStatus(dados.status);
      setObservacoes(dados.observacoes);
      setLogradouro(dados.logradouro);
      setNumero(dados.numero);
      setComplemento(dados.complemento);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setEstado(dados.estado);
      setCep(dados.cep);
    }
  }

    const[ dadosCargo, setDadosCargo] = React.useState(null);  

    useEffect(()=> {
      axios.get(`${BASE_URL}/cargos`).then((response) => {
        setDadosCargo(response.data);  
    });
  }, []);
  
  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosCargo) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Funcionários">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">

              <h5 className="mb-3 mt-3">Dados Pessoais</h5>

              <FormGroup label="Nome Completo: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  className="form-control"
                  value={nome}
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome completo"
                />
              </FormGroup>

              <FormGroup label="CPF: *" htmlFor="inputCpf">
                <input
                  type="text"
                  maxLength='11'
                  id="inputCpf"
                  className="form-control"
                  value={cpf}
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                />
              </FormGroup>

              <FormGroup label="Telefone: *" htmlFor="inputTelefone">
                <input
                  type="text"
                  id="inputTelefone"
                  className="form-control"
                  value={telefone}
                  name='telefone'
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </FormGroup>

              <FormGroup label="E-mail: *" htmlFor="inputEmail">
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  value={email}
                  name='email'
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                />
              </FormGroup>

              <FormGroup label="Data de Nascimento:" htmlFor="inputDataNascimento">
                <input
                  type="date"
                  id="inputDataNascimento"
                  className="form-control"
                  value={dataNascimento}
                  name='dataNascimento'
                  onChange={(e) => setDataNascimento(e.target.value)}
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

              <h5 className="mb-3 mt-4">Dados Profissionais</h5>

              <FormGroup label="Cargo: *" htmlFor="selectCargo">
                <select
                  id="selectCargo"
                  className="form-select"
                  value={idcargo}
                  name='cargo'
                  onChange={(e) => setIdCargo(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosCargo.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ) )}
                  
                </select>
              </FormGroup>

              <FormGroup label="Data de Admissão: *" htmlFor="inputDataAdmissao">
                <input
                  type="date"
                  id="inputDataAdmissao"
                  className="form-control"
                  value={dataAdmissao}
                  name='dataAdmissao'
                  onChange={(e) => setDataAdmissao(e.target.value)}
                />
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

              <h5 className="mb-3 mt-4">Observações</h5>
              <FormGroup label="Informações adicionais:" htmlFor="inputObservacoes">
                <textarea
                  id="inputObservacoes"
                  className="form-control"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Digite observações adicionais, se houver..."
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

export default CadastroFuncionarios;
