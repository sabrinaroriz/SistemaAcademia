import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CurrencyInput from 'react-currency-input-field';
import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroTreinos() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}2/treinos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [funcionario, setFuncionario] = useState('');
  const [dataregistroficha, setDataRegistroFicha] = useState('');
  const [dados, setDados] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [treinos, setTreinos] = useState([
    { descricao: '', series: '', repeticoes: '', tipo: '' },
  ]);
  const [historicoFichas, setHistoricoFichas] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}2/funcionarios`)
      .then((response) => setFuncionarios(response.data))
      .catch((error) => console.error('Erro ao buscar funcionários:', error));
  }, []);

  function cancelar() {
    if (idParam != null) {
      navigate('/listagem-treinos');
      return;
    }
    const temCamposPreenchidos =
      nome !== '' || funcionario !== '' || dataregistroficha !== '';

    if (temCamposPreenchidos) {
      if (window.confirm('Deseja realmente limpar o formulário?')) {
        inicializar();
      }
    } else {
      navigate('/listagem-treinos');
    }
  }

  function inicializar() {
    if (idParam == null) {
      setId('');
      setNome('');
      setFuncionario('');
      setDataRegistroFicha('');
      setTreinos([{ descricao: '', series: '', repeticoes: '', tipo: '' }]);
      setHistoricoFichas([]);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setFuncionario(dados.funcionario);
      setDataRegistroFicha(dados.dataregistroficha);
      setTreinos(dados.treinos || []);
      setHistoricoFichas(dados.historicoFichas || []);
    }
  }

  async function salvar() {
    let dataObj = { id, nome, funcionario, dataregistroficha, treinos, historicoFichas };
    const json = JSON.stringify(dataObj);

    if (idParam == null) {
      await axios
        .post(baseURL, json, { headers: { 'Content-Type': 'application/json' } })
        .then(function () {
          mensagemSucesso(`Treino ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-treinos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, json, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function () {
          mensagemSucesso(`Treino ${nome} alterado com sucesso!`);
          navigate(`/listagem-treinos`);
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
        setId(response.data.id);
        setNome(response.data.nome);
        setFuncionario(response.data.funcionario);
        setDataRegistroFicha(response.data.dataregistroficha);
        setTreinos(response.data.treinos || []);
        setHistoricoFichas(response.data.historicoFichas || []);
      });
    }
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [idParam]);

  function adicionarTreino() {
    setTreinos([...treinos, { descricao: '', series: '', repeticoes: '', tipo: '' }]);
  }

  function atualizarTreino(index, campo, valor) {
    const novosTreinos = [...treinos];
    novosTreinos[index][campo] = valor;
    setTreinos(novosTreinos);
  }

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Treinos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
             

              <FormGroup label='Instrutor: *' htmlFor='inputFuncionario'>
                <select
                  id='inputFuncionario'
                  value={funcionario}
                  className='form-select'
                  name='funcionario'
                  onChange={(e) => setFuncionario(e.target.value)}
                >
                  <option value=''>Selecione o instrutor</option>
                  {funcionarios.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Data de Registro da Ficha:' htmlFor='inputDataRegistroFicha'>
                <input
                  type='date'
                  id='inputDataRegistroFicha'
                  value={dataregistroficha}
                  className='form-control'
                  name='dataregistroficha'
                  onChange={(e) => setDataRegistroFicha(e.target.value)}
                />
              </FormGroup>

              {treinos.map((t, index) => (
                <div key={index} className='border rounded p-3 mb-3'>
                  <FormGroup label={`Treino ${index + 1}:`} htmlFor={`inputTreino${index}`}>
                    <select
                      id={`inputTreino${index}`}
                      className='form-select'
                      value={t.tipo}
                      onChange={(e) => atualizarTreino(index, 'tipo', e.target.value)}
                    >
                      <option value=''>Selecione o Treino</option>

                      <optgroup label='Abdômen'>
                        <option value='AbdominalInfra'>Abdominal Infra</option>
                        <option value='AbdominalObliquo'>Abdominal Oblíquo</option>
                        <option value='AbdominalReto'>Abdominal Reto</option>
                        <option value='AbRoller'>Ab Roller</option>
                        <option value='ElevacaoDePerna'>Elevação de Perna</option>
                        <option value='Prancha'>Prancha</option>
                      </optgroup>

                      <optgroup label='Bíceps'>
                        <option value='RoscaAlternada'>Rosca Alternada</option>
                        <option value='RoscaConcentrada'>Rosca Concentrada</option>
                        <option value='RoscaDireta'>Rosca Direta</option>
                        <option value='RoscaMartelo'>Rosca Martelo</option>
                        <option value='RoscaScott'>Rosca Scott</option>
                      </optgroup>

                      <optgroup label='Costas'>
                        <option value='BarraFixa'>Barra Fixa</option>
                        <option value='LevantamentoTerra'>Levantamento Terra</option>
                        <option value='PuxadaFrontal'>Puxada Frontal</option>
                        <option value='PuxadaTras'>Puxada Trás</option>
                        <option value='RemadaBaixa'>Remada Baixa</option>
                        <option value='RemadaCurvada'>Remada Curvada</option>
                        <option value='RemadaUnilateral'>Remada Unilateral</option>
                      </optgroup>

                      <optgroup label='Ombros'>
                        <option value='DesenvolvimentoBarra'>Desenvolvimento com Barra</option>
                        <option value='DesenvolvimentoHalteres'>Desenvolvimento com Halteres</option>
                        <option value='ElevacaoFrontal'>Elevação Frontal</option>
                        <option value='ElevacaoLateral'>Elevação Lateral</option>
                        <option value='Encolhimento'>Encolhimento</option>
                        <option value='RemadaAlta'>Remada Alta</option>
                      </optgroup>

                      <optgroup label='Peito'>
                        <option value='CrucifixoInclinado'>Crucifixo Inclinado</option>
                        <option value='CrucifixoReto'>Crucifixo Reto</option>
                        <option value='Crossover'>Crossover</option>
                        <option value='FlexaoDeBracos'>Flexão de Braços</option>
                        <option value='SupinoDeclinado'>Supino Declinado</option>
                        <option value='SupinoInclinado'>Supino Inclinado</option>
                        <option value='SupinoReto'>Supino Reto</option>
                      </optgroup>

                      <optgroup label='Pernas'>
                        <option value='AgachamentoLivre'>Agachamento Livre</option>
                        <option value='Avanco'>Avanço</option>
                        <option value='CadeiraExtensora'>Cadeira Extensora</option>
                        <option value='CadeiraFlexora'>Cadeira Flexora</option>
                        <option value='LegPress'>Leg Press</option>
                        <option value='MesaFlexora'>Mesa Flexora</option>
                        <option value='PanturrilhaEmPe'>Panturrilha em Pé</option>
                        <option value='PanturrilhaSentado'>Panturrilha Sentado</option>
                        <option value='Stiff'>Stiff</option>
                      </optgroup>

                      <optgroup label='Tríceps'>
                        <option value='MergulhoEntreBancos'>Mergulho Entre Bancos</option>
                        <option value='TricepsBanco'>Tríceps Banco</option>
                        <option value='TricepsCorda'>Tríceps Corda</option>
                        <option value='TricepsFrances'>Tríceps Francês</option>
                        <option value='TricepsPulley'>Tríceps Pulley</option>
                        <option value='TricepsTesta'>Tríceps Testa</option>
                      </optgroup>
                    </select>
                  </FormGroup>

                  <FormGroup label='Séries:' htmlFor={`inputSeries${index}`}>
                    <input
                      type='number'
                      id={`inputSeries${index}`}
                      value={t.series}
                      className='form-control'
                      name='series'
                      placeholder='Ex: 3'
                      onChange={(e) => atualizarTreino(index, 'series', e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup label='Repetições:' htmlFor={`inputRepeticoes${index}`}>
                    <input
                      type='number'
                      id={`inputRepeticoes${index}`}
                      value={t.repeticoes}
                      className='form-control'
                      name='repeticoes'
                      placeholder='Ex: 12'
                      onChange={(e) => atualizarTreino(index, 'repeticoes', e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup label='Descrição:' htmlFor={`inputDescricao${index}`}>
                    <textarea
                      type='text'
                      id={`inputDescricao${index}`}
                      value={t.descricao}
                      className='form-control'
                      name='descricao'
                      rows='3'
                      onChange={(e) => atualizarTreino(index, 'descricao', e.target.value)}
                    ></textarea>
                  </FormGroup>
                </div>
              ))}

              {historicoFichas.length > 0 && (
                <div className='border rounded p-3 mb-3'>
                  <h6>Histórico de Fichas:</h6>
                  <ul>
                    {historicoFichas.map((h, index) => (
                      <li key={index}>
                        {h.dataregistroficha} - {h.descricao}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                type='button'
                className='btn btn-secondary mb-3'
                onClick={adicionarTreino}
              >
                + Adicionar Treino
              </button>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-primary'>
                  Salvar
                </button>
                <button onClick={cancelar} type='button' className='btn btn-danger'>
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

export default CadastroTreinos;
