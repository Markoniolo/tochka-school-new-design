const reviewsSlider = document.querySelector('.reviews__slider')

if (reviewsSlider) reviewsSliderInit()

function reviewsSliderInit () {
  const body = document.querySelector('body')
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
    const btn = inner.querySelector('.reviews__toggle')

    if (inner.clientHeight > 260) {
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
        const oldBox = reviewsSlider.querySelector('.reviews__box.active')
        if (oldBox) {
          const oldVideo = oldBox.querySelector('.reviews__video')
          if (oldVideo) oldVideo.pause()
        }
        createModal(inner, btn)
      } else {
        inner.classList.add('hide')
        btn.innerHTML = 'Читать весь отзыв'
        inner.classList.remove('show')
      }
    }

    function createModal(innerOld) {
      const slide = innerOld.closest('.reviews__slide')
      const videoOld = slide.querySelector('.reviews__video')
      const imageOld = slide.querySelector('.reviews__image')
      const textOld = slide.querySelector('.reviews__text')
      const nameOld = slide.querySelector('.reviews__name')
      const noteOld = slide.querySelector('.reviews__note')

      const modal = document.createElement('div')
      modal.classList.add('review-modal')

      const layer = document.createElement('div')
      layer.classList.add('review-modal__layer')

      const inner = document.createElement('div')
      inner.classList.add('review-modal__inner')

      const close = document.createElement('button')
      close.classList.add('review-modal__close')

      const left = document.createElement('div')
      left.classList.add('review-modal__left')

      const box = document.createElement('div')
      box.classList.add('review-modal__box')

      const image = document.createElement('img')
      image.classList.add('review-modal__image')

      const name = document.createElement('div')
      name.classList.add('review-modal__name')

      const note = document.createElement('div')
      note.classList.add('review-modal__note')

      const right = document.createElement('div')
      right.classList.add('review-modal__right')

      const text = document.createElement('div')
      text.classList.add('review-modal__text')

      image.src = imageOld.src

      if (videoOld) {
        const play = document.createElement('div')
        play.classList.add('review-modal__play')
        const video = document.createElement('video')
        video.classList.add('review-modal__video')
        box.classList.add('review-modal__box_video')
        video.src = videoOld.src
        box.append(play)
        box.append(video)

        box.addEventListener('click', playVideo)
        video.addEventListener('click', stopVideo)

        function playVideo () {
          video.play()
          box.classList.add('active')
        }

        function stopVideo (e) {
          e.stopPropagation()
          video.pause()
          box.classList.remove('active')
        }
      }

      box.append(image)
      left.append(box)
      name.innerHTML = nameOld.innerHTML
      note.innerHTML = noteOld.innerHTML
      left.append(name)
      left.append(note)
      text.innerHTML = textOld.innerHTML
      right.append(text)
      inner.append(close)
      inner.append(left)
      inner.append(right)
      modal.append(layer)
      modal.append(inner)

      layer.addEventListener('click', closeModal)
      close.addEventListener('click', closeModal)

      const main = document.querySelector('main')
      main.append(modal)

      body.classList.add('no-scroll-desktop')

      function closeModal () {
        modal.remove()
        innerOld.classList.add('hide')
        btn.innerHTML = 'Читать весь отзыв'
        innerOld.classList.remove('show')
        body.classList.remove('no-scroll-desktop')
      }
    }
  }

}
