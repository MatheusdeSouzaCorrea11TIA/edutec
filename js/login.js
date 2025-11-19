const alternate = document.getElementById("alternate-divs")
const overlay = document.querySelector(".overlay")

const loginDiv = document.querySelector(".login")
const cadastroDiv = document.querySelector(".cadastro")

alternate.addEventListener("click", ()=> {
    if (overlay.classList.contains("left")) {
        alternateDivs("right","left", false)
    } else {
        alternateDivs("left","right", true)
    }
})

function alternateDivs(addClass, removeClass, addFade) {
    overlay.classList.add(addClass)
    overlay.classList.remove(removeClass)
    
    if (addFade) {
        loginDiv.classList.remove("fadeIn")
        cadastroDiv.classList.add("fadeIn")
    } else {
        loginDiv.classList.add("fadeIn")
        cadastroDiv.classList.remove("fadeIn")
    }
}