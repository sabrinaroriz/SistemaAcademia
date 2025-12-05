import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from "../components/card";
import SubCard from "../components/sub-card";
import FormGroup from "../components/form-group";

import "../custom.css";
import { BASE_URL } from "../config/axios";

function ResumoDoDia() {
  const baseURL = `${BASE_URL}4/resumododia`;

  const [dados, setDados] = useState(null);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((resp) => setDados(resp.data))
      .catch((err) => console.log("Erro ao carregar resumo:", err));
  }, []);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Resumo do Dia">

        <SubCard title="Indicadores Gerais">
          <FormGroup label="Total de Clientes Presentes:">
            <input
              disabled
              type="text"
              className="form-control"
              value={dados.presentes}
            />
          </FormGroup>
        </SubCard>

        <SubCard title="Aulas Agora">
          {dados.aulasAgora?.length > 0 ? (
            dados.aulasAgora.map((aula, index) => (
              <div key={index} className="mb-2">
                <strong>{aula.nome}</strong> — {aula.professor}
              </div>
            ))
          ) : (
            <p>Nenhuma aula neste momento.</p>
          )}
        </SubCard>

        <SubCard title="Avisos">
          {dados.avisos?.length > 0 ? (
            dados.avisos.map((aviso, index) => (
              <div key={index}>{aviso}</div>
            ))
          ) : (
            <p>Sem avisos hoje.</p>
          )}
        </SubCard>

        <SubCard title="Ocupação por Horário">
          {dados.ocupacao ? (
            <div>
              {dados.ocupacao.horarios.map((h, i) => (
                <div key={i}>
                  <strong>{h}:</strong> {dados.ocupacao.valores[i]} pessoas
                </div>
              ))}
            </div>
          ) : (
            <p>Sem dados de ocupação.</p>
          )}
        </SubCard>

      </Card>
    </div>
  );
}

export default ResumoDoDia;
