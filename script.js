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
    });
    document.getElementById('notificationBtn').addEventListener('click', () => openModal('notificationModal'));

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

    // Exercícios de Respiração (⏳ Pulsa)
    const startBreathing = document.getElementById('startBreathing');
    const stopBreathing = document.getElementById('stopBreathing');
    const breathingCircle = document.getElementById('breathingCircle');
    const breathingText = document.getElementById('breathingText');

    let breathingInterval;

    startBreathing.addEventListener('click', function() {
        startBreathing.classList.add('hidden');
        stopBreathing.classList.remove('hidden');
        let cycle = 0;
        breathingInterval = setInterval(() => {
            cycle++;
            if (cycle > 4) { // 4 ciclos
                clearInterval(breathingInterval);
                breathingText.textContent = 'Exercício concluído! Respire normalmente. 🌿';
                breathingCircle.style.transform = 'scale(1)';
                startBreathing.classList.remove('hidden');
                stopBreathing.classList.add('hidden');
                return;
            }

            // 4s Inspire (expande)
            breathingText.textContent = 'Inspire... (4s)';
            let expand = 0;
            const expandInt = setInterval(() => {
                expand += 0.1;
                breathingCircle.style.transform = `scale(1 + ${expand})`;
                if (expand >= 0.5) clearInterval(expandInt);
            }, 1000);

            setTimeout(() => {
                // 7s Hold (mantém)
                breathingText.textContent = 'Segure... (7s)';
                setTimeout(() => {
                    // 8s Expire (contrai)
                    breathingText.textContent = 'Expire... (8s)';
                    let contract = 0.5;
                    const contractInt = setInterval(() => {
                        contract -= 0.1;
                        breathingCircle.style.transform = `scale(1 + ${contract})`;
                        if (contract <= 0) clearInterval(contractInt);
                    }, 1000);
                }, 7000);
            }, 4000);
        }, 19000); // Total ciclo ~19s
    });

    stopBreathing.addEventListener('click', function() {
        clearInterval(breathingInterval);
        breathingCircle.style.transform = 'scale(1)';
        breathingText.textContent = 'Parado. Clique Iniciar para recomeçar.';
        startBreathing.classList.remove('hidden');
        stopBreathing.classList.add('hidden');
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