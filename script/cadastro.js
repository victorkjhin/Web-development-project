const url = 'https://go-wash-api.onrender.com/api/user';

async function cadastroUsuario(){   
    var name = document.getElementById('name');
    var cpf_cnpj = document.getElementById('cpf_cnpj'); 
    var birthday = document.getElementById('birthday');  
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var user_type = document.getElementById('user_type');  
   
    let resposta = await fetch(url,{
        method:"POST",
        body:JSON.stringify(
            {
                "name":name.value,
                "email":email.value,
                "user_type_id":user_type.value,
                "password":password.value,
                "cpf_cnpj":cpf_cnpj.value,
                "terms": 1,
                "birthday":birthday.value, 
            }

        ),
        headers:{
            'Content-Type': 'application/json'
        }        
    });

    let data = await resposta.json();
    console.log(data);
    
    if(data.data.statusCode === 422){
        if (data.data.errors?.name) 
            alert(data.data.errors?.name[0]);
        if (data.data.errors?.cpf_cnpj) 
            alert(data.data.errors?.cpf_cnpj[0]);
        if (data.data.errors?.birthday) 
            alert(data.data.errors?.birthday[0]);
        if (data.data.errors?.email) 
            alert(data.data.errors?.email[0]);
        if (data.data.errors?.password) 
            alert(data.data.errors?.password[0]);
        return
    }
    
    alert("Cadastro feito com sucesso.");
    window.location.href = "login.html";
}