// Dados dos estabelecimentos
const estabelecimentos = [
    // Supermercados
    {
        nome: "Cordeiro Supermercados",
        nota: 4.5,
        categoria: "Supermercado",
        ranking: 7.0,
        id_categoria: 1.0,
        endereco: "Av. Antônio Olinto, 1060 - Centro, Curvelo - MG"
    },
    {
        nome: "Hipermercado Marques Center Curvelo",
        nota: 4.5,
        categoria: "Supermercado",
        ranking: 8.0,
        id_categoria: 1.0,
        endereco: "Praça Mauá, 200 - Centro, Curvelo - MG"
    },
    {
        nome: "Supermercados BH - Bias Fortes",
        nota: 4.6,
        categoria: "Supermercado",
        ranking: 10.0,
        id_categoria: 1.0,
        endereco: "Av. Bias Fortes, 1699 - Vila de Loudes, Curvelo - MG"
    },
    {
        nome: "Supermercados BH - Avenida JK",
        nota: 4.1,
        categoria: "Supermercado",
        ranking: 5.0,
        id_categoria: 1.0,
        endereco: "Av. J K, 1051 - Passaginha, Curvelo - MG"
    },
    {
        nome: "Mart Minas - Atacado & Varejo",
        nota: 4.5,
        categoria: "Supermercado",
        ranking: 6.0,
        id_categoria: 2.0,
        endereco: "Avenida Doutor Dalton Moreira Canabrava, 860 - Bela Vista, Curvelo - MG"
    },
    {
        nome: "Cordeiro Atacarejo",
        nota: 4.5,
        categoria: "Supermercado",
        ranking: 9.0,
        id_categoria: 2.0,
        endereco: "Werna de Salvo - Av. Antonio Ernesto de Salvo - Res. Lourdes, Curvelo"
    },
    {
        nome: "Apoio Mineiro Curvelo",
        nota: 3.7,
        categoria: "Supermercado",
        ranking: 4.0,
        id_categoria: 1.0,
        endereco: "Rodovia, AMG 910, 345 - Boa Esperança, Curvelo - MG"
    },
    {
        nome: "Supermercado Matias",
        nota: 4.4,
        categoria: "Supermercado",
        ranking: 3.0,
        id_categoria: 1.0,
        endereco: "BR-135 - Jk, Curvelo - MG"
    },
    
    // Mercearias
    {
        nome: "Mercearia Santuá",
        nota: 4.1,
        categoria: "Mercearia",
        ranking: 3.0,
        id_categoria: 3.0,
        endereco: "Av. Bias Fortes, 2191-2371 - Tibira, Curvelo - MG"
    },
    {
        nome: "Ponto Certo Cereais",
        nota: 4.3,
        categoria: "Mercearia",
        ranking: 5.0,
        id_categoria: 4.0,
        endereco: "R. Luiz Euzebio, 509 - Centro, Curvelo - MG"
    },
    {
        nome: "EmbalaBem",
        nota: 4.4,
        categoria: "Mercearia",
        ranking: 6.0,
        id_categoria: 4.0,
        endereco: "Av. Dom Pedro II, 748 - Centro, Curvelo - MG"
    },
    {
        nome: "Comercial Bela Vista",
        nota: 4.1,
        categoria: "Mercearia",
        ranking: 4.0,
        id_categoria: 4.0,
        endereco: "Av. Dep. Renato Azeredo, 279 - Bela Vista"
    },
    {
        nome: "Mercearia Nivete",
        nota: 4.6,
        categoria: "Mercearia",
        ranking: 10.0,
        id_categoria: 3.0,
        endereco: "Av. Othon Bezerra de Melo, 1625 - Maria Amalia, Curvelo - MG"
    },
    {
        nome: "Super kit opção",
        nota: 4.6,
        categoria: "Mercearia",
        ranking: 9.0,
        id_categoria: 4.0,
        endereco: "R. Guarani, 585 - Passaginha, Curvelo - MG"
    },
    {
        nome: "Mercearia Nossa Senhora da Conceição",
        nota: 4.5,
        categoria: "Mercearia",
        ranking: 8.0,
        id_categoria: 3.0,
        endereco: "Av. Bias Fortes, 1421 - Vila de Loudes, Curvelo - MG"
    },
    {
        nome: "Mercearia do Julinho",
        nota: 4.5,
        categoria: "Mercearia",
        ranking: 7.0,
        id_categoria: 3.0,
        endereco: "Av. Othon Bezerra de Melo, 1708 - Maria Amalia, Curvelo - MG"
    },
    {
        nome: "Supermercado Ki Joia",
        nota: 4.1,
        categoria: "Mercearia",
        ranking: 1.0,
        id_categoria: 1.0,
        endereco: "Maria Amalia, Curvelo - MG"
    }
];

