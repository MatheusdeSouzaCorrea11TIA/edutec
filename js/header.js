const body = document.body
const headerHTML = `<header>
        <a href="./index.html"><img src="./assets/elementos/logo.svg" alt="Logo" class="logo"></a>
        <div class="links">
            <ul class="nav-menu-list">
                <li class="nav-menu-item">
                    <a href="./vidaselvagem.html">Vida Selvagem</a>
                </li>
                <li class="nav-menu-item">
                    <a href="./habitats.html">Habitats</a>
                </li>
                <li class="nav-menu-item">
                    <a href="./vidamarinha.html">Vida Marinha</a>
                </li>
                <li class="nav-menu-item">
                    <a href="" id="mais">
                        Mais
                        <img src="./assets/images/icons/Arrow.svg" alt="">
                    </a>
                </li>
            </ul>
        </div>

        <div id="popup" class="hiddenPopup">
            <ul class="nav-popup-list">
                <li class="nav-popup-item"><a href="./classificacoes.html">Classificações</a></li> <hr>
                <li class="nav-popup-item"><a href="./curiosidades.html">Curiosidades</a></li> <hr>
                <li class="nav-popup-item"><a href="./sobrenos.html">Sobre Nós</a></li> <hr>
                <li class="nav-popup-item"><a href="./jogo.html">Zahoot!</a></li>
            </ul>
        </div>

        <img src="./assets/elementos/detalhe-header.svg" alt="" class="detalhe">
    </header>`

const footerHTML = `<footer class="rodape">
        <img src="./assets/elementos/logo.svg" alt="logo zurrazard">

        <div class="links">
            <p>2025 ZurraTeams All Rights Reserved</p>
            <div></div>
            <a href="vidaselvagem.html">Vida Selvagem</a>
            <a href="habitats.html">Habitats</a>
            <a href="sobrenos.html">Sobre nós</a> 
        </div>
    </footer>`


body.insertAdjacentHTML("afterbegin", headerHTML)
body.insertAdjacentHTML("afterend", footerHTML)
const header = body.querySelector("header")
const footer = body.querySelector("footer")
const mais = header.querySelector("#mais")
const popup = header.querySelector("#popup")

console.log(mais)

mais.addEventListener("click", (e)=> {
    e.preventDefault()
    
    if (popup.classList.contains("hiddenPopup"))
        popup.classList.remove("hiddenPopup")
    else
        popup.classList.add("hiddenPopup")
})