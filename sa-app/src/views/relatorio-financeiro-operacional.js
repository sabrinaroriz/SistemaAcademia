import React, { useEffect, useState } from 'react';
import Card from '../components/card';
import { mensagemErro } from '../components/toastr';
import '../custom.css';

import api from '../app/api';
import { BASE_URL } from '../config/axios';

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

import { Doughnut} from 'react-chartjs-2';

const baseURL = `${BASE_URL}/relatorioacademia`;

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function RelatorioAcademiaFinanceiroOperacional() {

  const [dados, setDados] = useState(null);

  useEffect(() => {
    api.get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => {
        mensagemErro('Erro ao carregar relatório.');
      });
  }, []);

  if (!dados) return null;

  const dadosFaturas = {
    labels: ['Pagas', 'Não Pagas'],
    datasets: [
      {
        data: [
          dados.faturasPagas,
          dados.faturasNaoPagas
        ],
        backgroundColor: [
          '#4caf50',
          '#f44336'
        ]
      }
    ]
  };

  const dadosEquipamentos = {
    labels: ['Disponíveis', 'Indisponíveis'],
    datasets: [
      {
        data: [
          dados.equipamentosDisponiveis,
          dados.equipamentosIndisponiveis
        ],
        backgroundColor: [
          '#2196f3',
          '#ff9800'
        ]
      }
    ]
  };

  return (
    <div className="container">
      <Card title="Relatório Financeiro e Operacional">
        <div className="row">
          
          <div className="col-lg-3">
              <div className="card text-white bg-primary mb-3">
                  <div className="card-body">
                      <h5>Faturas pagas</h5>
                      <h2>{dados.faturasPagas}</h2>
                  </div>
              </div>
          </div>

          <div className="col-lg-3">
              <div className="card text-white bg-success mb-3">
                  <div className="card-body">
                      <h5>Faturas não pagas</h5>
                      <h2>{dados.faturasNaoPagas}</h2>
                  </div>
              </div>
          </div>

          <div className="col-lg-3">
              <div className="card text-white bg-warning mb-3">
                  <div className="card-body">
                      <h5>Equipamentos disponíveis</h5>
                      <h2>{dados.equipamentosDisponiveis}</h2>
                  </div>
              </div>
          </div>

          <div className="col-lg-3">
              <div className="card text-white bg-danger mb-3">
                  <div className="card-body">
                      <h5>Equipamentos indisponíveis</h5>
                      <h2>{dados.equipamentosIndisponiveis}</h2>
                  </div>
              </div>
          </div>
        </div>

        <div className="row mt-4">

          <div className="col-lg-6">
            <h5>Faturas</h5>
            <Doughnut data={dadosFaturas} />
          </div>

          <div className="col-lg-6">
            <h5>Equipamentos</h5>
            <Doughnut data={dadosEquipamentos} />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RelatorioAcademiaFinanceiroOperacional;