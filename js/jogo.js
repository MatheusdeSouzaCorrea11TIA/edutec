const play = document.getElementById("play")
const loginBtn = document.querySelector(".login-button")
const nameLabel = document.querySelector(".nickname")
const userGame = JSON.parse(sessionStorage.getItem("user"))

play.addEventListener("click", (e) => {
    e.preventDefault()
    
    if (!userGame) {
        alert("Você deve fazer Login para jogar!")
        return
    }

    let nextPage = play.href
    window.location.href = nextPage
})

if (userGame) {
    nameLabel.innerHTML = userGame.username
    nameLabel.classList.remove("hidden")
    loginBtn.classList.add("hidden")
}
    // function antigoLogin() {
    //     let nextPage = play.href
    //     let name = input.value
    //     let tamanhoNome = name.split("")
        
    //     if (/^[A-Za-z]+$/.test(name) && tamanhoNome.length <= 10) {
    //         sessionStorage.setItem("username", name)
    //         window.location.href = nextPage
    //         return
    //     }
        
    //     alert("O nome deve ser preenchido, sem caracteres especiais ou numeros com o maximo de 10 caracteres")
    // }