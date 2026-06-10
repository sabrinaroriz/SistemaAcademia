import React, { useEffect, useState } from 'react';
import Card from '../components/card';
import { mensagemErro } from '../components/toastr';
import '../custom.css';

import axios from 'axios';
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

import { Doughnut, Bar } from 'react-chartjs-2';

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
    axios.get(baseURL)
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

  const dadosBarra = {
    labels: [
      'Faturas',
      'Equipamentos'
    ],
    datasets: [
      {
        label: 'Ativos/Disponíveis',
        data: [
          dados.faturasPagas,
          dados.equipamentosDisponiveis
        ],
        backgroundColor: '#4caf50'
      },
      {
        label: 'Inativos/Indisponíveis',
        data: [
          dados.faturasNaoPagas,
          dados.equipamentosIndisponiveis
        ],
        backgroundColor: '#f44336'
      }
    ]
  };

  return (
    <div className="container">
      <Card title="Relatório Financeiro e Operacional">

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

        <div className="mt-5">
          <h4>Comparativo Geral</h4>

          <div style={{ width: '900px' }}>
            <Bar data={dadosBarra} />
          </div>
        </div>

        <div className="mt-5">
          <h4>Resumo</h4>

          <h6>
            Faturas pagas: {dados.faturasPagas}
          </h6>

          <h6>
            Faturas não pagas: {dados.faturasNaoPagas}
          </h6>

          <h6>
            Equipamentos disponíveis: {dados.equipamentosDisponiveis}
          </h6>

          <h6>
            Equipamentos indisponíveis: {dados.equipamentosIndisponiveis}
          </h6>

        </div>

      </Card>
    </div>
  );
}

export default RelatorioAcademiaFinanceiroOperacional;