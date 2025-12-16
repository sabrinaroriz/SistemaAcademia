import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card";
import { BASE_URL } from "../config/axios";

const baseURL = `${BASE_URL}5/controlepresenca`;

function ControlePresenca() {
  const [clientes, setClientes] = useState([]);
  const [registros, setRegistros] = useState([]);

  const hoje = new Date().toISOString().split("T")[0];

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [resClientes, resPresencas] = await Promise.all([
        axios.get(`${BASE_URL}/clientes`),
        axios.get(`${baseURL}?data=${hoje}`)
      ]);

      setClientes(resClientes.data);
      setRegistros(resPresencas.data);
    } catch (error) {
      console.error("Erro ao carregar controle de presença:", error);
    }
  }

  function nomeCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? cliente.nome : "Aluno não encontrado";
  }

  return (
    <div className="container">
      <Card title="Controle de Presença - Hoje">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {registros.map(registro => (
              <tr key={registro.id}>
                <td>{nomeCliente(registro.idcliente)}</td>
                <td>{registro.horaentrada}</td>
                <td>{registro.horasaida ?? "—"}</td>
                <td>{registro.status}</td>
              </tr>
            ))}

            {registros.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  Nenhuma presença registrada hoje
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default ControlePresenca;
