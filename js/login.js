const alternate = document.getElementById("alternate-divs")
const overlay = document.querySelector(".overlay")
const loginDiv = document.querySelector(".login")
const cadastroDiv = document.querySelector(".cadastro")

const loginBtn = document.getElementById("login")
const signUpBtn = document.getElementById("sign-up")

const backendHTML = "https://zahoot-score.vercel.app"

async function Login() {
    const usernameVal = document.getElementById("username-login").value
    const password = document.getElementById("password-login").value

    if (usernameVal === "" || password === "") {
        alert("Por favor insira o nome de usuário e a senha!")
        return
    }

    const user = {
        usernameVal,
        password
    }

    const response = await fetch(`${backendHTML}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
    }).then(response => response.json())

    if (response.error) {
        alert(response.error)
        return
    }

    const { id, username, pontuacao } = response
    sessionStorage.setItem("user", JSON.stringify({ id: id, username: username, pontuacao: pontuacao }))
    alert(response.message)
    window.location.href = "./index.html"
}

async function SignUp() {
    const username = document.getElementById("username-signup").value
    const password = document.getElementById("password-signup").value
    const email = document.getElementById("email").value
    
    const day = document.getElementById("day").value
    const month = document.getElementById("month").value
    const year = document.getElementById("year").value
    const birthday = `${year}/${month}/${day}` //Invertido por causa do MySQL

    if (password.split("").length < 8) {
        alert("A senha deve conter pelo menos 8 caracteres")
        return
    }

    const user = {
        username,
        email,
        password,
        birthday,
    }

    const response = await fetch(`${backendHTML}/cadastro`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
    }).then(response => response.json())

    if (response.error) {
        alert(response.error)
        return
    }

    sessionStorage.setItem("user", JSON.stringify({ id: response.id, username: response.username, pontuacao: 0}))
    alert(response.message)

    window.location.href = "./index.html"
}

function alternateDivs(addClass, removeClass, addFade) {
    overlay.classList.add(addClass)
    overlay.classList.remove(removeClass)
    
    if (!addFade) { //Vai para direita
        loginDiv.classList.add("fadeIn")
        loginDiv.classList.remove("fadeOut")
        cadastroDiv.classList.add("fadeOut")
        cadastroDiv.classList.remove("fadeIn")

        overlay.querySelector("p").innerHTML = "Não tem uma conta? <br> Cadastre-se agora!"
        overlay.querySelector("button").innerHTML = "Cadastro"
    } else { //Vai para esquerda
        loginDiv.classList.add("fadeOut")
        loginDiv.classList.remove("fadeIn")
        cadastroDiv.classList.add("fadeIn")
        cadastroDiv.classList.remove("fadeOut")

        overlay.querySelector("p").innerHTML = "Já tem uma conta? <br> Faça Login!"
        overlay.querySelector("button").innerHTML = "Login"
    }
}


loginBtn.addEventListener("click", (e)=> { 
    e.preventDefault()
    Login()
})
signUpBtn.addEventListener("click", (e)=> { 
    e.preventDefault()
    SignUp()
})
alternate.addEventListener("click", ()=> {
    if (overlay.classList.contains("left")) {
        alternateDivs("right","left", false)
    } else {
        alternateDivs("left","right", true)
    }
})