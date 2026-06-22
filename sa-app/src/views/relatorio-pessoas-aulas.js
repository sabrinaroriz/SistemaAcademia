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

import { Bar} from 'react-chartjs-2';

const baseURL = `${BASE_URL}/relatorioacademia`;

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend

);

function RelatorioAcademiaPessoas() {

    const [dados, setDados] = useState(null);
    
    useEffect(() => {
        api.get(baseURL)
        .then((response) => {
            setDados(response.data);
        })
        .catch(() => mensagemErro('Erro ao carregar relatório.'));
    }, []);

    if (!dados) return null;

    const dadosBarra = {
        labels: [
            'Clientes',
            'Funcionários',
            'Aulas'
        ],
        datasets: [
            {
                label: 'Ativos',
                data: [
                dados.clientesAtivos,
                dados.funcionariosAtivos,
                dados.aulasAtivas
                ],
                backgroundColor: '#4caf50'
            },
            {
                label: 'Inativos',
                data: [
                dados.clientesInativos,
                dados.funcionariosInativos,
                dados.aulasInativas
                ],
                backgroundColor: '#f44336'
            }
        ]
    };

    return (
        <div className="container">
            <Card title="Relatórios de Pessoas e Aulas">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-body">
                                <h5>Clientes</h5>
                                <div className='row'>
                                    <div className="col-lg-6">
                                        <h6>Ativos</h6>
                                        <h2>{dados.clientesAtivos}</h2>
                                    </div>

                                    <div className="col-lg-6">
                                        <h6>Inativos</h6>
                                        <h2>{dados.clientesInativos}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-body">
                                <h5>Funcionários</h5>
                                <div className='row'>
                                    <div className="col-lg-6">
                                        <h6>Ativos</h6>
                                        <h2>{dados.funcionariosAtivos}</h2>
                                    </div>

                                    <div className="col-lg-6">
                                        <h6>Inativos</h6>
                                        <h2>{dados.funcionariosInativos}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-body">
                                <h5>Aulas</h5>
                                <div className='row'>
                                    <div className="col-lg-6">
                                        <h6>Ativos</h6>
                                        <h2>{dados.aulasAtivas}</h2>
                                    </div>

                                    <div className="col-lg-6">
                                        <h6>Inativos</h6>
                                        <h2>{dados.aulasInativas}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h4>Comparativo Geral</h4>
                    <div style={{ width: '900px' }}>
                        <Bar data={dadosBarra} />
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default RelatorioAcademiaPessoas;
