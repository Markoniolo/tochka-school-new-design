const preReviewsSlider = document.querySelector('[data-element="pre-reviews-slider"]')

if (preReviewsSlider) preReviewsSliderInit()

function preReviewsSliderInit () {
  const preReviewsSliderSwiper = new Swiper(preReviewsSlider, {
    slidesPerView: 'auto',
    spaceBetween: 25,
    a11y: false,
    navigation: {
      nextEl: '.pre-reviews__nav-btn_right',
      prevEl: '.pre-reviews__nav-btn_left',
    },
    scrollbar: {
      el: '.pre-reviews__scrollbar',
      draggable: true,
    },
    breakpoints: {
      1440: {
        spaceBetween: 30,
      }
    }
  })
}
