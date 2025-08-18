const familyHowSlider = document.querySelector('[data-element="family-how-slider"]')

if (familyHowSlider) familyHowSliderInit()

function familyHowSliderInit () {
  let familyHowSliderSwiper

  function initSlider () {
    familyHowSliderSwiper = new Swiper(familyHowSlider, {
      mousewheel: { forceToAxis: true },
      slidesPerView: 'auto',
      spaceBetween: 40,
      a11y: false,
      navigation: {
        nextEl: '.family-how__nav-btn_next',
        prevEl: '.family-how__nav-btn_prev',
      },
      scrollbar: {
        el: '.family-how__scrollbar',
        draggable: true,
      },
    })
  }

  window.addEventListener('resize', checkSlider)

  checkSlider()

  function checkSlider () {
    if (window.innerWidth >= 744) {
      initSlider()
    } else {
      familyHowSliderSwiper?.destroy()
    }
  }
}
