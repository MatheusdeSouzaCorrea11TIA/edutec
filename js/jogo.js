const play = document.getElementById("play")
const loginBtn = document.querySelector(".login-button")
const nameLabel = document.querySelector(".nickname")

play.addEventListener("click", (e) => {
    autoLogin()
    e.preventDefault()
})

function autoLogin() {
    const user = sessionStorage.getItem("user")
    if (!user) {
        alert("Você deve fazer Login para jogar!")
        return
    }

    let nextPage = play.href
    nameLabel.innerHTML = user.name
    nameLabel.classList.remove("hidden")
    loginBtn.classList.add("hidden")

    window.location.href = nextPage
}

function antigoLogin() {
    let nextPage = play.href
    let name = input.value
    let tamanhoNome = name.split("")

    if (/^[A-Za-z]+$/.test(name) && tamanhoNome.length <= 10) {
        sessionStorage.setItem("username", name)
        window.location.href = nextPage
        return
    }

    alert("O nome deve ser preenchido, sem caracteres especiais ou numeros com o maximo de 10 caracteres")
}