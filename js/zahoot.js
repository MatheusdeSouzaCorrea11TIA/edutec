const buttons = document.querySelector(".perguntas").querySelectorAll("button")
const descricao = document.getElementById("descricao")
const imagem = document.querySelector(".container img")
const sair = document.getElementById("sair")
const questaoAtual = document.querySelector(".questao")
const pontos = document.querySelector(".pontos")
const resultPopup = document.querySelector(".result-popup")
const exitPopup = document.querySelector(".exit-popup")
const tempoText = document.querySelector(".tempo")

let pause = false
let username = sessionStorage.getItem("username")
let points = 0
let multiplier = 0
let question = 0
let questions = [
    {
        desc: "Em qual habitat vive o Tigre-de-bengala?",
        img: "../assets/questoes/trige-de-bengala.jpg",
        alternativas: [ "Florestas tropicais" , "Florestas frias" , "Ambientes aquáticos" , "Habitat desértico"],
        correta: 1,
        tempo: 15
    },
    {
        desc: "Qual desses animais está risco de extinção?",
        img: "../assets/questoes/extincao.jpg",
        alternativas: ["Cachorros domésticos" , "Babuíno" , "Arara azul" , "Cavalos"],
        correta: 3,
        tempo: 10
    },
    {
        desc: "Qual é este animal?",
        img: "../assets/questoes/macaco-prego.jpg",
        alternativas: ["Macaco prego" , "Iguana" , " Onça pintada" , "Crocodilo"],
        correta: 1,
        tempo: 7
    },
    {
        desc: "Qual é o malefício em destruir o habitat dos animais e como isso influência negativamente no nosso dia a dia?",
        img: "../assets/questoes/queimadas.jpeg",
        alternativas: ["Não existe nenhum malefício, porque os animais conseguem se adaptar facilmente em qualquer ambiente, inclusive nas cidades, então isso não afeta em nada o nosso dia a dia." ,"A destruição do habitat dos animais causa desequilíbrio ambiental, reduz a biodiversidade e aumenta o risco de extinção de espécies. Isso impacta diretamente o ser humano, pois compromete a qualidade do ar, da água, da alimentação e até a saúde, já que favorece a propagação de doenças." , "O maior problema de destruir o habitat dos animais é que ficamos sem lugares para construir prédios e casas, o que atrapalha o crescimento das cidades e dificulta o avanço da tecnologia." , "Destruir o habitat dos animais só influencia negativamente porque deixa o planeta mais feio visualmente, já que sem florestas e natureza não temos lugares bonitos para visitar."],
        correta: 1,
        tempo: 30
    },
    {
        desc: "Qual desses animais é um mamífero marinho?",
        img: "../assets/questoes/mamifero.jpg",
        alternativas: ["Golfinho", "Pinguim", "Tubarão", "Foca"],
        correta: 1,
        tempo: 10
    },    
    {
        desc: "Qual animal é conhecido por construir represas e alterar ecossistemas?",
        img: "../assets/questoes/represa.jpg",
        alternativas: ["Castor", "Coelho", "Lontra", "Baleia"],
        correta: 1,
        tempo: 12
    },
    {
        desc: "Qual é o maior felino do mundo?",
        img: "../assets/questoes/gato.jpg",
        alternativas: ["Leão", "Tigre", "Onça pintada", "Ligre"],
        correta: 4,
        tempo: 10
    }

]
let actualQuestion = null
let pastQuestions = []
let actualTime = 0
let answered = false

function trocarPergunta() {
    let indexAleatorio

    do {
        indexAleatorio = Math.floor(Math.random() * questions.length)
        console.log(pastQuestions.length > 0)
        if (pastQuestions.length >= 5) {
            win()
            return
        }
    } while (pastQuestions.includes(indexAleatorio))
    
    actualQuestion = questions[indexAleatorio]
    pastQuestions.push(indexAleatorio)
    console.log(pastQuestions)
    closePopup()
    trocarElementos()
}

function trocarElementos() {
    answered = false
    descricao.innerHTML = actualQuestion.desc
    imagem.src = actualQuestion.img
    questaoAtual.innerHTML = `${pastQuestions.length}/5 Perguntas`
    pontos.innerHTML = `${username} | ${points}`
    actualTime = actualQuestion.tempo

    for (let i = 0; i < buttons.length; i++) {
        let button = document.getElementById(`resposta${i+1}`)
        button.innerHTML = actualQuestion.alternativas[i]
    }
}

function adivinhar(correta) {
    if (correta) {
        answered = true
        multiplier = 500 * (1 - 1/actualTime)
        points += 500 + Math.floor(multiplier)
    }

    showPopup(correta)
}

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (button.id === `resposta${actualQuestion.correta}`) {
            adivinhar(true, "")
        } else {
            adivinhar(false)
        }
    })
})

function showPopup(correta, info) {
    resultPopup.classList.remove("hidden")
    let button = resultPopup.querySelector("#nextQuestion")
    let pointText = resultPopup.querySelector(".quantidade-pontos")
    let infoText = resultPopup.querySelector(".info")
    let rightIMG = resultPopup.querySelector(".right")
    let wrongIMG = resultPopup.querySelector(".wrong")

    button.addEventListener("click", trocarPergunta)
    if (correta) {
        rightIMG.classList.remove("hidden")
        wrongIMG.classList.add("hidden")
        infoText.innerHTML = "Resposta Correta!"
        pointText.innerHTML = "+" + (Math.floor(multiplier) + 500)
    } else {
        rightIMG.classList.add("hidden")
        wrongIMG.classList.remove("hidden")
        infoText.innerHTML = "Resposta errada! " + info
        pointText.innerHTML = "+" + 0
    }
}

function closePopup() {
    pause = false
    resultPopup.classList.add("hidden")
    exitPopup.classList.add("hidden")
}

function win() {
    closePopup()
    sessionStorage.setItem("points", points)
    window.location.href = "./rank.html"
}

function quit() {
    pause = true
    exitPopup.classList.remove("hidden")
    let yes = exitPopup.querySelector("#yes")
    let no = exitPopup.querySelector("#no")

    yes.addEventListener("click", ()=> window.location.href = "./jogo.html")
    no.addEventListener("click", closePopup)
}

trocarPergunta()
sair.addEventListener("click", quit)
setInterval(() => {
    if (!answered && actualTime > 0 && !pause) {
        actualTime -= 0.1
        tempoText.innerHTML = actualTime.toFixed(0)
    }

    if (actualTime <= 0)
        showPopup(false,"Tempo esgotado.")
}, 100)