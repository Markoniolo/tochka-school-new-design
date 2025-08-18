const itHowSlider = document.querySelector(".it-how__slider")

if (itHowSlider) itHowSliderInit()

function itHowSliderInit () {
  let itHowSliderSwiper

  function initSlider () {
    itHowSliderSwiper = new Swiper(itHowSlider, {
      mousewheel: { forceToAxis: true },
      slidesPerView: 'auto',
      spaceBetween: 20,
      a11y: false,
      navigation: {
        nextEl: '.it-how__nav-btn_next',
        prevEl: '.it-how__nav-btn_prev',
      },
      scrollbar: {
        el: '.it-how__scrollbar',
        draggable: true,
      },
      breakpoints: {
        1440: {
          spaceBetween: 30,
        }
      }
    })
  }

  window.addEventListener('resize', checkSlider)

  checkSlider()

  function checkSlider () {
    if (window.innerWidth >= 744) {
      initSlider()
    } else {
      itHowSliderSwiper?.destroy()
    }
  }
}
