const username = sessionStorage.getItem("username")
const points = sessionStorage.getItem("points")

const nameLabel = document.querySelector(".player h2")
const pointsLabel = document.querySelector(".player p")
const h1 = document.querySelector("h1")
const jogarNovamente = document.getElementById("jogar-novamente")

nameLabel.innerHTML = username
pointsLabel.innerHTML = points


fetch('http://localhost:3333/get-points')
.then(res => res.json())
.then(data => maiorPontuacao(data))
.catch(error => console.error("Fetch error:", error))

function maiorPontuacao(data) {
    let maior = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i].ponto > maior) {
            maior = data[i].ponto
        }
    }

    if (points >= maior) {
        h1.innerHTML = `Parabéns, ${username} alcançou a melhor pontuação`
    } else {
        h1.innerHTML = `Parabéns, ${username}`
    }

    fetch('http://localhost:3333/get-points', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: { username, points }

    })
    .then(res => res.json())
    .then(data => maiorPontuacao(data))
    .catch(error => console.error("Fetch error:", error))
}