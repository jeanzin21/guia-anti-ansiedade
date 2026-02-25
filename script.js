// Inicialização Geral - Carrega Tudo ao Abrir a Página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Guia Anti-Ansiedade carregado! 🌟');

    // Funções Utilitárias para Modais
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('hidden');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Impede scroll no fundo
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('hidden');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Limpa mensagens
        const messages = modal.querySelectorAll('.message');
        messages.forEach(msg => msg.classList.add('hidden'));
    }

    // Fechar Modais ao Clicar no X ou Fora
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });

    // Abrir Modais via Cards
    document.getElementById('foodGuideBtn').addEventListener('click', () => openModal('foodModal'));
    document.getElementById('breathingBtn').addEventListener('click', () => openModal('breathingModal'));
    document.getElementById('diaryBtn').addEventListener('click', () => {
        openModal('diaryModal');
        loadDiaryEntries(); // Carrega entradas ao abrir
        document.getElementById('newDiaryEntry').focus(); // Foca automaticamente na área de digitação
    });

    // Tabs para Alimentos (Separa Saudáveis e Não Saudáveis)
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            console.log(`Switched to ${tabName}`); // Debug

            // Remove active de todos os botões e conteúdos
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            // Adiciona active no clicado
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Rastreamento de Humor
    const moodSlider = document.getElementById('moodSlider');
    const moodValue = document.getElementById('moodValue');
    const saveMoodBtn = document.getElementById('saveMoodBtn');
    const moodMessage = document.getElementById('moodMessage');

    moodSlider.addEventListener('input', function() {
        moodValue.textContent = this.value;
    });

    saveMoodBtn.addEventListener('click', function() {
        const mood = parseInt(moodSlider.value);
        const moods = JSON.parse(localStorage.getItem('moods') || '[]');
        moods.push({ date: new Date().toISOString().split('T')[0], value: mood });
        localStorage.setItem('moods', JSON.stringify(moods));
        moodMessage.textContent = `Humor salvo: ${mood}/10 😊`;
        moodMessage.classList.remove('hidden');
        updateStats();
        setTimeout(() => moodMessage.classList.add('hidden'), 3000);
    });

    // Diário de Humor (FUNCIONAL: Salvar, Listar, Excluir, Fechar)
    const saveDiaryBtn = document.getElementById('saveDiaryBtn');
    const diaryMessage = document.getElementById('diaryMessage');
    const newDiaryEntry = document.getElementById('newDiaryEntry');
    const diaryEntries = document.getElementById('diaryEntries');
    const closeDiary = document.getElementById('closeDiary');

    // Função para Salvar Entrada
    saveDiaryBtn.addEventListener('click', function() {
        const text = newDiaryEntry.value.trim();
        if (!text) {
            diaryMessage.textContent = 'Por favor, escreva algo antes de salvar. 📝';
            diaryMessage.classList.remove('hidden');
            return;
        }

        console.log('Salvando entrada...'); // Debug

        const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        const newEntry = {
            id: Date.now(), // ID único
            date: new Date().toLocaleString('pt-BR'), // Data/hora formatada
            text: text
        };
        entries.push(newEntry);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        newDiaryEntry.value = ''; // Limpa textarea
        loadDiaryEntries(); // Atualiza lista
        diaryMessage.textContent = 'Entrada salva com sucesso! 😊';
        diaryMessage.classList.remove('hidden');
        updateStats(); // Atualiza total
        setTimeout(() => diaryMessage.classList.add('hidden'), 3000);
    });

    // Função para Carregar e Mostrar Entradas
    function loadDiaryEntries() {
        const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        diaryEntries.innerHTML = ''; // Limpa lista
        entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('diary-entry');
            entryDiv.innerHTML = `
                <div class="diary-entry-header">
                    <span>${entry.date}</span>
                    <button class="delete-entry" onclick="deleteDiaryEntry(${entry.id})">Excluir</button>
                </div>
                <p class="diary-entry-text">${entry.text}</p>
            `;
            diaryEntries.appendChild(entryDiv);
        });
    }

    // Função para Excluir Entrada (Global para onclick)
    window.deleteDiaryEntry = function(id) {
        const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        const updatedEntries = entries.filter(entry => entry.id !== id);
        localStorage.setItem('diaryEntries', JSON.stringify(updatedEntries));
        loadDiaryEntries();
        diaryMessage.textContent = 'Entrada excluída! 🗑️';
        diaryMessage.classList.remove('hidden');
        updateStats();
        setTimeout(() => diaryMessage.classList.add('hidden'), 2000);
    };

    // Botão Fechar Diário (Fecha o Modal)
    closeDiary.addEventListener('click', function() {
        console.log('Fechando diário...'); // Debug
        closeModal('diaryModal');
    });

    // Enter na Textarea Salva (Opcional)
    newDiaryEntry.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            saveDiaryBtn.click();
        }
    });

    // --- Lógica Dinâmica de Respiração ---
    let breathingInterval = null;
    let breathingTimeout = null;
    let countdownInterval = null;
    let isBreathing = false;

    // Configuração dos 3 Tipos
    const breathingConfigs = {
        'coherent': { inhale: 5, hold: 0, exhale: 5, textId: 'breathingTextCoherent', circleId: 'breathingCircleCoherent', stopBtnId: 'stopCoherent' },
        'diaphragmatic': { inhale: 4, hold: 0, exhale: 4, textId: 'breathingTextDiaphragmatic', circleId: 'breathingCircleDiaphragmatic', stopBtnId: 'stopDiaphragmatic' },
        'type-478': { inhale: 4, hold: 7, exhale: 8, textId: 'breathingText478', circleId: 'breathingCircle478', stopBtnId: 'stop478' }
    };

    // Função para Parar Tudo
    function stopAllBreathing() {
        isBreathing = false;
        clearTimeout(breathingTimeout);
        clearInterval(countdownInterval);
        
        // Reseta UI de todos
        Object.values(breathingConfigs).forEach(config => {
            const circle = document.getElementById(config.circleId);
            const text = document.getElementById(config.textId);
            const stopBtn = document.getElementById(config.stopBtnId);
            const sand = circle ? circle.querySelector('.hourglass-sand') : null;
            
            if (circle) {
                circle.style.transform = 'scale(1)';
                circle.style.transition = 'transform 0.5s ease-out';
            }
            if (sand) {
                sand.style.height = '0%';
                sand.style.transition = 'height 0.5s ease-out';
            }
            if (text) text.textContent = 'Clique para começar';
            if (stopBtn) stopBtn.classList.add('hidden');
        });
    }

    // Função para Iniciar Ciclo
    function startBreathingCycle(type) {
        if (isBreathing) stopAllBreathing(); // Para outros se houver
        isBreathing = true;

        const config = breathingConfigs[type];
        const circle = document.getElementById(config.circleId);
        const text = document.getElementById(config.textId);
        const stopBtn = document.getElementById(config.stopBtnId);
        const sand = circle.querySelector('.hourglass-sand');

        stopBtn.classList.remove('hidden');

        // Função auxiliar para o contador visual
        const startCounter = (duration, label) => {
            clearInterval(countdownInterval);
            let remaining = duration;
            text.textContent = `${label} ${remaining}`;
            
            countdownInterval = setInterval(() => {
                remaining--;
                if (remaining >= 0) {
                    text.textContent = `${label} ${remaining}`;
                }
            }, 1000);
        };

        // Função Recursiva do Ciclo
        const runPhase = () => {
            if (!isBreathing) return;

            // 1. Inspire (Expande)
            startCounter(config.inhale, "Inspire...");
            circle.style.transition = `transform ${config.inhale}s ease-in-out`;
            circle.style.transform = 'scale(1.4)'; // Aumenta 40%

            // Areia Enche
            sand.style.transition = `height ${config.inhale}s linear`;
            sand.style.height = '100%';

            breathingTimeout = setTimeout(() => {
                if (!isBreathing) return;

                // 2. Segure (Se houver)
                if (config.hold > 0) {
                    startCounter(config.hold, "Segure...");
                    breathingTimeout = setTimeout(() => {
                        if (!isBreathing) return;
                        exhale();
                    }, config.hold * 1000);
                } else {
                    exhale();
                }
            }, config.inhale * 1000);
        };

        const exhale = () => {
            // 3. Expire (Contrai)
            startCounter(config.exhale, "Expire...");
            circle.style.transition = `transform ${config.exhale}s ease-in-out`;
            circle.style.transform = 'scale(1)'; // Volta ao normal

            // Areia Esvazia
            sand.style.transition = `height ${config.exhale}s linear`;
            sand.style.height = '0%';

            breathingTimeout = setTimeout(() => {
                if (!isBreathing) return;
                runPhase(); // Reinicia ciclo
            }, config.exhale * 1000);
        };

        runPhase(); // Começa
    }

    // Event Listeners para os Círculos (Start) e Botões (Stop)
    Object.keys(breathingConfigs).forEach(type => {
        const config = breathingConfigs[type];
        
        // Clique no círculo inicia
        const circle = document.getElementById(config.circleId);
        if (circle) {
            circle.addEventListener('click', () => startBreathingCycle(type));
        }

        // Clique no botão para
        const stopBtn = document.getElementById(config.stopBtnId);
        if (stopBtn) {
            stopBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita bolha
                stopAllBreathing();
            });
        }
    });

    // Ao fechar o modal, para tudo
    document.querySelectorAll('.close, .modal').forEach(el => {
        el.addEventListener('click', (e) => {
            if (e.target === el || el.classList.contains('close')) {
                stopAllBreathing();
            }
        });
    });

    // Estatísticas (Atualiza Total, Humor Médio, Streak)
    function updateStats() {
        const moods = JSON.parse(localStorage.getItem('moods') || '[]');
        const entries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
        const totalEntries = moods.length + entries.length;

        // Total Registros
        document.getElementById('totalEntries').textContent = totalEntries;

        // Humor Médio (só de moods)
        if (moods.length > 0) {
            const avgMood = (moods.reduce((sum, m) => sum + m.value, 0) / moods.length).toFixed(1);
            document.getElementById('avgMood').textContent = avgMood;
        } else {
            document.getElementById('avgMood').textContent = '0';
        }

        // Streak Básico (dias consecutivos com entradas)
        if (entries.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            let streak = 1;
            // Verifica se tem entrada de ontem (simplificado)
            const hasYesterday = entries.some(e => e.date.includes(yesterday));
            if (hasYesterday) streak = 2; // Exemplo básico
            document.getElementById('streak').textContent = streak;
        } else {
            document.getElementById('streak').textContent = '0';
        }

        console.log('Stats atualizadas:', { total: totalEntries }); // Debug
    }

    // Carrega Stats Iniciais
    updateStats();
});
