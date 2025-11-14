const alternate = document.getElementById("alternate-divs")
const overlay = document.querySelector(".overlay")

const loginDiv = document.querySelector(".login")
const cadastroDiv = document.querySelector(".cadastro")

alternate.addEventListener("click", ()=> {
    if (overlay.classList.contains("right")) {
        overlay.classList.add("left")
        overlay.classList.remove("right")

        loginDiv.classList.add("fadeOut")
        cadastroDiv.classList.remove("fadeOut")
    } else {
        overlay.classList.add("right")
        overlay.classList.remove("left")

        loginDiv.classList.add("fadeIn")

        cadastroDiv.classList.add("fadeOut")
    }
})