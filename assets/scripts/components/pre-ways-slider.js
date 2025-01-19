const preWaysSlider = document.querySelector('[data-element="pre-ways__slider"]')

if (preWaysSlider) preWaysSliderInit()

function preWaysSliderInit () {
  let preWaysSliderSwiper
  window.addEventListener('resize', watchSlider, {passive: true})
  watchSlider()

  function watchSlider () {
    if (window.innerWidth < 1200) {
      preWaysSliderSwiper?.destroy()
    } else {
      preWaysSliderSwiper?.destroy()
      initSlider()
    }
  }

  function initSlider () {
    preWaysSliderSwiper = new Swiper(preWaysSlider, {
      slidesPerView: 'auto',
      spaceBetween: 25,
      pagination: {
        el: ".pre-ways__pagination",
      },
      navigation: {
        nextEl: '.pre-ways__nav-btn_right',
        prevEl: '.pre-ways__nav-btn_left',
      },
      scrollbar: {
        el: '.pre-ways__scrollbar',
        draggable: true,
      },
      breakpoints: {
        1440: {
          spaceBetween: 30,
        }
      }
    })
  }
}