// Variáveis globais
let dadosFiltrados = [...estabelecimentos];
let graficoCategorias, graficoNotas, graficoCompetitivo;
let tipoGraficoNotas = 'line';
let estabelecimentoSelecionado = null;
let modoLista = false;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Configurar data atual
    const dataAtual = new Date();
    document.getElementById('currentDate').textContent = 
        dataAtual.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    
    // Inicializar gráficos
    inicializarGraficos();
    
    // Inicializar filtros
    inicializarFiltros();
    
    // Inicializar interações
    inicializarInteracoes();
    
    // Carregar dados iniciais
    atualizarDashboard();
});

// Inicializar gráficos
function inicializarGraficos() {
    // Gráfico de distribuição por categoria
    const ctxCategorias = document.getElementById('graficoCategorias').getContext('2d');
    graficoCategorias = new Chart(ctxCategorias, {
        type: 'doughnut',
        data: {
            labels: ['Supermercados', 'Mercearias'],
            datasets: [{
                data: [8, 9],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(240, 147, 251, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(240, 147, 251, 1)'
                ],
                borderWidth: 2,
                hoverOffset: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#cbd5e1',
                    borderColor: '#334155',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '65%'
        }
    });
    
    // Gráfico de distribuição de notas
    const ctxNotas = document.getElementById('graficoNotas').getContext('2d');
    graficoNotas = new Chart(ctxNotas, {
        type: 'line',
        data: {
            labels: ['3.0-3.5', '3.5-4.0', '4.0-4.5', '4.5-5.0'],
            datasets: [{
                label: 'Número de Estabelecimentos',
                data: [0, 1, 8, 8],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        stepSize: 1,
                        font: {
                            size: 11
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 11
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#cbd5e1',
                    titleFont: {
                        size: 12
                    },
                    bodyFont: {
                        size: 11
                    }
                }
            }
        }
    });
    
    // Gráfico competitivo (inicialmente vazio)
    const ctxCompetitivo = document.getElementById('graficoCompetitivo').getContext('2d');
    graficoCompetitivo = new Chart(ctxCompetitivo, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Nota',
                data: [],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 5,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 10
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        font: {
                            size: 9
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#f8fafc',
                    bodyColor: '#cbd5e1',
                    titleFont: {
                        size: 11
                    },
                    bodyFont: {
                        size: 10
                    }
                }
            }
        }
    });
}

// Inicializar filtros
function inicializarFiltros() {
    // Filtro de categoria
    document.getElementById('categoriaSelect').addEventListener('change', function() {
        atualizarDashboard();
    });
    
    // Filtro de ordenação
    document.getElementById('ordenacaoSelect').addEventListener('change', function() {
        atualizarDashboard();
    });
    
    // Filtro de nota mínima
    const notaRange = document.getElementById('notaRange');
    const notaValue = document.getElementById('notaValue');
    
    notaRange.addEventListener('input', function() {
        notaValue.textContent = parseFloat(this.value).toFixed(1);
    });
    
    notaRange.addEventListener('change', function() {
        atualizarDashboard();
    });
    
    // Filtro de pesquisa
    const pesquisaInput = document.getElementById('pesquisaInput');
    let pesquisaTimeout;
    
    pesquisaInput.addEventListener('input', function() {
        clearTimeout(pesquisaTimeout);
        pesquisaTimeout = setTimeout(() => {
            atualizarDashboard();
        }, 500);
    });
    
    // Botão de reset
    document.getElementById('resetFilters').addEventListener('click', function() {
        document.getElementById('categoriaSelect').value = 'todos';
        document.getElementById('ordenacaoSelect').value = 'ranking';
        document.getElementById('notaRange').value = 3;
        document.getElementById('notaValue').textContent = '3.0';
        document.getElementById('pesquisaInput').value = '';
        
        atualizarDashboard();
    });
}

// Inicializar interações
function inicializarInteracoes() {
    // Botão de refresh
    document.getElementById('refreshStats').addEventListener('click', function() {
        atualizarDashboard();
        // Animar o ícone
        const icon = this.querySelector('i');
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            icon.style.transform = 'rotate(0deg)';
        }, 500);
    });
    
    // Botões de tipo de gráfico
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            tipoGraficoNotas = this.dataset.chart;
            graficoNotas.config.type = tipoGraficoNotas;
            graficoNotas.update();
        });
    });
    
    // Filtros do ranking
    document.querySelectorAll('.ranking-filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.ranking-filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            atualizarTopRanking(this.dataset.filter);
        });
    });
    
    // Alternar visualização da lista
    document.getElementById('toggleView').addEventListener('click', function() {
        modoLista = !modoLista;
        const icon = this.querySelector('i');
        const listContainer = document.getElementById('listContainer');
        
        if (modoLista) {
            icon.className = 'fas fa-list';
            listContainer.classList.add('list-view');
        } else {
            icon.className = 'fas fa-th-large';
            listContainer.classList.remove('list-view');
        }
        
        atualizarLista();
    });
    
    // Fechar detalhes
    document.getElementById('fecharDetalhes').addEventListener('click', function() {
        fecharDetalhesExpandidos();
    });
    
    // Botão de exportação
    document.getElementById('exportData').addEventListener('click', function() {
        exportarDados();
    });
}

