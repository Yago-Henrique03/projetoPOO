const btnCreatePost = document.getElementById('btn-createPost');
const containerMessages = document.getElementById("container-listMessages");
const controlCreatePost = document.getElementById("control-createPost");
const btnSubmitPost = document.getElementById("btn-submitPost");


btnCreatePost.addEventListener('click', function(){
    containerMessages.classList.add("displayOff");
    controlCreatePost.classList.remove("displayOff");
})

btnSubmitPost.addEventListener('click', async function (ev){
    ev.preventDefault();
    const title = document.getElementById("input-title").value;
    const content = document.getElementById("input-content").value;
    let url = `http://localhost:3333/message`;

    const message = {title, content};

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'Content-Type': 'application/json;charset="utf-8"'
        }
    })
    .then( response => {
        alert("Operação realizada com sucesso!");
    })
    .catch( error => {
        alert("Erro durante a criação")
    })

    listarMessages()
    containerMessages.classList.remove("displayOff");
    controlCreatePost.classList.add("displayOff");
    document.getElementById("input-title").value = ''
    document.getElementById("input-content").value = '';
})