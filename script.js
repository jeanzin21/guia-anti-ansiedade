/* Reset e Configurações Gerais */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.7;
    color: #5a5a5a;
    background: linear-gradient(135deg, #fef9e7 0%, #e8f5e8 50%, #f0f8ff 100%); /* Gradiente quente e acolhedor */
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
}

/* Bolinhas flutuantes sutis para animação */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(circle at 20% 80%, rgba(255, 217, 61, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(168, 230, 207, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 159, 243, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: -1;
    animation: float 20s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 1;
}

/* Header - Mais acolhedor com ondas */
.header {
    background: linear-gradient(135deg, #ff9a56 0%, #ffd93d 100%); /* Laranja-amarelo quente */
    color: #fff;
    padding: 3rem 0;
    text-align: center;
    box-shadow: 0 4px 20px rgba(255, 154, 86, 0.2);
    position: relative;
    overflow: hidden;
}

.header::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 50px;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="%23a8e6cf"><path d="M0,0 Q250,100 500,0 T1000,0 V100 H0 Z"/></svg>') no-repeat bottom;
    background-size: cover;
    animation: wave 3s ease-in-out infinite alternate;
}

@keyframes wave {
    0% { transform: translateY(0px); }
    100% { transform: translateY(5px); }
}

.header .container {
    padding: 0 20px;
}

.logo {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 10px rgba(0,0,0,0.1);
    animation: fadeInUp 1s ease-out;
}

.subtitle {
    font-size: 1.4rem;
    opacity: 0.95;
    font-weight: 400;
    animation: fadeInUp 1s ease-out 0.2s both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Cards e Seções Principais - Mais arredondados e fofos */
.card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    padding: 2.5rem;
    margin: 2.5rem 0;
    box-shadow: 0 8px 32px rgba(168, 230, 207, 0.2);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(168, 230, 207, 0.3);
}

.card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 40px rgba(168, 230, 207, 0.3);
}

h2 {
    color: #4a7c59;
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 600;
}

/* Seção de Humor */
.mood-section {
    text-align: center;
}

.mood-slider-container {
    margin: 2.5rem 0;
}

.mood-slider {
    width: 100%;
    height: 10px;
    border-radius: 10px;
    background: linear-gradient(to right, #ff9ff3, #ffd93d, #a8e6cf);
    outline: none;
    -webkit-appearance: none;
    margin-bottom: 1.5rem;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.mood-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff9a56, #ffd93d);
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(255, 154, 86, 0.3);
    transition: transform 0.2s ease;
}

.mood-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
}

.mood-slider::-moz-range-thumb {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff9a56, #ffd93d);
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 12px rgba(255, 154, 86, 0.3);
}

.mood-labels {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: 1.1rem;
}

#moodValue {
    font-size: 2rem;
    font-weight: 700;
    color: #ff9a56;
    min-width: 40px;
    text-align: center;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

/* Botões */
.btn {
    padding: 15px 30px;
    border: none;
    border-radius: 25px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: none;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(168, 230, 207, 0.3);
}

.btn-primary {
    background: linear-gradient(135deg, #a8e6cf 0%, #88d8a3 100%);
    color: #4a7c59;
}

.btn-primary:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(168, 230, 207, 0.4);
    animation: bounce 0.6s ease;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(-3px); }
    40% { transform: translateY(-6px); }
    60% { transform: translateY(-4px); }
}

.btn-secondary {
    background: linear-gradient(135deg, #ff9ff3 0%, #ff80ab 100%);
    color: #fff;
}

.btn-secondary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 159, 243, 0.4);
}

.hidden {
    display: none !important;
}

.message {
    margin-top: 1.5rem;
    padding: 15px;
    border-radius: 20px;
    text-align: center;
    font-weight: 600;
    background: linear-gradient(135deg, #d4edda, #c3e6cb);
    color: #2d5a3a;
    border: 1px solid #a8e6cf;
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Navegação Principal */
.main-nav {
    margin: 4rem 0;
}

.nav-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
}

.nav-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 30px;
    padding: 2.5rem;
    text-align: center;
    border: none;
    cursor: pointer;
    transition: all 0.4s ease;
    box-shadow: 0 6px 20px rgba(255, 159, 243, 0.2);
    height: 100%;
    border: 1px solid rgba(168, 230, 207, 0.3);
}

