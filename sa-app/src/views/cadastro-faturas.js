import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
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
  const [cliente, setCliente] = useState('');
  const [plano, setPlano] = useState('');
  const [datavencimento, setDataVencimento] = useState('');
  const [datapagamento, setDataPagamento] = useState('');
  const [formaspagamento, setFormasPagamento] = useState('');
  const [ajustesfinanceiros, setAjustesFinanceiros] = useState('');


  const [dados, setDados] = React.useState([]);

  function cancelar() {
    if (idParam != null) {
    navigate('/listagem-formas-pagamento');
    return;
    }
    const temCamposPreenchidos =
      nome !== '' || descricao !== '';

    if (temCamposPreenchidos) {
      if (window.confirm('Deseja realmente limpar o formulário?')) {
        inicializar();
      }
    } else {
      navigate('/listagem-formas-pagamento');
    }
  }

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setDescricao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setDescricao(dados.descricao);
    }
  }

  async function salvar() {
    let data = { id, nome, descricao};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Forma de pagamento ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-formas-pagamento`);
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
          mensagemSucesso(`Forma de pagamento ${nome} alterado com sucesso!`);
          navigate(`/listagem-formas-pagamento`);
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
      setDescricao(dados.descricao);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Formas de pagamento'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  placeholder='Digite o nome da forma de pagamento'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              
              <FormGroup label='Descrição:' htmlFor='inputDescricao'>
                <textarea
                  type='text'
                  id='inputDescricao'
                  value={descricao}
                  className='form-control'
                  name='descricao'
                  rows="3"
                  onChange={(e) => setDescricao(e.target.value)}
                ></textarea>
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

export default CadastroFormasPagamento;