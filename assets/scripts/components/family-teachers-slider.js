const familyTeachersSlider = document.querySelector('.family-teachers__slider')

if (familyTeachersSlider) familyTeachersSliderInit()

function familyTeachersSliderInit () {
  new Swiper(familyTeachersSlider, {
      slidesPerView: 'auto',
      spaceBetween: 40,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      a11y: false,
      pagination: {
        el: '.family-teachers__pagination',
        clickable: true,
      },
      breakpoints: {
        744: {
          navigation: {
            nextEl: '.family-teachers__nav-btn_next',
            prevEl: '.family-teachers__nav-btn_prev',
          },
          scrollbar: {
            el: '.family-teachers__scrollbar',
            draggable: true,
          },
        }
      }
    })
}
