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

import { Bar, Doughnut} from 'react-chartjs-2';

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
        axios.get(baseURL)
        .then((response) => {
            setDados(response.data);
        })
        .catch(() => mensagemErro('Erro ao carregar relatório.'));
    }, []);

    if (!dados) return null;

    const dadosClientes = {
        labels: ['Ativos', 'Inativos'],
        datasets: [
            {
                data: [dados.clientesAtivos, dados.clientesInativos],
                backgroundColor: ['#4caf50','#f44336']
            }
        ]
    };

    const dadosFuncionarios = {
        labels: ['Ativos', 'Inativos'],
        datasets: [
            {
                data: [dados.funcionariosAtivos, dados.funcionariosInativos],
                backgroundColor: ['#2196f3','#ff9800']
            }
        ]
    };

    const dadosAulas = {
        labels: ['Ativas', 'Inativas'],
        datasets: [
            {
                data: [dados.aulasAtivas,dados.aulasInativas],
                backgroundColor: ['#9c27b0','#607d8b']
            }
        ]
    };

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
                <div className='row mt-4'>
                    <div className='col-lg-4'>
                        <h5>Clientes</h5>
                        <Doughnut data={dadosClientes}/>
                    </div>

                    <div className='col-lg-4'>
                        <h5>Funcionários</h5>
                        <Doughnut data={dadosFuncionarios}/>
                    </div>

                    <div className='col-lg-4'>
                        <h5>Aulas</h5>
                        <Doughnut data={dadosAulas}/>
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
                    <h6>Clientes ativos: {dados.clientesAtivos}</h6>
                    <h6> Clientes inativos: {dados.clientesInativos}</h6>
                    <h6>Funcionários ativos: {dados.funcionariosAtivos}</h6>
                    <h6>Funcionários inativos: {dados.funcionariosInativos}</h6>
                    <h6>Aulas ativas: {dados.aulasAtivas}</h6>
                    <h6>Aulas inativas: {dados.aulasInativas}</h6>
                </div>
            </Card>
        </div>
    );
}

export default RelatorioAcademiaPessoas;