// Atualizar dashboard completo
function atualizarDashboard() {
    aplicarFiltros();
    atualizarResumo();
    atualizarGraficos();
    atualizarTopRanking('all');
    atualizarLista();
    atualizarFiltrosAtivos();
}

// Aplicar filtros
function aplicarFiltros() {
    const categoriaSelecionada = document.getElementById('categoriaSelect').value;
    const ordenacaoSelecionada = document.getElementById('ordenacaoSelect').value;
    const notaMinima = parseFloat(document.getElementById('notaRange').value);
    const pesquisaTexto = document.getElementById('pesquisaInput').value.toLowerCase();
    
    // Aplicar todos os filtros
    dadosFiltrados = estabelecimentos.filter(est => {
        // Filtro de categoria
        if (categoriaSelecionada !== 'todos' && est.categoria !== categoriaSelecionada) {
            return false;
        }
        
        // Filtro de nota mínima
        if (est.nota < notaMinima) {
            return false;
        }
        
        // Filtro de pesquisa
        if (pesquisaTexto && 
            !est.nome.toLowerCase().includes(pesquisaTexto) && 
            !est.endereco.toLowerCase().includes(pesquisaTexto)) {
            return false;
        }
        
        return true;
    });
    
    // Aplicar ordenação
    switch (ordenacaoSelecionada) {
        case 'ranking':
            dadosFiltrados.sort((a, b) => b.ranking - a.ranking);
            break;
        case 'nota':
            dadosFiltrados.sort((a, b) => b.nota - a.nota);
            break;
        case 'nome':
            dadosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
            break;
        case 'rankingAsc':
            dadosFiltrados.sort((a, b) => a.ranking - b.ranking);
            break;
    }
}

// Atualizar resumo
function atualizarResumo() {
    const total = dadosFiltrados.length;
    
    if (total === 0) {
        // Atualizar estatísticas principais
        ['totalEstabelecimentos', 'mediaNota', 'melhorNota', 'piorNota'].forEach(id => {
            document.getElementById(id).textContent = '0';
        });
        
        // Atualizar header
        document.getElementById('totalEstabelecimentosHeader').textContent = '0';
        document.getElementById('mediaNotaHeader').textContent = '0.0';
        document.getElementById('melhorRankingHeader').textContent = '0';
        
        return;
    }
    
    const somaNotas = dadosFiltrados.reduce((acc, est) => acc + est.nota, 0);
    const media = somaNotas / total;
    const melhorNota = Math.max(...dadosFiltrados.map(est => est.nota));
    const piorNota = Math.min(...dadosFiltrados.map(est => est.nota));
    const melhorRanking = Math.max(...dadosFiltrados.map(est => est.ranking));
    
    // Atualizar estatísticas principais
    document.getElementById('totalEstabelecimentos').textContent = total;
    document.getElementById('mediaNota').textContent = media.toFixed(1);
    document.getElementById('melhorNota').textContent = melhorNota.toFixed(1);
    document.getElementById('piorNota').textContent = piorNota.toFixed(1);
    
    // Atualizar header
    document.getElementById('totalEstabelecimentosHeader').textContent = total;
    document.getElementById('mediaNotaHeader').textContent = media.toFixed(1);
    document.getElementById('melhorRankingHeader').textContent = melhorRanking.toFixed(0);
}

// Atualizar gráficos
function atualizarGraficos() {
    // Gráfico de categorias
    const supermercados = dadosFiltrados.filter(est => est.categoria === 'Supermercado').length;
    const mercearias = dadosFiltrados.filter(est => est.categoria === 'Mercearia').length;
    const totalCategorias = supermercados + mercearias;
    
    graficoCategorias.data.datasets[0].data = [supermercados, mercearias];
    graficoCategorias.update();
    
    // Adicionar resumo abaixo do gráfico de categorias
    const categoriaSummary = document.getElementById('categoriaSummary');
    if (totalCategorias > 0) {
        const percentSuper = totalCategorias > 0 ? Math.round((supermercados / totalCategorias) * 100) : 0;
        const percentMerc = totalCategorias > 0 ? Math.round((mercearias / totalCategorias) * 100) : 0;
        categoriaSummary.innerHTML = `
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 0.8rem;">
                <span>Supermercados: <strong>${supermercados}</strong> (${percentSuper}%)</span>
                <span>Mercearias: <strong>${mercearias}</strong> (${percentMerc}%)</span>
            </div>
        `;
    } else {
        categoriaSummary.innerHTML = '<div style="text-align: center; color: #ef4444; font-style: italic; font-size: 0.8rem;">Nenhum dado para exibir</div>';
    }
    
    // Gráfico de notas
    const notas3_35 = dadosFiltrados.filter(est => est.nota >= 3.0 && est.nota < 3.5).length;
    const notas35_4 = dadosFiltrados.filter(est => est.nota >= 3.5 && est.nota < 4.0).length;
    const notas4_45 = dadosFiltrados.filter(est => est.nota >= 4.0 && est.nota < 4.5).length;
    const notas45_5 = dadosFiltrados.filter(est => est.nota >= 4.5 && est.nota <= 5.0).length;
    
    graficoNotas.data.datasets[0].data = [notas3_35, notas35_4, notas4_45, notas45_5];
    graficoNotas.update();
    
    // Adicionar resumo abaixo do gráfico de notas
    const notasSummary = document.getElementById('notasSummary');
    const totalEstabs = dadosFiltrados.length;
    
    if (totalEstabs > 0) {
        // Calcular a faixa com mais estabelecimentos
        const faixas = [
            {nome: '3.0-3.5', valor: notas3_35},
            {nome: '3.5-4.0', valor: notas35_4},
            {nome: '4.0-4.5', valor: notas4_45},
            {nome: '4.5-5.0', valor: notas45_5}
        ];
        
        const faixaMaior = faixas.reduce((prev, current) => 
            (prev.valor > current.valor) ? prev : current
        );
        
        const percentMaior = totalEstabs > 0 ? Math.round((faixaMaior.valor / totalEstabs) * 100) : 0;
        
        notasSummary.innerHTML = `
            <div style="text-align: center; font-size: 0.8rem;">
                <span>Faixa mais comum: <strong>${faixaMaior.nome}</strong> (${faixaMaior.valor} estabelecimentos, ${percentMaior}%)</span>
            </div>
        `;
    } else {
        notasSummary.innerHTML = '<div style="text-align: center; color: #ef4444; font-style: italic; font-size: 0.8rem;">Nenhum dado para exibir</div>';
    }
}

