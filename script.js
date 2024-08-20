function consultaEndereco() {
    let cep = document.querySelector('#cep').value;

    if (cep.length !== 8 || isNaN(cep)) {
        resultado.innerHTML = '<p class="error"> CEP Inválido! Deve ter 8 dígitos.</p>';
        return;
    }

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarEndereco(data);
        })
        .catch(error => {
            console.error('Erro:', error);
            document.querySelector('#resultado').innerHTML = '<p class="error">Erro ao consultar o CEP.</p>';
        });
}

function mostrarEndereco(dados) {
    let resultado = document.querySelector('#resultado');

    if (dados.erro) {
        resultado.innerHTML = '<p class="error">Não foi localizado o endereço!</p>';
    } else {
        resultado.innerHTML = `
            <table>
                <tr>
                    <th>Cidade</th>
                    <th>Bairro</th>
                    <th>Endereço</th>
                </tr>
                <tr>
                    <td>${dados.localidade} - ${dados.uf}</td>
                    <td>${dados.bairro}</td>
                    <td>${dados.logradouro}</td>
                </tr>
            </table>
        `;
    }
}