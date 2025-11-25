import React, { useEffect, useState } from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
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
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

const baseURL = `${BASE_URL}4/relatorioacademia`;

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function RelatorioAcademia() {
  const [dados, setDados] = useState(null);
  const [mesSelecionado, setMesSelecionado] = useState('');
  const [dadosMes, setDadosMes] = useState(null);
  const [crescimento, setCrescimento] = useState(null);
  const [mesComparacao, setMesComparacao] = useState('');
  const [dadosComparacao, setDadosComparacao] = useState(null);

  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch(() => mensagemErro('Erro ao carregar relatório.'));
  }, []);

  if (!dados) return null;

  const meses = Object.keys(dados.Mensal);

  const selecionarMes = (mes) => {
    setMesSelecionado(mes);
    const atual = dados.Mensal[mes];
    const index = meses.indexOf(mes);

    let taxa = null;

    if (index > 0) {
      const anterior = dados.Mensal[meses[index - 1]];
      taxa = (((atual.Lucro - anterior.Lucro) / anterior.Lucro) * 100).toFixed(1);
    }

    setCrescimento(taxa);
    setDadosMes(atual);
  };

  const selecionarMesComparacao = (mes) => {
    setMesComparacao(mes);
    setDadosComparacao(dados.Mensal[mes]);
  };

  const dadosDoughnut = dadosMes
    ? {
        labels: ['Receita', 'Despesas', 'Lucro'],
        datasets: [
          {
            data: [dadosMes.Receita, dadosMes.Despesas, dadosMes.Lucro],
            backgroundColor: ['#4e79a7', '#e15759', '#76b7b2']
          }
        ]
      }
    : { labels: [], datasets: [] };

  const dadosBarras = {
    labels: meses,
    datasets: [
      {
        label: 'Receita',
        data: meses.map((m) => dados.Mensal[m].Receita),
        backgroundColor: '#4e79a7'
      },
      {
        label: 'Despesas',
        data: meses.map((m) => dados.Mensal[m].Despesas),
        backgroundColor: '#e15759'
      },
      {
        label: 'Lucro',
        data: meses.map((m) => dados.Mensal[m].Lucro),
        backgroundColor: '#76b7b2'
      }
    ]
  };

  const dadosLinhaLucro = {
    labels: meses,
    datasets: [
      {
        label: 'Evolução do Lucro (%)',
        data: meses.map((m, i) =>
          i === 0
            ? 0
            : (
                ((dados.Mensal[m].Lucro - dados.Mensal[meses[i - 1]].Lucro) /
                  dados.Mensal[meses[i - 1]].Lucro) *
                100
              ).toFixed(1)
        ),
        borderWidth: 3,
        tension: 0.3
      }
    ]
  };

  const dadosComparacaoBarras =
    dadosMes && dadosComparacao
      ? {
          labels: ['Receita', 'Despesas', 'Lucro'],
          datasets: [
            {
              label: mesSelecionado,
              data: [dadosMes.Receita, dadosMes.Despesas, dadosMes.Lucro],
              backgroundColor: '#4e79a7'
            },
            {
              label: mesComparacao,
              data: [
                dadosComparacao.Receita,
                dadosComparacao.Despesas,
                dadosComparacao.Lucro
              ],
              backgroundColor: '#e15759'
            }
          ]
        }
      : { labels: [], datasets: [] };

  return (
    <div className="container">
      <Card title="Relatórios da Academia">
        <FormGroup label="Mês:" htmlFor="mes">
          <select
            id="mes"
            className="form-select"
            value={mesSelecionado}
            onChange={(e) => selecionarMes(e.target.value)}
          >
            <option value=""></option>
            {meses.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </FormGroup>

        {dadosMes && (
          <div className="row mt-4">
            <div className="col-lg-3">
              <h5>{mesSelecionado}</h5>
              <h6>Receita: R$ {dadosMes.Receita}</h6>
              <h6>Despesas: R$ {dadosMes.Despesas}</h6>
              <h6>Lucro: R$ {dadosMes.Lucro}</h6>
              {crescimento && (
                <h6>
                  Crescimento vs mês anterior:{' '}
                  <span style={{ color: crescimento >= 0 ? 'green' : 'red' }}>
                    {crescimento}%
                  </span>
                </h6>
              )}
            </div>

            <div className="col-lg-3">
              <Doughnut data={dadosDoughnut} />
            </div>

            <div className="col-lg-6">
              <Bar data={dadosBarras} />
            </div>
          </div>
        )}

        <div className="mt-5">
          <h4>Comparar com outro mês</h4>

          <FormGroup label="Comparar com:" htmlFor="mesComparacao">
            <select
              id="mesComparacao"
              className="form-select"
              value={mesComparacao}
              onChange={(e) => selecionarMesComparacao(e.target.value)}
            >
              <option value=""></option>
              {meses.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </FormGroup>

          {dadosComparacao && dadosMes && (
            <div style={{ width: '900px' }}>
              <Bar data={dadosComparacaoBarras} />
            </div>
          )}
        </div>

        <div className="mt-5" style={{ width: '900px' }}>
          <h4>Evolução de Lucro (%)</h4>
          <Line data={dadosLinhaLucro} />
        </div>

        <div className="mt-5">
          <h4>Total Anual</h4>
          <h5>R$ {dados.TotalAnual}</h5>
        </div>
      </Card>
    </div>
  );
}

export default RelatorioAcademia;