// Atualizar top ranking - FUNÇÃO CORRIGIDA
function atualizarTopRanking(filtro) {
    const topRankingDiv = document.getElementById('topRanking');
    const rankingInfo = document.getElementById('rankingInfo');
    
    // Filtrar dados se necessário
    let dadosRanking = [...dadosFiltrados];
    if (filtro === 'supermercado') {
        dadosRanking = dadosRanking.filter(est => est.categoria === 'Supermercado');
    } else if (filtro === 'mercearia') {
        dadosRanking = dadosRanking.filter(est => est.categoria === 'Mercearia');
    }
    
    // Pegar top 5
    const top5 = dadosRanking.slice(0, 5);
    
    if (top5.length === 0) {
        topRankingDiv.innerHTML = `
            <div class="ranking-item" style="justify-content: center; text-align: center; color: var(--text-muted); padding: 20px 15px; font-size: 0.85rem;">
                <i class="fas fa-search" style="font-size: 1.5rem; margin-bottom: 8px; display: block; opacity: 0.5;"></i>
                Nenhum estabelecimento encontrado
            </div>
        `;
        rankingInfo.innerHTML = '<div style="text-align: center; color: #ef4444; font-style: italic; font-size: 0.8rem;">Nenhum dado para exibir</div>';
        return;
    }
    
    topRankingDiv.innerHTML = '';
    
    top5.forEach((est, index) => {
        const rankingItem = document.createElement('div');
        rankingItem.className = 'ranking-item';
        rankingItem.dataset.id = index;
        
        // Determinar a cor da posição
        const posColors = [
            'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', // 1º
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // 2º
            'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)', // 3º
            'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', // 4º
            'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)'  // 5º
        ];
        
        // Classe da categoria
        const categoriaClass = est.categoria === 'Supermercado' ? 'category-supermercado' : 'category-mercearia';
        
        rankingItem.innerHTML = `
            <div class="ranking-pos" style="background: ${posColors[index]};">
                ${index + 1}
            </div>
            <div class="ranking-info">
                <div class="ranking-nome" title="${est.nome}">${est.nome}</div>
                <div class="ranking-meta">
                    <span class="${categoriaClass}" style="padding: 3px 8px; border-radius: 10px; font-size: 0.75rem; font-weight: 600;">
                        ${est.categoria}
                    </span>
                    <span class="ranking-score">
                        <i class="fas fa-star" style="color: #f59e0b; font-size: 0.8rem;"></i> 
                        <strong>${est.nota.toFixed(1)}</strong>
                    </span>
                </div>
            </div>
        `;
        
        rankingItem.addEventListener('click', () => {
            mostrarDetalhesExpandidos(est);
        });
        
        topRankingDiv.appendChild(rankingItem);
    });
    
    // Atualizar informações do ranking
    const totalFiltrado = dadosRanking.length;
    const melhorNotaTop5 = Math.max(...top5.map(e => e.nota));
    const piorNotaTop5 = Math.min(...top5.map(e => e.nota));
    
    rankingInfo.innerHTML = `
        <div class="ranking-info-footer">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 0.8rem;">
                <span>Total na categoria: <strong>${totalFiltrado}</strong></span>
                <span>Notas no Top 5: <strong>${melhorNotaTop5.toFixed(1)}</strong> a <strong>${piorNotaTop5.toFixed(1)}</strong></span>
            </div>
        </div>
    `;
}

