async function listarMessages(){
    let containerMessages = document.getElementById("container-listMessages");
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
        let messageDiv = document.createElement('div');
        messageDiv.classList.add("message");

        let titulo = document.createElement('h1');
        titulo.classList.add("title");
        titulo.textContent = message.title;

        let conteudo = document.createElement('p');
        conteudo.classList.add("content");
        conteudo.textContent = message.content;
        
        let featuresDiv = document.createElement('div');
        featuresDiv.classList.add("control-features");

        let published = document.createElement('div');
        published.classList.add("control-published");

        let publishedP = document.createElement('p');
        publishedP.textContent = "PUBLISHED";

        let publicado = document.createElement('span');
        if(message.published === true){
            publicado.textContent = "YES";
        } else {
            publicado.textContent = "NO";
        }

        let likesDiv = document.createElement('div');
        likesDiv.classList.add("control-likes");

        let intolikes = document.createElement('div');
        let intolikesP = document.createElement('p');
        intolikesP.textContent = "LIKES";
        let intoLikesI = document.createElement('i');
        intoLikesI.classList.add("ph");
        intoLikesI.classList.add("ph-thumbs-up");

        let divLikes = document.createElement('div');
        let likes = document.createElement('span');
        likes.textContent = message.qtdeLikes;

        divLikes.appendChild(likes);
        intolikes.appendChild(intolikesP);
        intolikes.appendChild(intoLikesI);

        likesDiv.appendChild(intolikes); // div control-likes
        likesDiv.appendChild(divLikes);

        published.appendChild(publishedP);
        published.appendChild(publicado); // div control - published 

        featuresDiv.appendChild(published);// div control - features
        featuresDiv.appendChild(likesDiv); 
        
        messageDiv.appendChild(titulo);
        messageDiv.appendChild(conteudo);
        messageDiv.appendChild(featuresDiv);
        containerMessages.appendChild(messageDiv);
    })
}

