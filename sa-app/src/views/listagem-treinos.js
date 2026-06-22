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

const baseURL = `${BASE_URL}/treinos`;

function ListagemTreinos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-treinos`);
  };

  const editar = (id) => {
    navigate(`/cadastro-treinos/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosClientes, setDadosClientes] = React.useState([]);
  const [dadosFuncionarios, setDadosFuncionarios] = React.useState([]);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await api
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Treino excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o Treino`);
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
    api.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    });
  }, []);


  if (!dados) return null;

  function getNomeCliente(idCliente) {
    const cliente = dadosClientes.find(c => c.id === idCliente);
    return cliente ? cliente.nome : 'Sem cliente';
  }

  function getNomeFuncionario(idFuncionario) {
    const funcionario = dadosFuncionarios.find(c => c.id === idFuncionario);
    return funcionario ? funcionario.nome : 'Sem funcionario';
  }

  function formatarData(dataCalendario) {
    const partesData = dataCalendario.substr(0, 10).split('-');

    return partesData[2] + '/' + partesData[1] + '/' + partesData[0];
  }

  return (
    <div className='container'>
      <Card title='Listagem de Treinos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => cadastrar()}
              >
                Novo Treino
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Treino</th>
                    <th scope='col'>Data</th>
                    <th scope='col'>Cliente</th>
                    <th scope='col'>Instrutor</th>
                    <th scope='col'>Descrição</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{formatarData(dado.data)}</td>
                      <td>{getNomeCliente(dado.idCliente)}</td>
                      <td>{getNomeFuncionario(dado.idFuncionario)}</td>
                      <td>{dado.descricao}</td>
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
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemTreinos;