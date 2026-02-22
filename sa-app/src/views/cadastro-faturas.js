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

function CadastroFaturas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}2/faturas`;

  const [id, setId] = useState('');
  const [idcliente, setIdCliente] = useState('');
  const [idplano, setIdPlano] = useState('');
  const [datavencimento, setDataVencimento] = useState('');
  const [datapagamento, setDataPagamento] = useState('');
  const [idformaspagamento, setIdFormasPagamento] = useState('');
  const [ajustesfinanceiros, setIdAjustesFinanceiros] = useState([{idajustefinanceiro: 0}]);
  const [valorFinal, setValorFinal] = useState(0);

  const [dados, setDados] = React.useState([]);

  function adicionarAjusteFinanceiro() {
  setIdAjustesFinanceiros([...ajustesfinanceiros, { idajustefinanceiro: 0}]);
  }

  function atualizarAjusteFinanceiro(index, campo, valor) {
    const novosAjustesFinanceiros = [...ajustesfinanceiros];
    novosAjustesFinanceiros[index][campo] = valor;
    setIdAjustesFinanceiros(novosAjustesFinanceiros);  
  }

  function removeAjusteFinanceiro(index) {
  const novosAjustesFinanceiros = ajustesfinanceiros.filter((_, i) => i !== index);
  setIdAjustesFinanceiros(novosAjustesFinanceiros);
 }

  function cancelar() {
    const confirmar = window.confirm('Deseja realmente voltar?');
    if (confirmar) {
      navigate('/listagem-faturas');
    }
  }

  function limparFormulario() {
    const temCamposPreenchidos =
      idcliente !== '' || idplano !== '' || datavencimento !== '' || datapagamento !== '' || idformaspagamento !== '' || ajustesfinanceiros.some(aj => aj.idajustefinanceiro !== 0);
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
      setIdPlano('');
      setDataVencimento('');
      setDataPagamento('');
      setIdFormasPagamento('');
      setIdAjustesFinanceiros([{idajustefinanceiro:0}]);
    } else {
      setId(dados.id);
      setIdCliente(dados.idcliente);
      setIdPlano(dados.idplano);
      setDataVencimento(dados.datavencimento);
      setDataPagamento(dados.datapagamento);
      setIdFormasPagamento(dados.idformaspagamento);
      setIdAjustesFinanceiros(dados.ajustesfinanceiros || [{idajustefinanceiro: 0}]);
    }
  }

  function validarCampos() {
    if (!idcliente || Number(idcliente) === 0) {
      mensagemErro('Selecione um Cliente!');
      return false;
    }
    if (!idformaspagamento || Number(idformaspagamento) === 0) {
      mensagemErro('Selecione a Forma de Pagamento!');
      return false;
    }
    if (!datavencimento) {
      mensagemErro('O campo Data de Vencimento é obrigatório!');
      return false;
    }
    if (!datapagamento) {
      mensagemErro('O campo Data de Pagamento é obrigatório!');
      return false;
    }
    return true;
  }

  async function salvar() {
    if (!validarCampos()) {
      return;
    }
    const ajustesValidos = ajustesfinanceiros.filter(a => Number(a.idajustefinanceiro) !== 0);
    let data = { id, idcliente, idplano, datavencimento, datapagamento, idformaspagamento, ajustesfinanceiros: ajustesValidos};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Fatura cadastrado com sucesso!`);
          navigate(`/listagem-faturas`);
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
          mensagemSucesso(`Fatura alterado com sucesso!`);
          navigate(`/listagem-faturas`);
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
      setIdPlano(dados.idplano);
      setDataVencimento(dados.datavencimento);
      setDataPagamento(dados.datapagamento);
      setIdFormasPagamento(dados.idformaspagamento);
      setIdAjustesFinanceiros(dados.ajustesfinanceiros || [{idajustefinanceiro:0}]);
    }
  }

  const [dadosClientes, setDadosClientes] = React.useState(null);
  const [dadosPlanos, setDadosPlanos] = React.useState(null);
  const [dadosFormasPagamento, setDadosFormasPagamento] = React.useState(null);
  const [dadosAjustesFinanceiros, setDadosAjustesFinanceiros] = React.useState(null);


  useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}/planos`).then((response) => {
      setDadosPlanos(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}3/formaspagamento`).then((response) => {
      setDadosFormasPagamento(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}3/ajustesfinanceiros`).then((response) => {
      setDadosAjustesFinanceiros(response.data);
    });
  }, []);

  useEffect(() => {
    if (datavencimento !== '') {
      const final = 0;
      setValorFinal(final);
    }
  }, [datavencimento]);

  function getNomePlano(idcliente) {
  if (!dadosClientes || !dadosPlanos) return 'Sem plano';

  const cliente = dadosClientes.find(c => c.id === Number(idcliente));
  if (!cliente) return 'Sem plano';

  const plano = dadosPlanos.find(c => c.id === cliente.idplano);
  return plano ? plano.nome : 'Sem plano';
  }



  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosClientes) return null;
  if (!dadosFormasPagamento) return null;
  if (!dadosAjustesFinanceiros) return null;

  const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className='container'>
      <Card title='Cadastro de Faturas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                <select
                  id='selectCliente'
                  value={idcliente}
                  className='form-select'
                  name='idcliente'
                  onChange={(e) => setIdCliente(e.target.value)
                    
                  }
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

              <FormGroup label='Plano do Cliente:' htmlFor='inputPlano'>
                <input
                  id='inputPlano'
                  type='text'
                  value={getNomePlano(idcliente)}
                 className='form-control'
                  name='idplano'
                />
              </FormGroup>

              <FormGroup label='Forma de Pagamento: *' htmlFor='selectFormaPagamento'>
                <select
                  id='selectFormaPagamento'
                  value={idformaspagamento}
                  className='form-select'
                  name='idformaspagamento'
                  onChange={(e) => setIdFormasPagamento(e.target.value)}
                >
                  <option key='0' value='0'>
                    {''}
                  </option>
                  {dadosFormasPagamento.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}

                </select>
              </FormGroup>
              <br></br>
               <SubCard title='Ajustes Financeiros'>
                 {ajustesfinanceiros.map((item, index) => (
                    <div key={index} className="mb-3">
                      <FormGroup label={`Ajuste ${index + 1}: `} htmlFor={`selectAjusteFinanceiro${index}`}>
                        <select
                          id={`selectAjusteFinanceiro${index}`}
                          value={item.idajustefinanceiro}
                          className='form-select'
                          name='idajustefinanceiro'
                          onChange={(e) => atualizarAjusteFinanceiro(index, 'idajustefinanceiro', e.target.value)}
                        >
                          <option key='0' value='0'>
                            {' '}
                          </option>
                          {dadosAjustesFinanceiros.map((dado) => (
                            <option key={dado.id} value={dado.id}>
                              {dado.nome}
                            </option>
                          ))}
                        </select> 
                      </FormGroup>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm mt-1"
                        onClick={() => removeAjusteFinanceiro(index)}
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={adicionarAjusteFinanceiro}
                  >
                    + Adicionar Ajuste
                  </button>
              </SubCard>

              <FormGroup label="Data de Vencimento: *" htmlFor="inputDataVencimento">
                <input
                  type="date"
                  id="inputDataVencimento"
                  className="form-control"
                  value={datavencimento}
                  name='data'
                  onChange={(e) => setDataVencimento(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Data de Pagamento: *" htmlFor="inputDataPagamento">
                <input
                  type="date"
                  id="inputDataPagamento"
                  className="form-control"
                  value={datapagamento}
                  name='data'
                  onChange={(e) => setDataPagamento(e.target.value)}
                />
              </FormGroup>
               <div className="small">Se preencher data, fatura será marcada como paga.</div>

              <br></br>
              <div className="small">Valor final: {currency.format(valorFinal)}</div>
              <br></br>

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

export default CadastroFaturas;