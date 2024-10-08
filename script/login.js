const url = 'https://go-wash-api.onrender.com/api/login';

async function login(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    let resposta = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
            {
                "email":email,
                "password":password,
                "user_type_id":1,
            }

        ),
        headers:{
            'Content-Type': 'application/json'
        }        
    });

    let data = await resposta.json();
    
    localStorage.setItem('user', JSON.stringify(data));
  
    if (resposta.status === 404) {
        alert(data.data.errors);
    }
    
    if(resposta.status === 401) {
        alert(data.data.errors);
    }
    
    if(resposta.status === 200) {
        alert('Login bem sucedido.');
        window.location.href = "home.html";
    }
}