const itCapCards = document.querySelector('.it-cap__cards')

if (itCapCards) itCapCardsInit()

function itCapCardsInit () {
  let itCapCardsSwiper

  function initSlider () {
    itCapCardsSwiper = new Swiper(itCapCards, {
      slidesPerView: 'auto',
      allowTouchMove: false,
      spaceBetween: 25,
      autoplay: {
        delay: 3000,
      },
      speed: 1000,
      loop: true,
    })
  }

  window.addEventListener('resize', checkSlider)

  checkSlider()

  function checkSlider () {
    if (window.innerWidth >= 1440) {
      initSlider()
    } else {
      itCapCardsSwiper?.destroy()
    }
  }
}
