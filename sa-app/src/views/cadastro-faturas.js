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

function CadastroFaturas() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}2/faturas`;
  const baseURLlistaAjusteFinanceiroFatura = `${BASE_URL}5/listasajustesfinanceirosfaturas`;

  const [id, setId] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [idPlano, setIdPlano] = useState('');
  const [dataVencimento, setDataVencimento] = useState(dayjs());
  const [dataPagamento, setDataPagamento] = useState(dayjs());
  const [idFormaPagamento, setIdFormasPagamento] = useState('');
  const [valorFinal, setValorFinal] = useState(0);

  const [listaAjusteFinanceiroFatura, setListaAjusteFinanceiroFatura] = useState([
    { idAjusteFinanceiro: 0, idFatura: 0}
  ])

  const [dados, setDados] = React.useState([]);

  function adicionarAjusteFinanceiro() {
    setListaAjusteFinanceiroFatura([...listaAjusteFinanceiroFatura, { idAjusteFinanceiro: 0}]);
  }

  function atualizarAjusteFinanceiro(index, campo, valor) {
    const novosAjustesFinanceiros = [...listaAjusteFinanceiroFatura];
    novosAjustesFinanceiros[index][campo] = valor;
    setListaAjusteFinanceiroFatura(novosAjustesFinanceiros);  
  }

  function removeAjusteFinanceiro(index) {
  const novosAjustesFinanceiros = listaAjusteFinanceiroFatura.filter((_, i) => i !== index);
  setListaAjusteFinanceiroFatura(novosAjustesFinanceiros);
 }

  function cancelar() {
    const confirmar = window.confirm('Deseja realmente voltar?');
    if (confirmar) {
      navigate('/listagem-faturas');
    }
  }

  function limparFormulario() {
    const temCamposPreenchidos =
      idCliente !== '' || idPlano !== '' || dataVencimento !== '' || dataPagamento !== '' || idFormaPagamento !== '' || dadosAjustesFinanceiros.some(cl => cl.idAjusteFinanceiro !== 0);
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
      setDataVencimento(dayjs());
      setDataPagamento(dayjs());
      setIdFormasPagamento('');
      setListaAjusteFinanceiroFatura([{idAjusteFinanceiro:0}]);
    } else {
      setId(dados.id);
      setIdCliente(dados.idCliente);
      setIdPlano(dados.idPlano);
      setDataVencimento(dayjs(dados.dataVencimento));
      setDataPagamento(dayjs(dados.dataPagamento));
      setIdFormasPagamento(dados.idFormaPagamento);
      if(dadosListaAjustesFinanceirosFatura && dadosListaAjustesFinanceirosFatura.length > 0){
        setListaAjusteFinanceiroFatura(
          dadosListaAjustesFinanceirosFatura.map((item) => ({
            id: item.id,
            idAjusteFinanceiro: item.idAjusteFinanceiro
          }))
        );
      }else {
        setListaAjusteFinanceiroFatura([{ idAjusteFinanceiro: 0 }]);
      }
    }
  }

  function validarCampos() {
    if (!idCliente || Number(idCliente) === 0) {
      mensagemErro('Selecione um Cliente!');
      return false;
    }
    if (!idFormaPagamento || Number(idFormaPagamento) === 0) {
      mensagemErro('Selecione a Forma de Pagamento!');
      return false;
    }
    if (!dataVencimento) {
      mensagemErro('O campo Data de Vencimento é obrigatório!');
      return false;
    }
    if (!dataPagamento) {
      mensagemErro('O campo Data de Pagamento é obrigatório!');
      return false;
    }
    return true;
  }

  async function salvar() {
    if (!validarCampos()) {
      return;
    }
    try {
      let data = { id, idCliente, idPlano, dataVencimento, dataPagamento, idFormaPagamento};
      let idFaturaSalvo = idParam;
      data = JSON.stringify(data);

      if (idParam == null) {
        const resp = await axios.post(baseURL, data, {
            headers: { 'Content-Type': 'application/json' },
          });
          idFaturaSalvo = resp.data.id;
      } else {
          await axios.put(`${baseURL}/${idParam}`, data, {
            headers: { 'Content-Type': 'application/json' },
          });
      }

      for(const item of listaAjusteFinanceiroFatura) {
        if(item.idAjusteFinanceiro === 0 ) continue;
        if(item.id == null){
          await axios.post(baseURLlistaAjusteFinanceiroFatura, {
            idFatura: Number(idFaturaSalvo),
            idAjusteFinanceiro: Number(item.idAjusteFinanceiro)
          });
        }else{
          await axios.put(`${baseURLlistaAjusteFinanceiroFatura}/${item.id}`, {
            idFatura: Number(idFaturaSalvo),
            idAjusteFinanceiro: Number(item.idAjusteFinanceiro)
          });
        }
      }
         
      mensagemSucesso(`Fatura cadastrado com sucesso!`);
      navigate(`/listagem-faturas`);
      
    } catch(error) {
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
      setIdCliente(dados.idCliente);
      setIdPlano(dados.idPlano);
      setDataVencimento(dayjs(dados.dataVencimento));
      setDataPagamento(dayjs(dados.dataPagamento));
      setIdFormasPagamento(dados.idFormaPagamento);
      if(dadosListaAjustesFinanceirosFatura && dadosListaAjustesFinanceirosFatura.length > 0){
        setListaAjusteFinanceiroFatura(
          dadosListaAjustesFinanceirosFatura.map((item) => ({
            id: item.id,
            idAjusteFinanceiro: item.idAjusteFinanceiro  
          }))
        );
      }else {
        setListaAjusteFinanceiroFatura([{ idAjusteFinanceiro: 0}]);
      }
    }
  }

  const [dadosClientes, setDadosClientes] = React.useState(null);
  const [dadosPlanos, setDadosPlanos] = React.useState(null);
  const [dadosFormasPagamento, setDadosFormasPagamento] = React.useState(null);
  const [dadosAjustesFinanceiros, setDadosAjustesFinanceiros] = React.useState(null);
  const [dadosListaAjustesFinanceirosFatura, setDadosListaAjustesFinanceirosFatura] = useState([]);


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
    axios.get(`${BASE_URL}3/formaspagamentos`).then((response) => {
      setDadosFormasPagamento(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${BASE_URL}3/ajustesfinanceiros`).then((response) => {
      setDadosAjustesFinanceiros(response.data);
    });
  }, []);

  useEffect(() => {
    if(idParam != null){
      axios.get(`${BASE_URL}5/listasajustesfinanceirosfaturas?idFatura=${idParam}`)
      .then((response) => setDadosListaAjustesFinanceirosFatura(response.data));
    }
  }, [idParam]);

  useEffect(() => {
    if (dataVencimento !== '') {
      const final = 0;
      setValorFinal(final);
    }
  }, [dataVencimento]);

  function getNomePlano(idCliente) {
    if (!dadosClientes || !dadosPlanos) return 'Sem plano';
    const cliente = dadosClientes.find(c => c.id === Number(idCliente));
    if (!cliente) return 'Sem plano';
    const plano = dadosPlanos.find(c => c.id === cliente.idPlano);
    return plano ? plano.nome : 'Sem plano';
  }

  function getValorPlano(idCliente) {
    if (!dadosClientes || !dadosPlanos) return 0;
    const cliente = dadosClientes.find(c => c.id === Number(idCliente));
    if (!cliente) return 0;
    const plano = dadosPlanos.find(p => p.id === cliente.idPlano);
    return plano ? plano.valor : 0;
  }

  function getValorAjuste(idAjusteFinanceiro) {
    if (!dadosAjustesFinanceiros) return 0;
    const ajuste = dadosAjustesFinanceiros.find(a => a.id === Number(idAjusteFinanceiro));
    return ajuste ? ajuste.valor : 0;
  }



  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosClientes) return null;
  if (!dadosFormasPagamento) return null;
  if (!dadosAjustesFinanceiros) return null;
  if (!dadosListaAjustesFinanceirosFatura) return null;

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
                  value={idCliente}
                  className='form-select'
                  name='idCliente'
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
                  value={getNomePlano(idCliente)}
                 className='form-control form-control-sm'
                  name='idPlano'
                />
              </FormGroup>

              <FormGroup label='Valor do Plano: ' htmlFor='inputValorPlano'>
                <input
                  id='inputValorPlano'
                  type='text'
                  value={currency.format(getValorPlano(idCliente))}
                  className='form-control form-control-sm'
                  name='inputValorPlano'
                />
              </FormGroup>

              <FormGroup label='Forma de Pagamento: *' htmlFor='selectFormaPagamento'>
                <select
                  id='selectFormaPagamento'
                  value={idFormaPagamento}
                  className='form-select'
                  name='idFormaPagamento'
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
                 {listaAjusteFinanceiroFatura.map((item, index) => (
                    <div key={index} className="mb-3">
                      <FormGroup label={`Ajuste ${index + 1}: `} htmlFor={`selectListaAjusteFinanceiroFatura${index}`}>
                        <select
                          id={`selectListaAjusteFinanceiroFatura${index}`}
                          value={item.idAjusteFinanceiro}
                          className='form-select'
                          name='idAjusteFinanceiro'
                          onChange={(e) => atualizarAjusteFinanceiro(index, 'idAjusteFinanceiro', e.target.value)}
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
                      <FormGroup label='Valor do Ajuste: ' htmlFor='inputValorAjuste'>
                        <input
                          id='inputValorAjuste'
                          type='text'
                          value={currency.format(getValorAjuste(item.idAjusteFinanceiro))}
                          className='form-control form-control-sm'
                          name='inputValorAjuste'
                        />
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
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='pt-br'
                >
                  <Stack spacing={1}>
                    <DesktopDatePicker
                      value={dataVencimento}
                      inputFormat='DD/MM/YYYY'
                      onChange={(e) => setDataVencimento(e)}
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

              <FormGroup label="Data de Pagamento: *" htmlFor="inputDataPagamento">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='pt-br'
                >
                  <Stack spacing={1}>
                    <DesktopDatePicker
                      value={dataPagamento}
                      inputFormat='DD/MM/YYYY'
                      onChange={(e) => setDataPagamento(e)}
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
               <div className="small">Se preencher data, fatura será marcada como paga.</div>

              <br></br>
              <FormGroup label='Valor Total da Fatura: ' htmlFor='inputValorTotalFatura'>
                <input
                  id='inputValorTotalFatura'
                  type='text'
                  value={currency.format(valorFinal)}
                  className='form-control form-control-lg'
                  name='inputValorTotalFatura'
                />
              </FormGroup>
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