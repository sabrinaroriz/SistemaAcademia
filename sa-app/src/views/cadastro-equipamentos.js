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
  const [numeroSerie, setNumeroSerie] = useState('');
  const [ultManutencao, setUltManutencao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [disponivel, setDisponivel] = useState('sim');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [equipamentosList, setEquipamentosList] = useState([]);

  useEffect(() => {
    const dados = [
      {
        id: 1,
        nome: 'Esteira',
        modelo: 'ProFit X200',
        numeroSerie: 'EST-001',
        ultmanutencao: '2025-09-10',
        quantidade: '5',
        disponivel: 'sim',
        local: 'Sala de Musculação',
        descricao: 'Equipamento com alto desempenho para corrida indoor.',
      },
      {
        id: 2,
        nome: 'Bicicleta Ergométrica',
        modelo: 'SpinMaster 500',
        numeroSerie: 'BIC-002',
        ultmanutencao: '2025-08-05',
        quantidade: '3',
        disponivel: 'não',
        local: 'Sala de Manutenção',
        descricao: 'Equipamento com sistema de resistência ajustável.',
      },
    ];
    setEquipamentosList(dados);
  }, []);

  function cancelar() {
    if (window.confirm('Deseja realmente cancelar o cadastro?')) {
      navigate('/listagem-equipamentos');
    }
  }

  async function salvar() {
    try {
      if (!nome || !modelo || !numeroSerie || !quantidade || !local) {
        mensagemErro('Preencha todos os campos obrigatórios: Nome, Modelo, Nº de Série, Quantidade e Local.');
        return;
      }

      const dataEnvio = {
        id,
        nome,
        modelo,
        numeroSerie,
        ultmanutencao: ultManutencao,
        quantidade,
        disponivel,
        local,
        descricao,
      };

      if (idParam == null) {
        await axios.post(baseURL, dataEnvio, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Equipamento "${nome}" cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, dataEnvio, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Equipamento "${nome}" atualizado com sucesso!`);
      }

      navigate('/listagem-equipamentos');
    } catch (error) {
      mensagemErro('Erro ao salvar o equipamento. Verifique os dados.');
    }
  }

  const formatarData = (dataISO) => {
    if (!dataISO) return '';
    const partes = dataISO.split('-');
    if (partes.length !== 3) return dataISO;
    return `${partes[2].padStart(2, '0')}/${partes[1].padStart(2, '0')}/${partes[0]}`;
  };

  return (
    <div className="container">
      <Card title="Cadastro de Equipamentos">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">

              {/* Agora os campos Nome e Modelo são livres */}
              <FormGroup label="Nome do Equipamento: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  className="form-control"
                  value={nome}
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
                  onChange={(e) => setModelo(e.target.value)}
                  placeholder="Digite o modelo do equipamento"
                />
              </FormGroup>

              <FormGroup label="Número de Série: *" htmlFor="inputNumeroSerie">
                <input
                  type="text"
                  id="inputNumeroSerie"
                  className="form-control"
                  value={numeroSerie}
                  onChange={(e) => setNumeroSerie(e.target.value)}
                  placeholder="Ex: EST-001"
                />
              </FormGroup>

              <FormGroup label="Última Manutenção:" htmlFor="inputUltManutencao">
                <input
                  type="date"
                  id="inputUltManutencao"
                  className="form-control"
                  value={ultManutencao}
                  onChange={(e) => setUltManutencao(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Quantidade: *" htmlFor="inputQuantidade">
                <input
                  type="number"
                  id="inputQuantidade"
                  className="form-control"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                  placeholder="Ex: 5"
                />
              </FormGroup>

              <FormGroup label="Disponível: *" htmlFor="selectDisponivel">
                <select
                  id="selectDisponivel"
                  className="form-select"
                  value={disponivel}
                  onChange={(e) => setDisponivel(e.target.value)}
                >
                  <option value="sim">Sim</option>
                  <option value="não">Não</option>
                </select>
              </FormGroup>

              <FormGroup label="Local: *" htmlFor="inputLocal">
                <input
                  type="text"
                  id="inputLocal"
                  className="form-control"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Ex: Sala de Musculação"
                />
              </FormGroup>

              <FormGroup label="Descrição do Equipamento:" htmlFor="inputDescricao">
                <textarea
                  id="inputDescricao"
                  className="form-control"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Informe observações ou detalhes técnicos"
                />
              </FormGroup>

              <Stack spacing={1} padding={1} direction="row">
                <button onClick={salvar} type="button" className="btn btn-primary">
                  Salvar
                </button>
                <button onClick={cancelar} type="button" className="btn btn-danger">
                  Cancelar
                </button>
              </Stack>

              <hr />

              <h5>Equipamentos Cadastrados</h5>
              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Modelo</th>
                    <th>Nº de Série</th>
                    <th>Última Manutenção</th>
                    <th>Qtd</th>
                    <th>Disponível</th>
                    <th>Local</th>
                  </tr>
                </thead>
                <tbody>
                  {equipamentosList.map((eq) => (
                    <tr key={eq.id}>
                      <td>{eq.id}</td>
                      <td>{eq.nome}</td>
                      <td>{eq.modelo}</td>
                      <td>{eq.numeroSerie}</td>
                      <td>{formatarData(eq.ultmanutencao)}</td>
                      <td>{eq.quantidade}</td>
                      <td>{eq.disponivel}</td>
                      <td>{eq.local}</td>
                    </tr>
                  ))}
                  {equipamentosList.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center text-muted">
                        Nenhum equipamento cadastrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroEquipamentos;
