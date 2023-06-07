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

async function recuperaLikes(){
    const idSelecionado = document.getElementById('idSelecionado').value
    const message = await fetch(`http://localhost:3333/messages/${idSelecionado}`)
    .then( resp => {
        return resp.json();
    })
    .catch( error => {
        alert('Problema na consulta')
    })
    document.getElementById("likes").innerHTML = message.qtdeLikes
}

async function adicionarLikes(){
    const id = document.getElementById("idSelecionado").value
    const qtdeLikes = Number(document.getElementById("addLikes").value)
    const envia = { id, qtdeLikes }
    const resp = await fetch(`http://localhost:3333/message/addLikes`, {
        method: 'PATCH',
        body: JSON.stringify(envia),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
    .then( resp => {
        return resp.json();
    })
    .catch( error => {
        alert('ERRO AO ATUALIZAR LIKES')
    })
    alert(`ADICIONADO ${qtdeLikes} LIKES AO ID: ${id}`)
    document.getElementById("addLikes").value = ''
    recuperaLikes()
}

async function removerLikes(){
    const id = document.getElementById("idSelecionado").value
    const qtdeLikes = Number(document.getElementById("addLikes").value)
    const envia = { id, qtdeLikes }
    const resp = await fetch(`http://localhost:3333/message/remLikes`, {
        method: 'PATCH',
        body: JSON.stringify(envia),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
    .then( resp => {
        return resp.json();
    })
    .catch( error => {
        alert("ERRO AO REMOVER LIKES")
    });

    alert(resp.status)
    document.getElementById("addLikes").value = '';
    recuperaLikes()
}

