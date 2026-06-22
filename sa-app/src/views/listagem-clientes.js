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

const baseURL = `${BASE_URL}/clientes`;

function ListagemClientes() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-clientes`);
  };

  const editar = (id) => {
    navigate(`/cadastro-clientes/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosPlanos, setDadosPlanos] = React.useState([]);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await api
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Cliente excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o cliente`);
      });
  }

  React.useEffect(() => {
    api.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  React.useEffect(() => {
    api.get(`${BASE_URL}/planos`).then((response) => {
      setDadosPlanos(response.data);
    });
  }, []);

  if (!dados) return null;

  function getNomePlano(idPlano) {
    const plano = dadosPlanos.find(c => c.id === idPlano);
    return plano ? plano.nome : 'Sem Plano';
  }

  return (
    <div className='container'>
      <Card title='Listagem de Clientes'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => cadastrar()}
              >
                Novo Cliente
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome</th>
                    <th scope='col'>CPF</th>
                    <th scope='col'>Telefone</th>
                    <th scope='col'>Plano</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.telefone}</td>
                      <td>{getNomePlano(dado.idPlano)}</td>
                      <td>{dado.status  ? 'Ativo' : 'Inativo'}</td>
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

export default ListagemClientes;
