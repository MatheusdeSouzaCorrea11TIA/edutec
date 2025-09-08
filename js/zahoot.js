const buttons = document.querySelector(".perguntas").querySelectorAll("button")
const titulo = document.getElementById("titulo")
const descricao = document.getElementById("descricao")

let username = sessionStorage.getItem("username")
let points = 0
let question = 0
let questions = [
    {
        titulo: "Dedos do sapo",
        desc: "Quantos dedos um sapo tem",
        img: "",
        alternativas: ["Talvez essa", "Essa aq", "Ou será essa", "Pode ser essa"],
        correta: 3
    },
]
let actualQuestion = null
let pastQuestions = []

function changeQuestion() {
    let indexAleatorio
    do {
        indexAleatorio = Math.floor(Math.random() * questions.length)
        actualQuestion = questions[indexAleatorio]
        pastQuestions.push(indexAleatorio)
    } while (questions.includes(indexAleatorio))
}

function trocarPergunta() {
    titulo.innerHTML = actualQuestion.titulo
    descricao.innerHTML = actualQuestion.desc
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = actualQuestion.alternativas[i]
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        if (button.id === `resposta${actualQuestion.correta-1}`) {
            alert("Certa resposta!")
        }
    })
})

changeQuestion()
trocarPergunta()