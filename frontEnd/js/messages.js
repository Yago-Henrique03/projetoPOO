async function listarMessages(){
    const containerMessages = document.getElementById("container-listMessages");
    containerMessages.innerHTML = "";

    const messages = await fetch('http://localhost:3333/messages')
        .then( resposta => {
            return resposta.json();
        })
        .catch( error => {
            alert("Error: " + error)
        })
    
    console.log(messages)

    messages.forEach( message => {
        let text 
        if(message.published === true){
            text = 'YES'
        } else {
            text = 'NO'
        }

        let newMessage = `
            <div class="message">
                <h1 class="title">${message.title} <a href="#" onclick="apagarMessage('${message.id}')"><i class="ph ph-trash"></i></a></h1>
                <p class="content">${message.content}</p>
                <div class="control-features">
                    <div class="control-published">
                        <p>PUBLISHED</p>
                        <span id="published-text">${text}</span>
                    </div>
                    <div class="control-likes">
                        <div>
                            <p>LIKES</p>
                            <i class="ph ph-thumbs-up"></i>
                        </div>
                        <div>
                            <span id="count-likes">${message.qtdeLikes}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        containerMessages.innerHTML += newMessage;
        
    })
}

async function apagarMessage(id) {
    await fetch(`http://localhost:3333/message/${id}`, {
        method: 'DELETE',
    })
    .then( response => {
        alert("POST APAGADO COM SUCESSO")
    })
    .catch( error => {
        alert("PROBLEMA NA REMOÇÃO")
    })
    listarMessages()
}