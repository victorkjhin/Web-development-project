const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function listaGemEndereco() {
    let token = JSON.parse(localStorage.getItem('user')).access_token;  /// Obtêm o access token armazenado no local storage
    
    let resposta = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,  /// autentica o usuario e obtêm acesso a recursos da API
        }
    });

    let responseApi = await resposta.json();
    console.log(responseApi);

    let tabela = document.getElementById('tabelaendereco');  /// Pega o id da tabela html

    responseApi.data.forEach(dado => {  /// Utiliza foreach para iterar sobre cada objeto da resposta da api
        let row = tabela.insertRow();  /// Para cada objeto, cria uma nova linha
        row.insertCell(0).innerText = dado.address;
        row.insertCell(1).innerText = dado.number;
        row.insertCell(2).innerText = dado.cep;  /// Pega as respostas da api para preencher a tabela na ordem
        row.insertCell(3).innerText = dado.title;
        
        // Cria o botão de exclusão e adiciona à última célula
        let deleteCell = row.insertCell(4);
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Excluir';
        deleteButton.onclick = () => excluirEndereco(dado.id);  /// Associa a função de exclusão ao botão
        deleteCell.appendChild(deleteButton);
    });
}

async function excluirEndereco(id) {
    let token = JSON.parse(localStorage.getItem('user')).access_token;  /// Obtêm o access token armazenado no local storage
    
    let resposta = await fetch(`${url}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + token,  /// autentica o usuario e obtêm acesso a recursos da API
        }
    });

    if (resposta.ok) {
        alert('Endereço excluído com sucesso');
        location.reload();  /// Recarrega a página para atualizar a lista de endereços
    } else {
        alert('Erro ao excluir o endereço');
    }
}

listaGemEndereco();
