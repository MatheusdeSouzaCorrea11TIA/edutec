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
        slidesPerView: 3.35,
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