import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}2/faturas`;

function ListagemFaturas() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-faturas`);
  };

  const editar = (id) => {
    navigate(`/cadastro-faturas/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosClientes, setDadosClientes] = React.useState([]);
  const [dadosPlanos, setDadosPlanos] = React.useState([]);
  const [dadosFormasPagamento, setDadosFormaPagamento] = React.useState([]);
  

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Fatura excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a fatura`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get(`${BASE_URL}/planos`).then((response) => {
      setDadosPlanos(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get(`${BASE_URL}3/formaspagamento`).then((response) => {
      setDadosFormaPagamento(response.data);
    });
  }, []);


  if (!dados) return null;

  function getNomeCliente(idcliente) {
    const cliente = dadosClientes.find(c => c.id === idcliente);
    return cliente ? cliente.nome : 'Sem cliente';
  }

  function getNomePlano(idcliente) {
    const cliente = dadosClientes.find(c => c.id === idcliente);
    const plano = dadosPlanos.find(c => c.id === cliente.idplano);
    return plano ? plano.nome : 'Sem plano';
  }

  function getFormaPagamento(idformaspagamento) {
    const formaPagamento = dadosFormasPagamento.find(c => c.id === idformaspagamento);
    return formaPagamento ? formaPagamento.nome: 'Sem forma de pagamento';
  }

  function formatarData(dataIso) {
    if(!dataIso) return '';
    const [ano, mes, dia] = dataIso.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div className='container'>
      <Card title='Listagem de Faturas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => cadastrar()}
              >
                Nova Fatura
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome do cliente</th>
                    <th scope='col'>Data de vencimento</th>
                    <th scope='col'>Data de pagamento</th>
                    <th scope='col'>Plano do Cliente</th>
                    <th scope='col'>Forma de Pagamento</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{getNomeCliente(dado.idcliente)}</td>
                      <td>{formatarData(dado.datavencimento)}</td>
                      <td>{formatarData(dado.datapagamento)}</td>
                      <td>{getNomePlano(dado.idcliente)}</td>
                      <td>{getFormaPagamento(dado.idformaspagamento)}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{' '}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemFaturas;