// Atualizar lista
function atualizarLista() {
    const listContainer = document.getElementById('listContainer');
    const resultCount = document.getElementById('resultCount');
    
    resultCount.textContent = `${dadosFiltrados.length} ${dadosFiltrados.length === 1 ? 'resultado' : 'resultados'}`;
    
    if (dadosFiltrados.length === 0) {
        listContainer.innerHTML = `
            <div class="list-item" style="grid-column: 1 / -1; text-align: center; padding: 30px 20px; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 15px; display: block; opacity: 0.3;"></i>
                <h3 style="font-size: 1.1rem; margin-bottom: 8px;">Nenhum estabelecimento encontrado</h3>
                <p style="font-size: 0.9rem;">Tente ajustar os filtros para encontrar mais resultados</p>
            </div>
        `;
        return;
    }
    
    listContainer.innerHTML = '';
    
    dadosFiltrados.forEach((est, index) => {
        const listItem = document.createElement('div');
        listItem.className = `list-item ${est === estabelecimentoSelecionado ? 'selected' : ''}`;
        listItem.dataset.id = index;
        
        listItem.innerHTML = `
            <div class="list-item-header">
                <div class="list-item-name" title="${est.nome}">${est.nome}</div>
                <div class="list-item-rating">
                    <i class="fas fa-star"></i>
                    <span>${est.nota.toFixed(1)}</span>
                </div>
            </div>
            <div class="list-item-category ${est.categoria === 'Supermercado' ? 'category-supermercado' : 'category-mercearia'}">
                ${est.categoria}
            </div>
            <div class="list-item-details">
                <div><i class="fas fa-map-marker-alt" style="margin-right: 6px; font-size: 0.8rem;"></i> ${est.endereco}</div>
                <div style="margin-top: 8px;"><i class="fas fa-chart-line" style="margin-right: 6px; font-size: 0.8rem;"></i> Ranking: <strong>${est.ranking.toFixed(1)}</strong></div>
            </div>
        `;
        
        listItem.addEventListener('click', () => {
            // Remover seleção anterior
            document.querySelectorAll('.list-item.selected').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Adicionar seleção atual
            listItem.classList.add('selected');
            
            // Mostrar detalhes expandidos
            mostrarDetalhesExpandidos(est);
        });
        
        listContainer.appendChild(listItem);
    });
}

// Mostrar detalhes expandidos
function mostrarDetalhesExpandidos(estabelecimento) {
    estabelecimentoSelecionado = estabelecimento;
    
    // Mostrar a seção de detalhes
    document.getElementById('detalhesExpandidos').classList.add('ativo');
    
    // Rolar até a seção de detalhes
    document.getElementById('detalhesExpandidos').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
    // Preencher informações básicas
    document.getElementById('detalheNome').textContent = estabelecimento.nome;
    document.getElementById('detalheCategoria').textContent = estabelecimento.categoria;
    document.getElementById('detalheNota').textContent = estabelecimento.nota.toFixed(1);
    document.getElementById('detalheRanking').textContent = estabelecimento.ranking.toFixed(1);
    document.getElementById('detalheEndereco').textContent = estabelecimento.endereco;
    
    // Calcular comparação com média
    atualizarComparacao(estabelecimento);
    
    // Atualizar posição no ranking
    atualizarPosicaoRanking(estabelecimento);
    
    // Atualizar gráfico competitivo
    atualizarGraficoCompetitivo(estabelecimento);
    
    // Atualizar lista de competidores
    atualizarCompetidores(estabelecimento);
    
    // Gerar recomendações
    gerarRecomendacoes(estabelecimento);
}

// Fechar detalhes expandidos
function fecharDetalhesExpandidos() {
    document.getElementById('detalhesExpandidos').classList.remove('ativo');
    
    // Remover seleção da lista
    document.querySelectorAll('.list-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
    
    document.querySelectorAll('.ranking-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
    
    estabelecimentoSelecionado = null;
}

// Atualizar comparação com média
function atualizarComparacao(estabelecimento) {
    // Calcular média da categoria
    const estabelecimentosMesmaCategoria = estabelecimentos.filter(e => e.categoria === estabelecimento.categoria);
    const mediaCategoria = estabelecimentosMesmaCategoria.length > 0 
        ? estabelecimentosMesmaCategoria.reduce((acc, e) => acc + e.nota, 0) / estabelecimentosMesmaCategoria.length
        : 0;
    
    // Calcular diferença
    const diferenca = estabelecimento.nota - mediaCategoria;
    
    // Atualizar valores
    document.getElementById('comparacaoNota').textContent = estabelecimento.nota.toFixed(1);
    document.getElementById('comparacaoMedia').textContent = mediaCategoria.toFixed(1);
    
    // Atualizar barras de progresso
    const barraNota = document.getElementById('barraNota');
    const barraMedia = document.getElementById('barraMedia');
    
    barraNota.style.width = `${(estabelecimento.nota / 5) * 100}%`;
    barraMedia.style.width = `${(mediaCategoria / 5) * 100}%`;
    
    // Definir cores das barras
    if (diferenca > 0) {
        barraNota.style.background = 'linear-gradient(90deg, #10b981 0%, #34d399 100%)';
        barraMedia.style.background = 'linear-gradient(90deg, #6b7280 0%, #9ca3af 100%)';
    } else if (diferenca < 0) {
        barraNota.style.background = 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)';
        barraMedia.style.background = 'linear-gradient(90deg, #6b7280 0%, #9ca3af 100%)';
    } else {
        barraNota.style.background = 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)';
        barraMedia.style.background = 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)';
    }
    
    // Atualizar diferença
    const comparacaoDiferenca = document.getElementById('comparacaoDiferenca');
    let diferencaText = '';
    let diferencaClass = '';
    
    if (diferenca > 0) {
        diferencaText = `+${diferenca.toFixed(1)} acima da média`;
        diferencaClass = 'diferenca-positiva';
    } else if (diferenca < 0) {
        diferencaText = `${diferenca.toFixed(1)} abaixo da média`;
        diferencaClass = 'diferenca-negativa';
    } else {
        diferencaText = 'Na média da categoria';
        diferencaClass = 'diferenca-neutra';
    }
    
    comparacaoDiferenca.innerHTML = `<i class="fas fa-chart-line"></i> ${diferencaText}`;
    comparacaoDiferenca.className = 'comparacao-diferenca ' + diferencaClass;
}

