const { name, pontuacao } = sessionStorage.getItem("user")

const pessoaTemplate = `<div class="pessoa">
<div class="profile">
    <img src="./assets/elementos/Icone -  Profile Picture.svg" alt="Pessoa">
    <h3>Nome</h3>
</div>
<p>9999</p>
</div>`

const backendHTML = 'http://localhost:3333'

async function getData() {
  const reponse = await fetch(`${backendHTML}/get-points`)
  .then(response => response.json())

  createScore(reponse)
}

function createScore(data) {
  const holder = document.querySelector(".container")
  if (!holder) return

  for (let i = 0; i < data.length; i++) {
    const temp = document.createElement("div")
    temp.innerHTML = pessoaTemplate

    const pessoaElement = temp.firstElementChild
    pessoaElement.querySelector("h3").innerHTML = data[i].name
    pessoaElement.querySelector("p").innerHTML = data[i].pontuacao

    holder.appendChild(pessoaElement)
  }
}

getData()