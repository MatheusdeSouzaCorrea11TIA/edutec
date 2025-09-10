const play = document.getElementById("play")
const input = document.getElementById("name")

play.addEventListener("click", (e) => {
    let nextPage = play.href
    let name = input.value
    let tamanhoNome = name.split("")
    e.preventDefault()

    if (/^[A-Za-z]+$/.test(name) && tamanhoNome.length <= 10) {
        sessionStorage.setItem("username", name)
        window.location.href = nextPage
        return
    }

    alert("O nome deve ser preenchido, sem caracteres especiais ou numeros com o maximo de 10 caracteres")
})