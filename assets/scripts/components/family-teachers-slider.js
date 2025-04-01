const familyTeachersSlider = document.querySelector('.family-teachers__slider')

if (familyTeachersSlider) familyTeachersSliderInit()

function familyTeachersSliderInit () {
  let swiper
  if (window.innerWidth >= 744) {
    swiper = new Swiper(familyTeachersSlider, {
      slidesPerView: 'auto',
      autoHeight: true,
      spaceBetween: 500,
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
          effect: 'fade',
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
  } else {
    swiper = new Swiper(familyTeachersSlider, {
      slidesPerView: 'auto',
      autoHeight: true,
      spaceBetween: 200,
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
          effect: 'fade',
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

  const boxes = familyTeachersSlider.querySelectorAll('.family-teachers__box')

  for (let i = 0; i < boxes.length; i++) {
    const list = boxes[i].querySelector('.family-teachers__list')
    if (list.clientHeight > 150) moreBtnInit(boxes[i])
  }

  function moreBtnInit (box) {
    box.classList.add('hide')
    const btn = box.querySelector('.family-teachers__more')
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
