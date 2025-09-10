const username = sessionStorage.getItem("username")
const points = sessionStorage.getItem("points")

const nameLabel = document.querySelector(".player h2")
const pointsLabel = document.querySelector(".player p")
const h1 = document.querySelector("h1")
const jogarNovamente = document.getElementById("jogar-novamente")

nameLabel.innerHTML = username
pointsLabel.innerHTML = points
h1.innerHTML = `${username} alcançou a melhor pontuação`

async function submitInfo() {
    const url = `https://script.google.com/macros/s/AKfycbwgrGP2cX13nOQA0xO1nKnW1lvIdiELHvhYGzq5zj_J-l7f7Txjiv-1QN6QhOQgVWhA/exec?username=${encodeURIComponent(username)}&points=${encodeURIComponent(points)}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
}

submitInfo()