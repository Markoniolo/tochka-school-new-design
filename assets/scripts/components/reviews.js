const reviewsSlider = document.querySelector('.reviews__slider')

if (reviewsSlider) reviewsSliderInit()

function reviewsSliderInit () {
  const preReviewsSliderSwiper = new Swiper(reviewsSlider, {
    slidesPerView: 'auto',
    spaceBetween: 15,
    a11y: false,
    navigation: {
      nextEl: '.reviews__nav-btn.reviews__nav-btn_next',
      prevEl: '.reviews__nav-btn.reviews__nav-btn_prev',
    },
    scrollbar: {
      el: '.reviews__scrollbar',
      draggable: true,
    },
    breakpoints: {
      744: {
        spaceBetween: 20,
      },
      1440: {
        spaceBetween: 30,
      }
    }
  })

  const videos = reviewsSlider.querySelectorAll('.reviews__video')

  for (let i = 0; i < videos.length; i++) {
    initVideo(videos[i])
  }

  function initVideo (video) {
    const box = video.closest('.reviews__box')
    box.addEventListener('click', playVideo)
    video.addEventListener('click', stopVideo)

    function playVideo () {
      const oldBox = reviewsSlider.querySelector('.reviews__box.active')
      if (oldBox) {
        const oldVideo = oldBox.querySelector('.reviews__video')
        if (oldVideo) oldVideo.pause()
        oldBox.classList.remove('active')
      }
      video.play()
      box.classList.add('active')
    }

    function stopVideo (e) {
      e.stopPropagation()
      video.pause()
      box.classList.remove('active')
    }
  }

  const inners = reviewsSlider.querySelectorAll('.reviews__inner')

  for (let i = 0; i < inners.length; i++) {
    initInner(inners[i])
  }

  function initInner (inner) {
    const text = inner.querySelector('.reviews__text')
    const btn = inner.querySelector('.reviews__toggle')

    if (inner.clientHeight > 360) {
      inner.classList.add('hide')
      btn.addEventListener('click', toggle)
    } else {
      btn.remove()
    }

    function toggle () {
      if (inner.classList.contains('hide')) {
        inner.classList.remove('hide')
        btn.innerHTML = 'Скрыть'
        inner.classList.add('show')
      } else {
        inner.classList.add('hide')
        btn.innerHTML = 'Читать весь отзыв'
        inner.classList.remove('show')
      }
    }
  }

}
