const { username } = JSON.parse(sessionStorage.getItem("user"))
const pontuacao = sessionStorage.getItem("points")

const nameLabel = document.querySelector(".player h2")
const pointsLabel = document.querySelector(".player p")
const h1 = document.querySelector("h1")
const jogarNovamente = document.getElementById("jogar-novamente")

nameLabel.innerHTML = username
pointsLabel.innerHTML = pontuacao

const backendHTML = "http://localhost:3333"

async function getData() {
    const response = await fetch(`${backendHTML}/get-points`)
    .then(response => response.json())

    maiorPontuacao(response)
}

async function maiorPontuacao(data) {
    if (username === "teste") return

    let maior = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i].ponto > maior) {
            maior = data[i].ponto
        }
    }

    if (pontuacao >= maior) {
        h1.innerHTML = `Parabéns ${username}, você alcançou a melhor pontuação!`
    } else {
        h1.innerHTML = `Parabéns, ${username}, uma ótima pontuação!`
    }

    const response = await fetch(`${backendHTML}/set-points`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, pontuacao: pontuacao })
    }).then(response => response.json())
}

getData()