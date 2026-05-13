import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroEquipamentos() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}2/equipamentos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [modelo, setModelo] = useState('');
  const [ultManutencao, setUltManutencao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [disponivel, setDisponivel] = useState(null);
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');

  const [dados, setDados] = React.useState([]);


function cancelar() {
    const confirmar = window.confirm('Deseja realmente voltar?');
    if (confirmar) {
      navigate('/listagem-equipamentos');
    }
  }

  function limparFormulario() {
    const temCamposPreenchidos = nome !== '' || modelo !== '' || ultManutencao !== '' || quantidade !== '' || disponivel !== '' || local !== '' || descricao !== '';
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
      setNome('');
      setModelo('');
      setUltManutencao('');
      setQuantidade('');
      setDisponivel(null);
      setLocal('');
      setDescricao('');
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setModelo(dados.modelo);
      setUltManutencao(dados.ultManutencao);
      setQuantidade(dados.quantidade);
      setDisponivel(dados.disponivel);
      setLocal(dados.local);
      setDescricao(dados.descricao);
    }
  }

  function validarCampos() {
    if (!nome || !nome.trim()) {
      mensagemErro('O campo Nome é obrigatório!');
      return false;
    }
    if (!modelo || !modelo.trim()) {
      mensagemErro('O campo Modelo é obrigatório!');
      return false;
    }
    if (quantidade === '' || Number(quantidade) < 0) {
      mensagemErro('O campo Quantidade é obrigatório e não pode ser negativo!');
      return false;
    }
    if (disponivel == null) {
      mensagemErro('Selecione se o equipamento está disponível!');
      return false;
    }
    if (!local || !local.trim()) {
      mensagemErro('O campo Local é obrigatório!');
      return false;
    }
    return true;
  }

  async function salvar() {
    if (!validarCampos()) {
      return;
    }
    let data = { id, nome, modelo, ultManutencao, quantidade: Number(quantidade), disponivel, local, descricao};
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Equipamento ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-equipamentos`);
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
          mensagemSucesso(`Equipamento ${nome} alterado com sucesso!`);
          navigate(`/listagem-equipamentos`);
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
      setModelo(dados.modelo);
      setUltManutencao(dados.ultManutencao);
      setQuantidade(dados.quantidade);
      setDisponivel(dados.disponivel);
      setLocal(dados.local);
      setDescricao(dados.descricao);
    }
  }

  useEffect(() => {
      buscar(); // eslint-disable-next-line
    }, [id]);
  
    if (!dados) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Equipamentos">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome do Equipamento: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  className="form-control"
                  value={nome}
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome do equipamento"
                />
              </FormGroup>

              <FormGroup label="Modelo: *" htmlFor="inputModelo">
                <input
                  type="text"
                  id="inputModelo"
                  className="form-control"
                  value={modelo}
                  name='modelo'
                  onChange={(e) => setModelo(e.target.value)}
                  placeholder="Digite o modelo do equipamento"
                />
              </FormGroup>

              <FormGroup label="Última Manutenção:" htmlFor="inputUltManutencao">
                <input
                  type="date"
                  id="inputUltManutencao"
                  className="form-control"
                  value={ultManutencao}
                  name='ultmanutencao'
                  onChange={(e) => setUltManutencao(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Quantidade: *" htmlFor="inputQuantidade">
                <input
                  type="number"
                  id="inputQuantidade"
                  className="form-control"
                  value={quantidade}
                  name='quantidade'
                  onChange={(e) => setQuantidade(e.target.value.replace(/[^0-9.]/g, ''))}
                  placeholder="Ex: 5"
                />
              </FormGroup>

              <FormGroup label='Disponível: *' htmlFor='inputDisponivel'>
                <div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id='disponivelSim'
                            className="form-check-input"
                            name='disponivel'
                            checked={disponivel === true}
                            onChange={() => setDisponivel(true)}
                        />
                        <label className="form-check-label" htmlFor="disponivelSim">
                            Sim
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id='disponivelNao'
                            className="form-check-input"
                            name='disponivel'
                            checked={disponivel === false}
                            onChange={() => setDisponivel(false)}
                        />
                        <label className="form-check-label" htmlFor="disponivelNao">
                            Não
                        </label>
                    </div>
                </div>
              </FormGroup>

              <FormGroup label="Local: *" htmlFor="inputLocal">
                <input
                  type="text"
                  id="inputLocal"
                  className="form-control"
                  value={local}
                  name='local'
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Ex: Sala de Musculação"
                />
              </FormGroup>

              <FormGroup label="Descrição do Equipamento:" htmlFor="inputDescricao">
                <textarea
                  id="inputDescricao"
                  className="form-control"
                  value={descricao}
                  name='descricao'
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Informe observações ou detalhes técnicos"
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction="row">
                <button onClick={salvar} type="button" className="btn btn-primary">
                  Salvar
                </button>
                <button
                  onClick={limparFormulario} type='button'className='btn btn-warning'>
                  Limpar
                </button>
                <button onClick={cancelar} type="button" className="btn btn-danger">
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

export default CadastroEquipamentos;
