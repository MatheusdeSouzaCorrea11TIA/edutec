fetch('http://localhost:3333/get-points')
.then(res => res.json())
.then(data => createScore(data))
.catch(error => console.error("Fetch error:", error))

function createScore(data) {
  console.log(data)
}

function createSlider() {
    let swippers = []

    new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        parallax: true,
        autoHeight: false,
        slidesPerView: 2.5,
        spaceBetween: 30,
        allowTouchMove: false,
      });
    new Swiper('.swiper2', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        parallax: true,
        autoHeight: false,
        slidesPerView: 2.5,
        spaceBetween: 30,
        allowTouchMove: true,
      });

      swippers = document.querySelectorAll(".swiper")

    swippers.forEach((swiper) => {
        let prevButton = swiper.parentNode.querySelector(".button-prev")
        let nextButton = swiper.parentNode.querySelector(".button-next");
    
        if (prevButton === null || nextButton === null)
            return

        prevButton.addEventListener("click", () => {
            swiper.swiper.slidePrev();
        })
        nextButton.addEventListener("click", () => {
            swiper.swiper.slideNext();
        })
    });
}

createSlider()