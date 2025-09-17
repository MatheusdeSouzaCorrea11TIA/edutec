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
        h1.innerHTML = `Parabéns ${username}, você alcançou a melhor pontuação!`
    } else {
        h1.innerHTML = `Parabéns, ${username}, uma ótima pontuação!`
    }

    fetch('http://localhost:3333/set-points', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome: username, pontos: points })
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro na requisição')
            return response.json()
    })
    .then(data => console.log('Resposta da API:',data))
    .catch(error => console.log("Erro:", error))
}