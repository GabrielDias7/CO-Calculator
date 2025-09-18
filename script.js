document.addEventListener('DOMContentLoaded', function () {

    const distanceInput = document.getElementById('distance');
    const unitSelect = document.getElementById('unit');
    const modalSelect = document.getElementById('modal');
    const calculateBtn = document.getElementById('calculateBtn');
    const openMapsBtn = document.getElementById('openMapsBtn');
    const resultDiv = document.getElementById('result');
    const themeIconToggle = document.getElementById('themeIconToggle'); // O único ícone de tema

    // Função para aplicar o tema e atualizar o ícone
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIconToggle.classList.remove('bi-sun-fill');
            themeIconToggle.classList.add('bi-moon-fill');
            themeIconToggle.style.color = '#bdc3c7'; // Cor da lua
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeIconToggle.classList.remove('bi-moon-fill');
            themeIconToggle.classList.add('bi-sun-fill');
            themeIconToggle.style.color = '#f39c12'; // Cor do sol
            localStorage.setItem('theme', 'light');
        }
    }

    // Carregar tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Tema padrão: claro
        applyTheme('light');
    }

    // Evento de clique no ícone para alternar o tema
    themeIconToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    });

    // Evento para abrir o Google Maps
    openMapsBtn.addEventListener('click', function() {
        window.open('https://www.google.com/maps/dir//', '_blank');
    });

    // Define os fatores para o cálculo
    const factors = {
        gasolina: { F: 2.3 },
        diesel: { F: 2.7 }
    };

    const consumption = {
        carro: { C: 1/12, fuel: 'gasolina' },
        moto: { C: 1/55, fuel: 'gasolina' },
        onibus: { C: 1/2.5, fuel: 'diesel' },
        trem: { C: 1/9, fuel: 'diesel' },
        barca: { C: 1/1, fuel: 'diesel' }
    };

    // Evento de clique no botão de calcular
    calculateBtn.addEventListener('click', function() {
        let D = parseFloat(distanceInput.value);
        const unit = unitSelect.value;
        const modal = modalSelect.value;

        if (isNaN(D) || D <= 0) {
            resultDiv.innerHTML = `<div class="alert alert-warning">Por favor, insira uma distância válida.</div>`;
            return;
        }

        if (unit === 'm') {
            D = D / 1000;
        }

        if (!consumption[modal]) {
            resultDiv.innerHTML = `<div class="alert alert-warning">Selecione um meio de transporte.</div>`;
            return;
        }

        const C = consumption[modal].C;
        const fuelType = consumption[modal].fuel;
        const F = factors[fuelType].F;

        const emission = D * C * F;

        resultDiv.innerHTML = `
            <div class="alert alert-success">
                <strong>Emissão de Carbono:</strong><br>
                ${emission.toFixed(2)} kg de CO₂
            </div>
        `;
    });
});