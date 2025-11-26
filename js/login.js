const alternate = document.getElementById("alternate-divs")
const overlay = document.querySelector(".overlay")
const loginDiv = document.querySelector(".login")
const cadastroDiv = document.querySelector(".cadastro")

const loginBtn = document.getElementById("login")
const signUpBtn = document.getElementById("sign-up")

const backendHTML = "http://localhost:3333"

async function Login() {
    const username = document.getElementById("username-login").value
    const password = document.getElementById("password-login").value

    if (username === "" || password === "") {
        alert("Por favor insira o nome de usuário e a senha!")
        return
    }

    const user = {
        username,
        password
    }

    const response = await fetch(`${backendHTML}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })
    }).then(response => response.json())

    if (response.message) {
        alert(response.message)
        return
    }

    const { id, name, pontuacao } = response
    sessionStorage.setItem("user", JSON.stringify({ id, name, pontuacao }))
}

async function SignUp() {
    const username = document.getElementById("username-signup").value
    const password = document.getElementById("password-signup").value
    const email = document.getElementById("email").value
    
    const day = document.getElementById("day").value
    const month = document.getElementById("month").value
    const year = document.getElementById("year").value
    const birthday = `${year}/${month}/${day}` //Invertido por causa do MySQL

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

    sessionStorage.setItem("user", { id: response.id, name: username, pontuacao: 0})
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
    } else { //Vai para esquerda
        loginDiv.classList.add("fadeOut")
        loginDiv.classList.remove("fadeIn")
        cadastroDiv.classList.add("fadeIn")
        cadastroDiv.classList.remove("fadeOut")
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