// Atualizar posição no ranking
function atualizarPosicaoRanking(estabelecimento) {
    // Ordenar todos os estabelecimentos por ranking
    const todosOrdenados = [...estabelecimentos].sort((a, b) => b.ranking - a.ranking);
    
    // Encontrar posição geral
    const posicaoGeral = todosOrdenados.findIndex(e => e.nome === estabelecimento.nome) + 1;
    
    // Encontrar posição na categoria
    const mesmaCategoria = estabelecimentos.filter(e => e.categoria === estabelecimento.categoria);
    const categoriaOrdenada = [...mesmaCategoria].sort((a, b) => b.ranking - a.ranking);
    const posicaoCategoria = categoriaOrdenada.findIndex(e => e.nome === estabelecimento.nome) + 1;
    
    // Calcular percentil
    const percentil = Math.round((posicaoGeral / estabelecimentos.length) * 100);
    
    // Atualizar elementos
    document.getElementById('posicaoNumero').textContent = `#${posicaoGeral}`;
    document.getElementById('posicaoTotal').textContent = estabelecimentos.length;
    document.getElementById('posicaoCategoria').textContent = `${posicaoCategoria} de ${mesmaCategoria.length}`;
    document.getElementById('posicaoPercentil').textContent = `Top ${percentil}%`;
    
    // Colorir baseado na posição
    const posicaoNumero = document.getElementById('posicaoNumero');
    if (posicaoGeral <= 3) {
        posicaoNumero.style.background = 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)';
    } else if (posicaoGeral <= 8) {
        posicaoNumero.style.background = 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
    } else {
        posicaoNumero.style.background = 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)';
    }
    posicaoNumero.style.webkitBackgroundClip = 'text';
    posicaoNumero.style.webkitTextFillColor = 'transparent';
    posicaoNumero.style.backgroundClip = 'text';
}

// Atualizar gráfico competitivo
function atualizarGraficoCompetitivo(estabelecimento) {
    // Encontrar os 5 estabelecimentos mais próximos em ranking
    const estabelecimentosOrdenados = [...estabelecimentos].sort((a, b) => 
        Math.abs(a.ranking - estabelecimento.ranking) - Math.abs(b.ranking - estabelecimento.ranking)
    );
    
    const competidoresMaisProximos = estabelecimentosOrdenados
        .filter(e => e.nome !== estabelecimento.nome)
        .slice(0, 4)
        .concat([estabelecimento])
        .sort((a, b) => b.ranking - a.ranking);
    
    // Preparar dados para o gráfico
    const labels = competidoresMaisProximos.map(e => {
        // Abreviar nomes longos
        let nomeAbreviado = e.nome;
        if (nomeAbreviado.length > 20) {
            nomeAbreviado = nomeAbreviado.substring(0, 18) + '...';
        }
        return nomeAbreviado;
    });
    
    const data = competidoresMaisProximos.map(e => e.nota);
    
    // Atualizar gráfico
    graficoCompetitivo.data.labels = labels;
    graficoCompetitivo.data.datasets[0].data = data;
    
    // Colorir a barra do estabelecimento selecionado
    graficoCompetitivo.data.datasets[0].backgroundColor = competidoresMaisProximos.map(e => 
        e.nome === estabelecimento.nome ? 'rgba(245, 158, 11, 0.7)' : 'rgba(59, 130, 246, 0.7)'
    );
    
    graficoCompetitivo.update();
    
    // Atualizar análise textual
    const analiseCompetitiva = document.getElementById('analiseCompetitiva');
    const posicaoEntreCompetidores = competidoresMaisProximos.findIndex(e => e.nome === estabelecimento.nome) + 1;
    const totalCompetidores = competidoresMaisProximos.length;
    
    let analiseText = '';
    if (posicaoEntreCompetidores === 1) {
        analiseText = `Este estabelecimento tem a <strong>maior nota (${estabelecimento.nota.toFixed(1)})</strong> entre seus competidores mais próximos.`;
    } else if (posicaoEntreCompetidores === totalCompetidores) {
        analiseText = `Este estabelecimento tem a <strong>menor nota (${estabelecimento.nota.toFixed(1)})</strong> entre seus competidores mais próximos.`;
    } else {
        const competidorAcima = competidoresMaisProximos[posicaoEntreCompetidores - 2];
        const diferenca = competidorAcima.nota - estabelecimento.nota;
        analiseText = `Este estabelecimento está <strong>${posicaoEntreCompetidores}º</strong> entre ${totalCompetidores} competidores. Precisa melhorar <strong>${diferenca.toFixed(1)} pontos</strong> para alcançar ${competidorAcima.nome.split(' ')[0]}.`;
    }
    
    analiseCompetitiva.innerHTML = analiseText;
}

