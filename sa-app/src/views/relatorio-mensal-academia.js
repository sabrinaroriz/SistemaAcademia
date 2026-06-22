import React, { useEffect, useState } from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { mensagemErro } from '../components/toastr';
import '../custom.css';
import { Line } from 'react-chartjs-2';

import api from '../app/api';
import { BASE_URL } from '../config/axios';

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


const baseURL = `${BASE_URL}/relatorioacademia`;

function RelatorioMensalAcademia() {

    const [dados, setDados] = useState(null);
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());

    useEffect(() => {
        const mesFormatado = `${ano}-${String(mes).padStart(2, '0')}`;
        console.log(mesFormatado, ano);
        api.get(`${baseURL}/mensal`, {params: {mes: mesFormatado, ano: Number(ano)}})
        .then((response) => {
            setDados(response.data);
        })
        .catch(() => {
            mensagemErro('Erro ao carregar relatório.');
        });
    }, [mes, ano]);
    

    if (!dados) return <div>Carregando relatório...</div>;

    const dadosLinha = {
        labels: ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"],
        datasets: [
            {
                label: 'Receita anual',
                data: dados.receitaAnual,
                borderColor: '#4e79a7',
                backgroundColor: 'rgba(78,121,167,0.2)',
                tension: 0.3
            }
        ]
    };


    const dadosBarra = {
        labels: ['Indicadores Mensais'],
        datasets: [
            {
                label: 'Clientes Totais',
                data: [dados.clientesTotais],
                backgroundColor: '#4e79a7'
            },
            {
                label: 'Clientes Ativos',
                data: [dados.clientesAtivos],
                backgroundColor: '#59a14f'
            },
            {
                label: 'Aulas do Mês',
                data: [dados.aulasMes],
                backgroundColor: '#f28e2b'
            },
            {
                label: 'Faturas em Aberto',
                data: [dados.inadimplentes],
                backgroundColor: '#e15759'
            }
        ]
    };

    return (
        <div className="container">
            <Card title="Relatório Mensal da Academia">
                <FormGroup label="Mês:" htmlFor="mes">
                    <select
                        id="mes"
                        className="form-select"
                        value={mes}
                        onChange={(e) => setMes(e.target.value)}
                    >
                        <option value="1">Janeiro</option>
                        <option value="2">Fevereiro</option>
                        <option value="3">Março</option>
                        <option value="4">Abril</option>
                        <option value="5">Maio</option>
                        <option value="6">Junho</option>
                        <option value="7">Julho</option>
                        <option value="8">Agosto</option>
                        <option value="9">Setembro</option>
                        <option value="10">Outubro</option>
                        <option value="11">Novembro</option>
                        <option value="12">Dezembro</option>
                    </select>
                </FormGroup>
                <FormGroup label="Ano:" htmlFor="ano">
                    <input
                        type="number"
                        id="ano"
                        className="form-control"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                    />
                </FormGroup>
                <br></br>

                <div className="row">
                    <div className="col-lg-3">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-body">
                                <h5>Total de Clientes</h5>
                                <h2>{dados.clientesTotais}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-body">
                                <h5>Clientes Ativos</h5>
                                <h2>{dados.clientesAtivos}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-body">
                                <h5>Aulas do Mês</h5>
                                <h2>{dados.aulasMes}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <div className="card text-white bg-danger mb-3">
                            <div className="card-body">
                                <h5>Faturas em aberto</h5>
                                <h2>{dados.inadimplentes}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-4">
                        <div className="card p-3">
                            <h5>Receita do Mês</h5>
                            <h2>R$ {dados.receitaMes?.toFixed(2)}</h2>
                        </div>

                        <div className="card p-3 mt-3">
                            <h5>Crescimento vs Mês Anterior</h5>
                            <h2
                                style={{
                                color:
                                    dados.crescimento >= 0
                                    ? 'green'
                                    : 'red'
                                }}
                            >
                                {dados.crescimento?.toFixed(1)}%
                            </h2>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className='card p-3'>
                            <h5>Indicadores</h5>
                            <div style={{height: '250px', display:'flex', justifyContent: 'center', alignItems:'center'}}>
                                <Bar data={dadosBarra} />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <div className="row mt-4">
                <div className="col-lg-12">
                    <div className="card p-3">
                        <h5>Receita Anual</h5>
                        <Line data={dadosLinha} />
                    </div>
                </div>
            </div>
        </div>
    );


}

export default RelatorioMensalAcademia;