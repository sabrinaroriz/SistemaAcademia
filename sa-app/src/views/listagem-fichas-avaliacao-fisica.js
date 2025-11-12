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

const baseURL = `${BASE_URL}3/fichasavaliacaofisica`;

function ListagemFichasAvaliacaoFisica() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-fichas-avaliacao-fisica`);
  };

  const editar = (id) => {
    navigate(`/cadastro-fichas-avaliacao-fisica/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosClientes, setDadosClientes] = React.useState([]);
  const [dadosFuncionarios, setDadosFuncionarios] = React.useState([]);
  

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Ficha de avaliação física excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a ficha de avaliação física`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    })
    .catch((error) => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  React.useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    })
    .catch((error) => {
        console.error('Erro ao buscar clientes:', error);
      });
  }, []);

  React.useEffect(() => {
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    })
    .catch((error) => {
        console.error('Erro ao buscar funcionarios:', error);
      });
  }, []);
  if (!dados) return null;

  function getNomeCliente(idcliente) {
    const cliente = dadosClientes.find(c => c.id === idcliente);
    return cliente ? cliente.nome : 'Sem cliente';
  }

  function getNomeFuncionario(idfuncionario) {
    const funcionario = dadosFuncionarios.find(c => c.id === idfuncionario);
    return funcionario ? funcionario.nome : 'Sem funcionario';
  }

  return (
    <div className='container'>
      <Card title='Listagem de Ficha de Avaliação Física'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => cadastrar()}
              >
                Nova Ficha de Avaliação Física
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Data da Avaliação</th>
                    <th scope='col'>Nome do Cliente</th>
                    <th scope='col'>Nome do Funcionario</th>
                    <th scope='col'>Peso</th>
                    <th scope='col'>Altura</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.datafichaavaliacao}</td>
                      <td>{getNomeCliente(dado.idcliente)}</td>
                      <td>{getNomeFuncionario(dado.idfuncionario)}</td>
                      <td>{dado.peso}</td>
                      <td>{dado.altura}</td>

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

export default ListagemFichasAvaliacaoFisica;