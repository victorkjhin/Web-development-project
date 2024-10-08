const url = 'https://go-wash-api.onrender.com/api/auth/address';

async function cadastroEndereco(){   
    var nomedarua = document.getElementById('nomedarua');
    var numerodaresidencia = document.getElementById('numerodaresidencia'); 
    var CEP = document.getElementById('CEP');  
    var titulo = document.getElementById('titulo');
    
    if (!nomedarua.value || !numerodaresidencia.value || !CEP.value || !titulo.value) {
        alert("Preencha todos os campos.");
        return; 
    }
    
    if(isNaN(numerodaresidencia.value)){
        alert('Digite apenas caracteres numéricos no campo "Número da residência".')
    }
    
    if(CEP.value.length !== 8){
       alert('O campo de CEP deve conter 8 caracteres numéricos.')
       return;
    }
    
    if(isNaN(CEP.value)){
        alert('O campo de CEP deve conter 8 caracteres numéricos.')
        return;
    }

    let token = JSON.parse(localStorage.getItem('user')).access_token;
   
    let resposta = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
                {
                    "title":titulo.value,
                    "cep": CEP.value,
                    "address": nomedarua.value,
                    "number": numerodaresidencia.value,
                }

        ),
        headers:{
            "Authorization": "Bearer "+token,
            'Content-Type': 'application/json'
        }
    });

    let data = await resposta.json();
    console.log(data);
    
    alert("Cadastro feito com sucesso.");
    window.location.href = "home.html";
}