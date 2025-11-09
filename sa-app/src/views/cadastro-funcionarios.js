import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemSucesso, mensagemErro } from '../components/toastr';
import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroFuncionarios() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}2/funcionarios`;

  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cargo, setCargo] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [observacoes, setObservacoes] = useState('');

  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');

  const [cargosList, setCargosList] = useState([]);

  useEffect(() => {
    setCargosList([
      { id: 1, nome: 'Instrutor' },
      { id: 2, nome: 'Personal Trainer' },
      { id: 3, nome: 'Recepcionista' },
      { id: 4, nome: 'Gerente' },
    ]);
  }, []);

  function cancelar() {
    if (window.confirm('Deseja realmente cancelar o cadastro?')) {
      navigate('/listagem-funcionarios');
    }
  }

  async function salvar() {
    try {
      const funcionarioData = {
        id,
        nome,
        cpf,
        telefone,
        email,
        dataNascimento,
        cargo: { id: cargo },
        dataAdmissao,
        status,
        observacoes,
        endereco: {
          logradouro,
          numero,
          bairro,
          cidade,
          estado,
          cep,
        },
      };

      if (!nome || !cpf || !cargo) {
        mensagemErro('Preencha os campos obrigatórios.');
        return;
      }

      if (idParam == null) {
        await axios.post(baseURL, funcionarioData, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Funcionário "${nome}" cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, funcionarioData, {
          headers: { 'Content-Type': 'application/json' },
        });
        mensagemSucesso(`Funcionário "${nome}" atualizado com sucesso!`);
      }

      navigate('/listagem-funcionarios');
    } catch (error) {
      mensagemErro('Erro ao salvar o funcionário. Verifique os dados.');
    }
  }

  return (
    <div className="container">
      <Card title="Cadastro de Funcionários">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">

              <h5 className="mb-3 mt-3">Dados Pessoais</h5>

              <FormGroup label="Nome Completo: *" htmlFor="inputNome">
                <input
                  type="text"
                  id="inputNome"
                  className="form-control"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Digite o nome completo"
                />
              </FormGroup>

              <FormGroup label="CPF: *" htmlFor="inputCpf">
                <input
                  type="text"
                  id="inputCpf"
                  className="form-control"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="000.000.000-00"
                />
              </FormGroup>

              <FormGroup label="Telefone: *" htmlFor="inputTelefone">
                <input
                  type="text"
                  id="inputTelefone"
                  className="form-control"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(00) 00000-0000"
                />
              </FormGroup>

              <FormGroup label="E-mail: *" htmlFor="inputEmail">
                <input
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                />
              </FormGroup>

              <FormGroup label="Data de Nascimento:" htmlFor="inputDataNascimento">
                <input
                  type="date"
                  id="inputDataNascimento"
                  className="form-control"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormGroup>

              <h5 className="mb-3 mt-4">Endereço</h5>

              <FormGroup label="Logradouro: *" htmlFor="inputLogradouro">
                <input
                  type="text"
                  id="inputLogradouro"
                  className="form-control"
                  value={logradouro}
                  onChange={(e) => setLogradouro(e.target.value)}
                  placeholder="Rua, Avenida, Travessa..."
                />
              </FormGroup>

              <FormGroup label="Número: *" htmlFor="inputNumero">
                <input
                  type="text"
                  id="inputNumero"
                  className="form-control"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="Número"
                />
              </FormGroup>

              <FormGroup label="Bairro:" htmlFor="inputBairro">
                <input
                  type="text"
                  id="inputBairro"
                  className="form-control"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  placeholder="Bairro"
                />
              </FormGroup>

              <FormGroup label="Cidade: *" htmlFor="inputCidade">
                <input
                  type="text"
                  id="inputCidade"
                  className="form-control"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Cidade"
                />
              </FormGroup>

              <FormGroup label="Estado: *" htmlFor="inputEstado">
                <input
                  type="text"
                  id="inputEstado"
                  className="form-control"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  placeholder="Estado"
                />
              </FormGroup>

              <FormGroup label="CEP:" htmlFor="inputCep">
                <input
                  type="text"
                  id="inputCep"
                  className="form-control"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="00000-000"
                />
              </FormGroup>


              <h5 className="mb-3 mt-4">Dados Profissionais</h5>

              <FormGroup label="Cargo: *" htmlFor="selectCargo">
                <select
                  id="selectCargo"
                  className="form-select"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                >
                  <option value="">Selecione um cargo</option>
                  {cargosList.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup label="Data de Admissão: *" htmlFor="inputDataAdmissao">
                <input
                  type="date"
                  id="inputDataAdmissao"
                  className="form-control"
                  value={dataAdmissao}
                  onChange={(e) => setDataAdmissao(e.target.value)}
                />
              </FormGroup>

              <FormGroup label="Status:" htmlFor="selectStatus">
                <select
                  id="selectStatus"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </FormGroup>



              <h5 className="mb-3 mt-4">Observações</h5>
              <FormGroup label="Informações adicionais:" htmlFor="inputObservacoes">
                <textarea
                  id="inputObservacoes"
                  className="form-control"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Digite observações adicionais, se houver..."
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

            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroFuncionarios;
