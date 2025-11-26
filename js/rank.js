const { name, pontuacao } = sessionStorage.getItem("user")

const nameLabel = document.querySelector(".player h2")
const pointsLabel = document.querySelector(".player p")
const h1 = document.querySelector("h1")
const jogarNovamente = document.getElementById("jogar-novamente")

nameLabel.innerHTML = name
pointsLabel.innerHTML = pontuacao

const backendHTML = "http://localhost:3333"

async function getData() {
    const response = await fetch(`${backendHTML}/get-points`)
    .then(response => response.json())

    maiorPontuacao(response)
}

async function maiorPontuacao(data) {
    if (name === "teste") return

    let maior = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i].ponto > maior) {
            maior = data[i].ponto
        }
    }

    if (pontuacao >= maior) {
        h1.innerHTML = `Parabéns ${name}, você alcançou a melhor pontuação!`
    } else {
        h1.innerHTML = `Parabéns, ${name}, uma ótima pontuação!`
    }

    const response = await fetch(`${backendHTML}/set-points`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome: name, pontos: pontuacao })
    })
    .then(response => response.json())
}

getData()