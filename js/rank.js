const username = sessionStorage.getItem("username")
const points = sessionStorage.getItem("points")

const nameLabel = document.querySelector(".player h2")
const pointsLabel = document.querySelector(".player p")
const h1 = document.querySelector("h1")
const jogarNovamente = document.getElementById("jogar-novamente")

nameLabel.innerHTML = username
pointsLabel.innerHTML = points
h1.innerHTML = `${username} alcançou a melhor pontuação`