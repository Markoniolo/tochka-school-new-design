const howSlider = document.querySelector('[data-element="how-slider"]')

if (howSlider) howSliderInit()

function howSliderInit () {
  let howSliderSwiper

  function initSlider () {
    howSliderSwiper = new Swiper(howSlider, {
      mousewheel: { forceToAxis: true },
      slidesPerView: 'auto',
      spaceBetween: 40,
      a11y: false,
      navigation: {
        nextEl: '.how__nav-btn_next',
        prevEl: '.how__nav-btn_prev',
      },
      scrollbar: {
        el: '.how__scrollbar',
        draggable: true,
      },
    })
  }

  window.addEventListener('resize', checkSlider)

  checkSlider()

  function checkSlider () {
    if (window.innerWidth >= 1440) {
      initSlider()
    } else {
      howSliderSwiper?.destroy()
    }
  }
}
