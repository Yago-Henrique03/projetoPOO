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

async function editarMessage() {
    const id = document.getElementById('idSelecionado').value
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const publicado = document.getElementById('published').value

    if(id === "1" || title === "" || content === "" || publicado === "#"){
        return alert("ERRO!!! \nINSIRA TODOS OS CAMPOS");
    }

    var published
    if(publicado === 'true'){
        published = true;
    } else {
        published = false;
    }

    const newMessage = { title, content, published }

    const editMessage = await fetch(`http://localhost:3333/message/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newMessage),
        headers: {
            'Content-Type': 'application/json;charset="UTF-8"'
        }
    })
    .then( resp => {
        alert("Message successfully updated")
    })
    .catch( err => {
        alert("Message could not be updated")
    })
}

async function trazDados(){
    id = document.getElementById('idSelecionado').value
    const findMessage = await fetch(`http://localhost:3333/messages/${id}`)
    .then( resp => {
        return resp.json()
    })
    .catch( err => {
        alert("Message could not be shown");
    })
    document.getElementById('title').value = findMessage.title
    document.getElementById('content').value = findMessage.content
    document.getElementById('published').value = findMessage.published.toString()
}