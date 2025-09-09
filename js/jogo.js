const play = document.getElementById("play")
const input = document.getElementById("name")

play.addEventListener("click", (e) => {
    let nextPage = play.href
    let name = input.value
    e.preventDefault()

    if (/^[A-Za-z]+$/.test(name)) {
        sessionStorage.setItem("username", name)
        window.location.href = nextPage
        return
    }

    alert("O nome deve ser preenchido, sem caracteres especiais ou numeros")
})