const preStudySlider = document.querySelector('[data-element="pre-study-slider"]')
let preStudySliderSwiper

if (preStudySlider) {
  const swiperWrapper = document.querySelector('.pre-study__wrapper')
  window.addEventListener('resize', watchSlider)
  watchSlider()

  function initSlider () {
    preStudySliderSwiper = new Swiper(preStudySlider, {
      slidesPerView: 'auto',
      spaceBetween: 25,
      pagination: {
        el: ".pre-study__pagination",
      },
    })
  }

  function watchSlider () {
    if (window.innerWidth < 1440) {
      initSlider()
    } else {
      preStudySliderSwiper?.destroy()
      swiperWrapper.style.transform = 'none'
    }
  }
}
