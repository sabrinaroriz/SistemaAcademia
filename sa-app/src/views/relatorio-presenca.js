import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card";
import { BASE_URL } from "../config/axios";

const baseURL = `${BASE_URL}5/controlepresenca`;

function RelatorioPresenca() {
  const [data, setData] = useState("");
  const [clientes, setClientes] = useState([]);
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/clientes`).then(res => {
      setClientes(res.data);
    });
  }, []);

  async function buscar() {
    if (!data) return;

    const res = await axios.get(
      `${baseURL}?data=${data}`
    );

    setRegistros(res.data);
  }

  function nomeCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? cliente.nome : "Aluno não encontrado";
  }

  return (
    <div className="container">
      <Card title="Relatório Diário de Presença">
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              max={new Date().toISOString().split("T")[0]}
              value={data}
              onChange={e => setData(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={buscar}>
              Buscar
            </button>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Entrada</th>
              <th>Saída</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {registros.map(r => (
              <tr key={r.id}>
                <td>{nomeCliente(r.idcliente)}</td>
                <td>{r.horaentrada}</td>
                <td>{r.horasaida ?? "—"}</td>
                <td>{r.status}</td>
              </tr>
            ))}

            {registros.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center">
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default RelatorioPresenca;