.nav-card:hover {
    transform: translateY(-8px) rotate(1deg);
    box-shadow: 0 15px 40px rgba(168, 230, 207, 0.3);
}

.nav-icon {
    font-size: 4rem;
    display: block;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease;
}

.nav-card:hover .nav-icon {
    transform: scale(1.2) rotate(10deg);
}

.nav-card h3 {
    color: #4a7c59;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
}

.nav-card p {
    color: #7a9a8a;
    font-size: 1rem;
}

/* Estatísticas */
.stats-section {
    text-align: center;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 2.5rem;
    margin-top: 2rem;
}

.stat-item {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(255, 217, 61, 0.2);
}

.stat-number {
    display: block;
    font-size: 3rem;
    font-weight: 700;
    color: #ff9a56;
    margin-bottom: 0.5rem;
    animation: fadeInUp 0.8s ease-out;
}

.stat-label {
    color: #7a9a8a;
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
}

/* Modais */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(248, 249, 250, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
    backdrop-filter: blur(5px);
}

.modal.active {
    opacity: 1;
    visibility: visible;
}

.modal-content {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(232, 245, 232, 0.95));
    border-radius: 30px;
    padding: 2.5rem;
    max-width: 700px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    animation: modalSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 10px 50px rgba(168, 230, 207, 0.3);
    border: 1px solid rgba(168, 230, 207, 0.4);
}

@keyframes modalSlideIn {
    from {
        transform: scale(0.9) translateY(-20px);
        opacity: 0;
    }
    to {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

.close {
    position: absolute;
    top: 20px;
    right: 25px;
    font-size: 2.5rem;
    color: #ff9ff3;
    cursor: pointer;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.5);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close:hover {
    color: #ff80ab;
    transform: rotate(90deg) scale(1.1);
    background: rgba(255, 159, 243, 0.7);
}

/* Tabs para Alimentos */
.food-tabs {
    display: flex;
    margin-bottom: 2rem;
    border-bottom: 2px solid rgba(168, 230, 207, 0.5);
    border-radius: 20px 20px 0 0;
    overflow: hidden;
}

.tab-btn {
    background: linear-gradient(135deg, #a8e6cf, #88d8a3);
    border: none;
    padding: 15px 30px;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: 600;
    color: #4a7c59;
    transition: all 0.3s ease;
    flex: 1;
}

.tab-btn:not(.active) {
    background: rgba(168, 230, 207, 0.5);
    color: #7a9a8a;
}

.tab-btn.active {
    background: linear-gradient(135deg, #ff9ff3, #ff80ab);
    color: #fff;
}

.tab-content {
    display: none;
}

.tab-content.active {
    display: block;
}

.food-list {
}

/* Estilos para Exercícios de Respiração */
.breathing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    min-height: 300px;
}

.breathing-circle {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    user-select: none;
    text-align: center;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.breathing-circle:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 50px rgba(0,0,0,0.15);
}

/* Cores Específicas por Tipo */
.breathing-circle.coherent { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.breathing-circle.diaphragmatic { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.breathing-circle.\34 78 { background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%); }

/* Ampulheta CSS Animada */
.hourglass-icon {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.3); /* Vidro vazio */
    clip-path: polygon(0 0, 100% 0, 50% 50%, 100% 100%, 0 100%, 50% 50%); /* Formato X */
    position: relative;
    margin-bottom: 1rem;
}

.hourglass-sand {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0%; /* Começa vazia */
    background: #fff; /* Areia branca */
}

.breathing-text { font-weight: 700; font-size: 1.2rem; padding: 0 15px; }

.breathing-controls {
    margin-bottom: 3rem;
    z-index: 10;
    position: relative;
}
