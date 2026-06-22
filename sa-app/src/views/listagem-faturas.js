import React from 'react';

import Card from '../components/card';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import { useNavigate } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import api from '../app/api';
import { BASE_URL } from '../config/axios';

const baseURL = `${BASE_URL}/faturas`;

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
    await api
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
    api.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  React.useEffect(() => {
    api.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  React.useEffect(() => {
    api.get(`${BASE_URL}/planos`).then((response) => {
      setDadosPlanos(response.data);
    });
  }, []);

  React.useEffect(() => {
    api.get(`${BASE_URL}/formaspagamentos`).then((response) => {
      setDadosFormaPagamento(response.data);
    });
  }, []);


  if (!dados) return null;

  function getNomeCliente(idCliente) {
    const cliente = dadosClientes.find(c => c.id === idCliente);
    return cliente ? cliente.nome : 'Sem cliente';
  }

  function getNomePlano(idCliente) {
    const cliente = dadosClientes?.find(c => c.id === Number(idCliente));
    if (!cliente) return 'Sem plano';
    const plano = dadosPlanos?.find(p => p.id === cliente.idPlano);
    return plano ? plano.nome : 'Sem plano';
  }

  function getFormaPagamento(idFormaPagamento) {
    const formaPagamento = dadosFormasPagamento.find(c => c.id === idFormaPagamento);
    return formaPagamento ? formaPagamento.nome: 'Sem forma de pagamento';
  }

  function formatarData(dataCalendario) {
    if(dataCalendario == null || dataCalendario === '') {
      return 'Pendente';
    }
    const partesData = dataCalendario.substr(0, 10).split('-');

    return partesData[2] + '/' + partesData[1] + '/' + partesData[0];
  }

  function formatarMoeda(valor) {
    if (valor === null || valor === undefined) return 'R$ 0,00';
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
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
                    <th scope='col'>Valor</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{getNomeCliente(dado.idCliente)}</td>
                      <td>{formatarData(dado.dataVencimento)}</td>
                      <td>{formatarData(dado.dataPagamento)}</td>
                      <td>{getNomePlano(dado.idCliente)}</td>
                      <td>{getFormaPagamento(dado.idFormaPagamento)}</td>
                      <td>{formatarMoeda(dado.valor)}</td>
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
