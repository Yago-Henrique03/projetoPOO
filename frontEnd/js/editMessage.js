async function consultaMessages() {
    const messages = await fetch('http://localhost:3333/messages')
        .then( resposta => {
            return resposta.json();
        })
        .catch( error => {
            alert("Error: " + error)
        })

    let saida = '';
    messages.forEach( message => {
        saida += `<option value="${message.id}">${message.title}</option>`
    })
    document.getElementById('idSelecionado').innerHTML += saida;
}