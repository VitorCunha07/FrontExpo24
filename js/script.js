// Função para desativar o botão e prevenir múltiplos cliques
function disableButton(button) {
    button.disabled = true;
    button.textContent = 'Aguarde...'; // Opcional: altera o texto do botão para indicar que está processando
}

// Função para reativar o botão após a operação
function enableButton(button, originalText) {
    button.disabled = false;
    button.textContent = originalText;
}

// Manipulador para o botão "CRIAR PERSONAGEM"
document.getElementById('btn-post').addEventListener('click', function() {
    const button = this;
    const jogador = document.getElementById('input-jogador').value;
    const nome_personagem = document.getElementById('input-nome_personagem').value;
    const raca = document.getElementById('input-raca').value;
    const genero = document.getElementById('input-genero').value;
    const classe = document.getElementById('input-classe').value;
    const vigor = document.getElementById('input-vigor').value;
    const conhecimento = document.getElementById('input-conhecimento').value;
    const fortitude = document.getElementById('input-fortitude').value;
    const forca = document.getElementById('input-forca').value;
    const destreza = document.getElementById('input-destreza').value;
    const inteligencia = document.getElementById('input-inteligencia').value;
    const fe = document.getElementById('input-fe').value;
    const sorte = document.getElementById('input-sorte').value;

    disableButton(button); // Desativa o botão

    fetch('http://localhost/api/sheet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            jogador,
            nome_personagem,
            raca,
            genero,
            classe,
            vigor,
            conhecimento,
            fortitude,
            forca,
            destreza,
            inteligencia,
            fe,
            sorte
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Personagem criado com sucesso!');
        enableButton(button, 'CRIAR PERSONAGEM'); // Reativa o botão
        // Atualiza a lista do lado
        getAllAndPlot();
    })
    .catch(error => {
        console.error('Erro:', error);
        enableButton(button, 'CRIAR PERSONAGEM'); // Reativa o botão em caso de erro
    });

    // ZERA TODOS INPUTS
    document.getElementById('input-jogador').value = '';
    document.getElementById('input-nome_personagem').value = '';
    document.getElementById('input-raca').value = '';
    document.getElementById('input-genero').value = '';
    document.getElementById('input-classe').value = '';
    document.getElementById('input-vigor').value = '';
    document.getElementById('input-conhecimento').value = '';
    document.getElementById('input-fortitude').value = '';
    document.getElementById('input-forca').value = '';
    document.getElementById('input-destreza').value = '';
    document.getElementById('input-inteligencia').value = '';
    document.getElementById('input-fe').value = '';
    document.getElementById('input-sorte').value = '';
});

// Função para buscar todos os personagens e exibi-los
async function getAllAndPlot() {
    try {
        const response = await fetch('http://localhost/api/sheet');
        const data = await response.json();
        
        const container = document.getElementById('all-characters');
        container.innerHTML = ''; // Limpa o conteúdo existente

        // Ordena os personagens do mais recente para o mais antigo
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        data.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.innerHTML = ` 
                <strong>Jogador:</strong> ${character.jogador} <br>
                <strong>Nome do Personagem:</strong> ${character.nome_personagem} <br>
                <strong>Raça:</strong> ${character.raca} <br>
                <strong>Gênero:</strong> ${character.genero} <br>
                <strong>Classe:</strong> ${character.classe} <br>
                <strong>Vigor:</strong> ${character.vigor} <br>
                <strong>Conhecimento:</strong> ${character.conhecimento} <br>
                <strong>Fortitude:</strong> ${character.fortitude} <br>
                <strong>Força:</strong> ${character.forca} <br>
                <strong>Destreza:</strong> ${character.destreza} <br>
                <strong>Inteligência:</strong> ${character.inteligencia} <br>
                <strong>Fé:</strong> ${character.fe} <br>
                <strong>Sorte:</strong> ${character.sorte} <br>
                <hr>
            `;
            container.appendChild(characterDiv);
        });

    } catch (error) {
        console.error('Erro ao buscar todos os personagens:', error);
    }
}

// Chama a função para buscar e exibir todos os personagens quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    getAllAndPlot();
});