// Atualizar lista de competidores
function atualizarCompetidores(estabelecimento) {
    // Encontrar os 3 competidores mais próximos
    const estabelecimentosOrdenados = [...estabelecimentos].sort((a, b) => 
        Math.abs(a.ranking - estabelecimento.ranking) - Math.abs(b.ranking - estabelecimento.ranking)
    );
    
    const competidoresProximos = estabelecimentosOrdenados
        .filter(e => e.nome !== estabelecimento.nome)
        .slice(0, 3);
    
    const competidoresLista = document.getElementById('competidoresLista');
    
    if (competidoresProximos.length === 0) {
        competidoresLista.innerHTML = `
            <div class="competidor-item placeholder">
                <i class="fas fa-store"></i>
                <p>Não há competidores próximos encontrados</p>
            </div>
        `;
        return;
    }
    
    competidoresLista.innerHTML = '';
    
    competidoresProximos.forEach(competidor => {
        const diferenca = competidor.nota - estabelecimento.nota;
        const diferencaClass = diferenca > 0 ? 'diferenca-up' : 'diferenca-down';
        const diferencaIcon = diferenca > 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        const diferencaText = diferenca > 0 ? `+${diferenca.toFixed(1)}` : `${diferenca.toFixed(1)}`;
        
        // Abreviar nome se necessário
        let nomeCompetidor = competidor.nome;
        if (nomeCompetidor.length > 30) {
            nomeCompetidor = nomeCompetidor.substring(0, 28) + '...';
        }
        
        const competidorItem = document.createElement('div');
        competidorItem.className = 'competidor-item';
        
        competidorItem.innerHTML = `
            <div class="competidor-info">
                <div class="competidor-nome" title="${competidor.nome}">${nomeCompetidor}</div>
                <div class="competidor-detalhes">
                    <span class="competidor-nota">
                        <i class="fas fa-star"></i> ${competidor.nota.toFixed(1)}
                    </span>
                    <span class="competidor-diferenca ${diferencaClass}">
                        <i class="fas ${diferencaIcon}"></i> ${diferencaText}
                    </span>
                </div>
            </div>
        `;
        
        competidorItem.addEventListener('click', () => {
            mostrarDetalhesExpandidos(competidor);
        });
        
        competidoresLista.appendChild(competidorItem);
    });
}

// Gerar recomendações
function gerarRecomendacoes(estabelecimento) {
    const recomendacoesLista = document.getElementById('recomendacoesLista');
    
    // Calcular métricas para recomendações
    const mediaCategoria = estabelecimentos
        .filter(e => e.categoria === estabelecimento.categoria)
        .reduce((acc, e) => acc + e.nota, 0) / 
        estabelecimentos.filter(e => e.categoria === estabelecimento.categoria).length;
    
    const diferencaMedia = estabelecimento.nota - mediaCategoria;
    const posicaoGeral = [...estabelecimentos].sort((a, b) => b.ranking - a.ranking)
        .findIndex(e => e.nome === estabelecimento.nome) + 1;
    
    // Gerar recomendações baseadas na situação
    const recomendacoes = [];
    
    if (diferencaMedia < 0) {
        recomendacoes.push({
            titulo: 'Melhorar avaliação geral',
            descricao: `Sua nota está ${Math.abs(diferencaMedia).toFixed(1)} pontos abaixo da média da categoria (${mediaCategoria.toFixed(1)}). Considere melhorar a qualidade do atendimento ou produtos.`
        });
    }
    
    if (posicaoGeral > 5) {
        recomendacoes.push({
            titulo: 'Subir no ranking geral',
            descricao: `Você está na posição ${posicaoGeral} de ${estabelecimentos.length}. Para subir no ranking, foque em melhorar seu diferencial competitivo.`
        });
    }
    
    if (estabelecimento.nota < 4.5) {
        recomendacoes.push({
            titulo: 'Alcançar excelência',
            descricao: `Com nota ${estabelecimento.nota.toFixed(1)}, você está próximo da excelência. Pequenas melhorias podem elevar sua nota para 4.5+`
        });
    }
    
    // Recomendação padrão se não houver outras
    if (recomendacoes.length === 0) {
        recomendacoes.push({
            titulo: 'Manter excelente desempenho',
            descricao: `Com nota ${estabelecimento.nota.toFixed(1)} e posição destacada no ranking, continue mantendo os altos padrões de qualidade.`
        });
    }
    
    // Renderizar recomendações
    recomendacoesLista.innerHTML = '';
    
    recomendacoes.forEach((rec, index) => {
        const coresIcones = [
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        ];
        
        const recomendacaoItem = document.createElement('div');
        recomendacaoItem.className = 'recomendacao-item';
        
        recomendacaoItem.innerHTML = `
            <div class="recomendacao-icon" style="background: ${coresIcones[index] || coresIcones[0]};">
                <i class="fas fa-lightbulb"></i>
            </div>
            <div class="recomendacao-conteudo">
                <div class="recomendacao-titulo">${rec.titulo}</div>
                <div class="recomendacao-descricao">${rec.descricao}</div>
            </div>
        `;
        
        recomendacoesLista.appendChild(recomendacaoItem);
    });
}

