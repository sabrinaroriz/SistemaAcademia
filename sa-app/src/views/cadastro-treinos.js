import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import Card from '../components/card';
import SubCard from '../components/sub-card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroTreinos() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}2/treinos`;
  const baseURLlistaExercicioTreino = `${BASE_URL}4/listasexerciciostreinos`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idCliente, setIdCliente] = useState('');
  const [idFuncionario, setIdFuncionario] = useState('');
  const [data, setData] = useState(dayjs());
  const [descricao, setDescricao] = useState('');

  const [listaexerciciotreino , setListaExercicioTreino] = useState([
    { idTreino: 0, idExercicio: 0, serie: 0, repeticao: 0, carga: 0 }
  ]);

  const [dados, setDados] = React.useState([]);

  function adicionarExercicio() {
    setListaExercicioTreino([...listaexerciciotreino, { idExercicio: 0, serie: '', repeticao: '', carga: '' }]);
  }

  function atualizarExercicio(index, campo, valor) {
    const novos = [...listaexerciciotreino];
    novos[index][campo] = valor;
    setListaExercicioTreino(novos);
  }

  function removerExercicio(index) {
    const novos = listaexerciciotreino.filter((_, i) => i !== index);
    setListaExercicioTreino(novos);
  }


  function cancelar() {
    const confirmar = window.confirm('Deseja realmente voltar?');
    if (confirmar) {
      navigate('/listagem-treinos');
    }
  }

  function limparFormulario() {
    const temCamposPreenchidos =
      nome !== '' || idCliente !== '' || idFuncionario !== '' || data !== '' || descricao !== '' || dadosExercicios.some(cl => cl.idExercicio !==0);
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
      setIdCliente('');
      setIdFuncionario('');
      setData(dayjs());
      setDescricao('');
      setListaExercicioTreino([{idExercicio: 0, serie: 0, repeticao: 0, carga: 0}])
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setIdCliente(dados.idCliente);
      setIdFuncionario(dados.idFuncionario);
      setData(dayjs(dados.data));
      setDescricao(dados.descricao);
      if(dadosListaExercicioTreino && dadosListaExercicioTreino.length > 0){
        setListaExercicioTreino(
          dadosListaExercicioTreino.map((item) => ({
            id: item.id,
            idExercicio: item.idExercicio,
            serie: item.serie,
            repeticao: item.repeticao,
            carga: item.carga
          }))
        );
      }else {
        setListaExercicioTreino([{ idExercicio: 0, serie: 0, repeticao: 0, carga: 0 }]);
      }
    }
  }

  function validarCampos() {
    if (!nome || !nome.trim()) {
      mensagemErro('O campo Nome do Treino é obrigatório!');
      return false;
    }
    if (idCliente == null) {
      mensagemErro('O campo Cliente é obrigatório!');
      return false;
    }
    if (idFuncionario == null) {
      mensagemErro('O campo Instrutor é obrigatório!');
      return false;
    }
    if (!data) {
      mensagemErro('O campo Data de Registro da Ficha é obrigatório!');
      return false;
    }
    const exerciciosValidos = listaexerciciotreino.filter(e => e.idExercicio !== 0);
    if (exerciciosValidos.length === 0) {
      mensagemErro('Adicione pelo menos um exercício ao treino!');
      return false;
    }
    for (let i = 0; i < exerciciosValidos.length; i++) {
      const ex = exerciciosValidos[i];
      if (ex.serie !== '' &&  Number(ex.serie) < 0) {
        mensagemErro(`A série do exercício ${i + 1} deve ser um número válido!`);
        return false;
      }
      if (ex.repeticao !== '' && Number(ex.repeticao) < 0) {
        mensagemErro(`A repetição do exercício ${i + 1} deve ser um número válido!`);
        return false;
      }
      if (ex.carga !== '' && Number(ex.carga) < 0) {
        mensagemErro(`A carga do exercício ${i + 1} deve ser um número válido!`);
        return false;
      }
    }
      return true;
  }

  async function salvar() {
    if (!validarCampos()) {
      return;
    }
    try {
      let treino = {id, nome, idCliente, idFuncionario, data, descricao};
      let idTreinoSalvo = idParam;
      treino = JSON.stringify(treino);

      if (idParam == null) {
        const resp = await axios.post(baseURL, treino, {
            headers: { 'Content-Type': 'application/json' },
          });
          idTreinoSalvo = resp.data.id;
      } else {
        await axios.put(`${baseURL}/${idParam}`, treino, {
            headers: { 'Content-Type': 'application/json' },
          });
      }

      for (const item of listaexerciciotreino) {
          if(item.idExercicio === 0 || item.serie === '' || item.repeticao === '' || item.carga === '') continue;
          if(item.id == null){
            await axios.post(baseURLlistaExercicioTreino, {
              idTreino: Number(idTreinoSalvo),
              idExercicio: Number(item.idExercicio),
              serie: Number(item.serie),
              repeticao: Number(item.repeticao),
              carga: Number(item.carga)
            });
          }else{
            await axios.put(`${baseURLlistaExercicioTreino}/${item.id}`, {
              idTreino: Number(idTreinoSalvo),
              idExercicio: Number(item.idExercicio),
              serie: Number(item.serie),
              repeticao: Number(item.repeticao),
              carga: Number(item.carga)
            });
          }
        }
          
        mensagemSucesso(`Treino ${nome} alterado com sucesso!`);
        navigate(`/listagem-treinos`);
      
    } catch(error) {
        mensagemErro(error.response.data);
        console.log(error);
    }
  }

  async function buscar() {
    if (idParam != null) {
      await axios.get(`${baseURL}/${idParam}`).then((response) => {
        setDados(response.data);
      });
      setId(dados.id);
      setNome(dados.nome);
      setIdCliente(dados.idCliente);
      setIdFuncionario(dados.idFuncionario);
      setData(dayjs(dados.data));
      setDescricao(dados.descricao);
      if(dadosListaExercicioTreino && dadosListaExercicioTreino.length > 0){
        setListaExercicioTreino(
          dadosListaExercicioTreino.map((item) => ({
            id: item.id,
            idExercicio: item.idExercicio,
            serie: item.serie,
            repeticao: item.repeticao,
            carga: item.carga
          }))
        );
      }else {
        setListaExercicioTreino([{ idExercicio: 0, serie: 0, repeticao: 0, carga: 0 }]);
      }
    }
  }

  const [dadosClientes, setDadosClientes] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then((response) => {
      setDadosClientes(response.data);
    });
  }, []);

  const [dadosFuncionarios, setDadosFuncionarios] = React.useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/funcionarios`).then((response) => {
      setDadosFuncionarios(response.data);
    });
  }, []);

  const[ dadosExercicios, setDadosExercicios] = React.useState(null);  
   
  useEffect(()=> {
    axios.get(`${BASE_URL}3/exercicios`).then((response) => {
      setDadosExercicios(response.data);  
    });
  }, []);

  const [dadosListaExercicioTreino, setDadosListaExercicioTreino] = useState([]);

  useEffect(()=> {
    if(idParam != null){
      axios.get(`${BASE_URL}4/listasexerciciostreinos?idTreino=${idParam}`)
      .then((response) => setDadosListaExercicioTreino(response.data));
    }
  }, [idParam]);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  if (!dadosClientes) return null;
  if (!dadosFuncionarios) return null;
  if (!dadosExercicios) return null;
  if (!dadosListaExercicioTreino) return null;

  return (
    <div className='container'>
      <Card title='Cadastro de Treinos'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>

              <FormGroup label='Nome do Treino: *' htmlFor='inputTreino'>
                <input
                  type='text'
                  id='inputNome'
                  value={nome}
                  className='form-control'
                  name='nome'
                  placeholder='Digite nome do Treino'
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>

              <FormGroup label='Cliente: *' htmlFor='selectCliente'>
                  <select
                    id='selectCliente'
                    value={idCliente}
                    className='form-select'
                    name='idCliente'
                    onChange={(e) => setIdCliente(e.target.value)}
                  >
                  <option key='0' value='0'>
                    {''}
                  </option>
                  {dadosClientes.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
                </FormGroup>
             
              <FormGroup label='Instrutor: *' htmlFor='selectIdFuncionario'>
                <select
                  id='selectIdFuncionario'
                  value={idFuncionario}
                  className='form-select'
                  name='idFuncionario'
                  onChange={(e) => setIdFuncionario(e.target.value)}
                >
                  <option key='0' value='0'>
                    {''}
                  </option>
                  {dadosFuncionarios.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label='Data de Registro da Ficha: *' htmlFor='inputData'>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='pt-br'
                >
                  <Stack spacing={1}>
                    <DesktopDatePicker
                      value={data}
                      inputFormat='DD/MM/YYYY'
                      onChange={(e) => setData(e)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: 'small',
                          className: 'campo-data'
                        }
                      }}
                    />
                  </Stack>
                </LocalizationProvider>
              </FormGroup>
              <br></br>
              <SubCard title='Treino'>
                {listaexerciciotreino.map((item, index) => (
                  <div key={index} className="mb-3">
                    <FormGroup label= {`Exercícios ${index + 1}: *`} htmlFor={`selectListaExercicioTreino${index}`}>
                      <select
                        id={`selectListaExercicioTreino${index}`}
                        value={item.idExercicio}
                        className='form-select'
                        name='idExercicio'
                        onChange={(e) => atualizarExercicio(index, 'idExercicio', e.target.value)}
                      >
                        <option key='0' value='0'>
                          {''}
                        </option>
                        {dadosExercicios.map((dado) => (
                          <option key={dado.id} value={dado.id}>
                            {dado.nome}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                    <FormGroup label='Séries:' htmlFor={`inputSeries${index}`}>
                      <input
                        type='number'
                        id={`inputSeries${index}`}
                        value={item.serie}
                        className='form-control'
                        name='serie'
                        placeholder='Ex: 3'
                        onChange={(e) => atualizarExercicio(index, 'serie', e.target.value.replace(/[^0-9.]/g, ''))}
                      />
                    </FormGroup>
                    <FormGroup label='Repetições:' htmlFor={`inputRepeticao${index}`}>
                      <input
                        type='number'
                        id={`inputRepeticao${index}`}
                        value={item.repeticao}
                        className='form-control'
                        name='repeticao'
                        placeholder='Ex: 3'
                        onChange={(e) => atualizarExercicio(index, 'repeticao', e.target.value.replace(/[^0-9.]/g, ''))}
                      />
                    </FormGroup>
                    <FormGroup label='Carga (kg):' htmlFor={`inputCarga${index}`}>
                      <input
                        type='number'
                        id={`inputCarga${index}`}
                        value={item.carga}
                        className='form-control'
                        name='carga'
                        placeholder='Ex: 10'
                        onChange={(e) => atualizarExercicio(index, 'carga', e.target.value.replace(/[^0-9.]/g, ''))}
                      />
                    </FormGroup>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mt-1"
                      onClick={() => removerExercicio(index)}
                    >
                      Remover
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={adicionarExercicio}
                >
                  + Adicionar Exercício
                </button>
                 
              </SubCard>

              <FormGroup label="Descrição e observações:" htmlFor="inputDescricao">
                <textarea
                  id="inputDescricao"
                  className="form-control"
                  value={descricao}
                  name='descricao'
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Informe objetivo do aulo e observações"
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction='row'>
                <button onClick={salvar} type='button' className='btn btn-primary'>
                  Salvar
                </button>
                <button
                  onClick={limparFormulario}
                  type='button'
                  className='btn btn-warning'
                >
                  Limpar
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
