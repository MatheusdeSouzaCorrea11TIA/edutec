const body = document.body
const user = JSON.parse(sessionStorage.getItem("user"))
const headerHTML = `<header>
    <a href="./index.html"><img src="./assets/elementos/logo.svg" alt="Logo" class="logo"></a>
    <div class="links">
        <ul class="nav-menu-list">
            <li class="nav-menu-item">
                <a href="./vidaselvagem.html">Vida Selvagem</a>
            </li>
            <li class="nav-menu-item">
                <a href="./habitats.html">Habitats</a>
            </li>
            <li class="nav-menu-item">
                <a href="./vidamarinha.html">Vida Marinha</a>
            </li>
            <li class="nav-menu-item">
                <a href="" id="mais">
                    Mais
                    <img src="./assets/images/icons/Arrow.svg" alt="">
                </a>
                <div id="maisPopup" class="hiddenPopup">
                    <ul class="nav-popup-list">
                        <li class="nav-popup-item"><a href="./classificacoes.html">Classificações</a></li> <hr>
                        <li class="nav-popup-item"><a href="./curiosidades.html">Curiosidades</a></li> <hr>
                        <li class="nav-popup-item"><a href="./sobrenos.html">Sobre Nós</a></li> <hr>
                        <li class="nav-popup-item"><a href="./jogo.html">Zahoot!</a></li>
                    </ul>
                </div>
            </li>
            <li class="nav-menu-item">
                <a href="" id="user-header">
                    <img src="./assets/elementos/Icone -  Profile Picture.svg" alt="">
                    <span></span>
                </a>
                <div id="userPopup" class="hiddenPopup">
                    <div>
                        <span>Pontuação: ${user ? user.pontuacao : 0}</span>
                        <hr>
                        <button id="sairLogin">
                            <img src="./assets/elementos/Exit.svg">
                            Sair
                        </button>
                        <button id="deleteAccount">
                            🗑 Deletar Conta
                        </button>
                    </div>
                </div>
                <a href="./login.html" id="nav-login-button">
                    Login
                </a>
            </li>
        </ul>
    </div>
</header>`

const footerHTML = `<footer class="rodape">
        <img src="./assets/elementos/logo.svg" alt="logo zurrazard">

        <div class="links">
            <p>2025 ZurraTeams All Rights Reserved</p>
            <div></div>
            <a href="vidaselvagem.html">Vida Selvagem</a>
            <a href="habitats.html">Habitats</a>
            <a href="sobrenos.html">Sobre nós</a> 
        </div>
    </footer>`

let hiddenPopups = []

body.insertAdjacentHTML("afterbegin", headerHTML)
if (!document.querySelector(".ignoreFooter"))
    body.insertAdjacentHTML("afterend", footerHTML)
const header = body.querySelector("header")
const footer = body.querySelector("footer")
const mais = header.querySelector("#mais")
const maisPopup = header.querySelector("#maisPopup")

const userButton = document.getElementById("user-header")
const userPopup = document.getElementById("userPopup")

const sair = document.getElementById("sairLogin")
const deletar = document.getElementById("deleteAccount")

function ShowPopup(popup) {
    if (!popup.classList.contains("hiddenPopup")) {
        popup.classList.add("hiddenPopup")
        return
    }

    for (let i = 0; i < hiddenPopups.length; i++) {
        hiddenPopups[i].classList.add("hiddenPopup")
        hiddenPopups.splice(i,1)
    }
    popup.classList.remove("hiddenPopup")
    hiddenPopups.push(popup)
}

function autoLogin() {
    const loginButton = document.getElementById("nav-login-button")
    const userDiv = document.getElementById("user-header")
    
    if (!user) return
    const { username } = user
    const nameLabel = userDiv.querySelector("span")
    
    nameLabel.innerHTML = username

    userDiv.style.display = "flex"
    loginButton.style.display = "none"
}

mais.addEventListener("click", (e)=> {
    e.preventDefault()
    ShowPopup(maisPopup)
})

userButton.addEventListener("click", (e)=> {
    e.preventDefault()
    ShowPopup(userPopup)
})

sair.addEventListener("click", () => {
    sessionStorage.removeItem("user")
    alert("Log-out feito com sucesso!")
    window.location.href = "./index.html"
})

deletar.addEventListener("click", async () => {
    let wantToDelete = confirm("Você realmente deseja deletar sua conta?")

    if (!wantToDelete) return

    const user = JSON.parse(sessionStorage.getItem("user"))

    const response = await fetch('https://zahoot-score.vercel.app/remove-account', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user: user })
    }).then(response => response.json())

    if (response.error) {
        alert(response.error)
        return
    }

    sessionStorage.removeItem("user")
    alert(response.message)
    window.location.href = "./index.html"
})

autoLogin()