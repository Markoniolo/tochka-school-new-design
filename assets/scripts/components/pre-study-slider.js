const preStudySlider = document.querySelector('[data-element="pre-study-slider"]')

if (preStudySlider) {
  var preStudySliderSwiper
  var animationPlayed = false
  const wrapper = preStudySlider.querySelector('.pre-study__wrapper')
  window.addEventListener('resize', watchSlider, {passive: true})
  window.addEventListener('scroll', animateSlider, {passive: true})
  watchSlider()

  function initSlider () {
    preStudySliderSwiper = new Swiper(preStudySlider, {
      mousewheel: { forceToAxis: true },
      slidesPerView: 'auto',
      spaceBetween: 25,
      loop: true,
      pagination: {
        el: ".pre-study__pagination",
      },
    })
  }

  function watchSlider () {
    if (window.innerWidth < 1440) {
      preStudySliderSwiper?.destroy()
      initSlider()
    } else {
      preStudySliderSwiper?.destroy()
    }
  }

  function animateSlider () {
    if (preStudySlider.getBoundingClientRect().top < window.innerHeight/2 && !animationPlayed && window.innerWidth < 992) {
      animationPlayed = true
      wrapper.style.transitionDuration = '0.5s'
      wrapper.style.transform = 'translate3d(-160px, 0, 0)'
      setTimeout(function () {
        wrapper.style.transform = 'translate3d(0, 0, 0)'
      }, 500)
    }
  }
}
