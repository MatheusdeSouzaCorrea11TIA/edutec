let nome = sessionStorage.getItem("username")
let pontos = sessionStorage.getItem("points")
const pessoaTemplate = `<div class="pessoa">
<div class="profile">
    <img src="./assets/elementos/Icone -  Profile Picture.svg" alt="Pessoa">
    <h3>Nome</h3>
</div>
<p>9999</p>
</div>`

fetch('http://localhost:3333/get-points')
.then(res => res.json())
.then(data => createScore(data))
.catch(error => console.error("Fetch error:", error))

function createScore(data) {
  const holder = document.querySelector(".container")
  if (!holder) return

  for (let i = 0; i < data.length; i++) {
    const temp = document.createElement("div")
    temp.innerHTML = pessoaTemplate

    const pessoaElement = temp.firstElementChild
    pessoaElement.querySelector("h3").innerHTML = data[i].nome
    pessoaElement.querySelector("p").innerHTML = data[i].ponto

    holder.appendChild(pessoaElement)
  }
}