const catalogAchievementsSlider = document.querySelector(".catalog-achievements__slider")

if (catalogAchievementsSlider) catalogAchievementsSliderInit()

function catalogAchievementsSliderInit () {
  const pointer = document.querySelector(".catalog-achievements__pointer")
  const slider = new Swiper(catalogAchievementsSlider, {
    mousewheel: { forceToAxis: true },
    slidesPerView: 'auto',
    spaceBetween: 20,
    a11y: false,
    navigation: {
      nextEl: '.catalog-achievements__btn_next',
      prevEl: '.catalog-achievements__btn_prev',
    },
    scrollbar: {
      el: '.catalog-achievements__scrollbar',
      draggable: true,
    },
  })

  slider.on('slideChange', function () {
    if (pointer) pointer.style.display = 'none'
  })
}
