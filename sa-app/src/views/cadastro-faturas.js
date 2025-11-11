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
  const [idcliente, setIdCliente] = useState('');
  const [idplano, setIdPlano] = useState('');
  const [datavencimento, setDataVencimento] = useState('');
  const [datapagamento, setDataPagamento] = useState('');
  const [idformaspagamento, setIdFormasPagamento] = useState('');
  const [idajustesfinanceiros, setIdAjustesFinanceiros] = useState('');


  const [dados, setDados] = React.useState([]);

  function cancelar() {
    if (idParam != null) {
    navigate('/listagem-faturas');
    return;
    }
    const temCamposPreenchidos =
      idcliente !== '' || idplano !== '' || datavencimento !== '' || datapagamento !== '' || idformaspagamento !== '' || idajustesfinanceiros !== '';

    if (temCamposPreenchidos) {
      if (window.confirm('Deseja realmente limpar o formulário?')) {
        inicializar();
      }
    } else {
      navigate('/listagem-faturas');
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
      setIdAjustesFinanceiros('');
    } else {
      setId(dados.id);
      setIdCliente(dados.idcliente);
      setIdPlano(dados.idplano);
      setDataVencimento(dados.datavencimento);
      setDataPagamento(dados.datapagamento);
      setIdFormasPagamento(dados.idformaspagamento);
      setIdAjustesFinanceiros(dados.idajustesfinanceiros);
    }
  }

  async function salvar() {
    let data = { id, idcliente, idplano, datavencimento, datapagamento, idformaspagamento, idajustesfinanceiros};
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
      setIdAjustesFinanceiros(dados.idajustesfinanceiros);
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Faturas'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              
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

export default CadastroFaturas;