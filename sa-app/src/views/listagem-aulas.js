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

const baseURL = `${BASE_URL}2/aulas`;

function ListagemAulas() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-aulas`);
  };

  const editar = (id) => {
    navigate(`/cadastro-aulas/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosFuncionarios, setDadosFuncionarios] = React.useState([]);

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    await axios
      .delete(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(function (response) {
        mensagemSucesso(`Aula excluída com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir a aula`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    });
  }, []);

  if (!dados) return null;

  function formatarData(dataIso) {
    if(!dataIso) return '';
    const [ano, mes, dia] = dataIso.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  function getNomeFuncionario(idFuncionario) {
    const funcionario = dadosFuncionarios.find(c => c.id === idFuncionario);
    return funcionario ? funcionario.nome : 'Sem funcionario';
  }

  return (
    <div className='container'>
      <Card title='Listagem de Aulas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => cadastrar()}
              >
                Nova Aula
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Nome da Aula</th>
                    <th scope='col'>Funcionario</th>
                    <th scope='col'>Data</th>
                    <th scope='col'>Horario</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.nome}</td>
                      <td>{getNomeFuncionario(dado.idFuncionario)}</td>
                      <td>{formatarData(dado.dataAula)}</td>
                      <td>{dado.horaAula}</td>
                      <td>{dado.status ? 'Ativo' : 'Inativo'}</td>
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

export default ListagemAulas;