// Atualizar filtros ativos
function atualizarFiltrosAtivos() {
    const activeFiltersDiv = document.getElementById('activeFilters');
    const filters = [];
    
    // Categoria
    const categoria = document.getElementById('categoriaSelect').value;
    if (categoria !== 'todos') {
        filters.push({
            label: `Categoria: ${categoria}`,
            type: 'categoria'
        });
    }
    
    // Nota mínima
    const notaMinima = document.getElementById('notaRange').value;
    if (parseFloat(notaMinima) > 3) {
        filters.push({
            label: `Nota mínima: ${parseFloat(notaMinima).toFixed(1)}`,
            type: 'nota'
        });
    }
    
    // Pesquisa
    const pesquisa = document.getElementById('pesquisaInput').value;
    if (pesquisa) {
        filters.push({
            label: `Pesquisa: "${pesquisa.length > 15 ? pesquisa.substring(0, 12) + '...' : pesquisa}"`,
            type: 'pesquisa'
        });
    }
    
    // Renderizar filtros ativos
    activeFiltersDiv.innerHTML = '';
    
    filters.forEach(filter => {
        const filterTag = document.createElement('div');
        filterTag.className = 'filter-tag';
        filterTag.innerHTML = `
            ${filter.label}
            <i class="fas fa-times" data-type="${filter.type}"></i>
        `;
        
        filterTag.querySelector('i').addEventListener('click', function() {
            removerFiltro(this.dataset.type);
        });
        
        activeFiltersDiv.appendChild(filterTag);
    });
}

// Remover filtro específico
function removerFiltro(tipo) {
    switch (tipo) {
        case 'categoria':
            document.getElementById('categoriaSelect').value = 'todos';
            break;
        case 'nota':
            document.getElementById('notaRange').value = 3;
            document.getElementById('notaValue').textContent = '3.0';
            break;
        case 'pesquisa':
            document.getElementById('pesquisaInput').value = '';
            break;
    }
    
    atualizarDashboard();
}

// Exportar dados
function exportarDados() {
    const dadosParaExportar = dadosFiltrados.map(est => ({
        Nome: est.nome,
        Nota: est.nota,
        Categoria: est.categoria,
        Ranking: est.ranking,
        'ID Categoria': est.id_categoria,
        Endereço: est.endereco
    }));
    
    if (dadosParaExportar.length === 0) {
        alert('Não há dados para exportar com os filtros atuais!');
        return;
    }
    
    // Criar CSV
    const cabecalhos = Object.keys(dadosParaExportar[0]);
    const linhasCSV = [
        cabecalhos.join(','),
        ...dadosParaExportar.map(est => 
            cabecalhos.map(h => `"${est[h]}"`).join(',')
        )
    ].join('\n');
    
    // Criar blob e download
    const blob = new Blob([linhasCSV], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `estabelecimentos_curvelo_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Feedback visual
    const exportBtn = document.getElementById('exportData');
    const originalText = exportBtn.innerHTML;
    
    exportBtn.innerHTML = '<i class="fas fa-check"></i> Dados Exportados!';
    exportBtn.style.background = 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
    
    setTimeout(() => {
        exportBtn.innerHTML = originalText;
        exportBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }, 2000);
}

// Gerar estrelas para avaliação
function gerarEstrelas(nota) {
    let estrelas = '';
    const notaInteira = Math.floor(nota);
    const meioEstrela = nota % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= notaInteira) {
            estrelas += '<i class="fas fa-star"></i>';
        } else if (i === notaInteira + 1 && meioEstrela) {
            estrelas += '<i class="fas fa-star-half-alt"></i>';
        } else {
            estrelas += '<i class="far fa-star"></i>';
        }
    }
    
    return estrelas;
}