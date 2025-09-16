const langsTeachersSlider = document.querySelector('.langs-teachers__slider')

if (langsTeachersSlider) langsTeachersSliderInit()

function langsTeachersSliderInit () {
  let swiper
  if (window.innerWidth >= 744) {
    swiper = new Swiper(langsTeachersSlider, {
      mousewheel: { forceToAxis: true },
      slidesPerView: 'auto',
      autoHeight: true,
      spaceBetween: 500,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      a11y: false,
      pagination: {
        el: '.langs-teachers__pagination',
        clickable: true,
      },
      breakpoints: {
        744: {
          effect: 'fade',
          navigation: {
            nextEl: '.langs-teachers__nav-btn_next',
            prevEl: '.langs-teachers__nav-btn_prev',
          },
          scrollbar: {
            el: '.langs-teachers__scrollbar',
            draggable: true,
          },
        }
      }
    })
  } else {
    swiper = new Swiper(langsTeachersSlider, {
      mousewheel: { forceToAxis: true },
      slidesPerView: 'auto',
      autoHeight: true,
      spaceBetween: 200,
      fadeEffect: {
        crossFade: true
      },
      a11y: false,
      pagination: {
        el: '.langs-teachers__pagination',
        clickable: true,
      },
      breakpoints: {
        744: {
          effect: 'fade',
          navigation: {
            nextEl: '.langs-teachers__nav-btn_next',
            prevEl: '.langs-teachers__nav-btn_prev',
          },
          scrollbar: {
            el: '.langs-teachers__scrollbar',
            draggable: true,
          },
        }
      }
    })
  }

  const boxes = langsTeachersSlider.querySelectorAll('.langs-teachers__box')

  for (let i = 0; i < boxes.length; i++) {
    const list = boxes[i].querySelector('.langs-teachers__list')
    if (list.clientHeight > 150) moreBtnInit(boxes[i])
  }

  function moreBtnInit (box) {
    box.classList.add('hide')
    const btn = box.querySelector('.langs-teachers__more')
    btn.classList.add('active')
    btn.addEventListener('click', toggleBox)

    function toggleBox () {
      if (box.classList.contains('hide')) {
        box.classList.remove('hide')
        btn.innerHTML = 'Свернуть'
      } else {
        box.classList.add('hide')
        btn.innerHTML = 'Показать полностью'
      }
      swiper.update()
    }
  }
}
