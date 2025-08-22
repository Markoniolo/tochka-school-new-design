const reasons = document.querySelector('.reasons')

if (reasons) reasonsInit()

function reasonsInit () {
  window.scrollTo(0, 0)
  const body = document.querySelector('body')
  body.classList.add('no-scroll')
  const area = reasons.querySelector('.reasons__area')
  const circles = reasons.querySelectorAll('.reasons__circle')
  const caption = reasons.querySelector('.reasons__caption')
  const image = reasons.querySelector('.reasons__image')

  const step = 300
  let index = -1
  let touchstartY = 0
  let touchendY = 0
  const swipeThreshold = 50

  function throttle(func, delay) {
    let inThrottle
    let lastFn
    let lastTime

    return function() {
      const context = this
      const args = arguments

      if (!inThrottle) {
        func.apply(context, args)
        lastTime = Date.now()
        inThrottle = true
      } else {
        clearTimeout(lastFn)
        lastFn = setTimeout(function() {
          if (Date.now() - lastTime >= delay) {
            func.apply(context, args)
            lastTime = Date.now()
          }
        }, Math.max(delay - (Date.now() - lastTime), 0))
      }
    }
  }
  let lock = false

  function update (e) {
    if (lock) return
    if (e.deltaY < 0) {
      prevSlide()
    } else if (e.deltaY > 0) {
      nextSlide()
    }
    lock = true
    setTimeout(() => {lock = false}, 600)
  }

  window.addEventListener('touchstart', e => {
    touchstartY = e.touches[0].clientY
  })

  window.addEventListener('touchend', e => {
    touchendY = e.changedTouches[0].clientY
    handleGesture()
  })

  function handleGesture() {
    if (touchendY < touchstartY - swipeThreshold) {
      nextSlide()
    }

    if (touchendY > touchstartY + swipeThreshold) {
      prevSlide()
    }
  }

  window.addEventListener('wheel', update, { passive: true })

  function prevSlide () {
    if (index > -1 && window.scrollY === 0) {
      body.classList.add('no-scroll')
      if (area) area.classList.remove('end')
      hideOldSlide()
      index--
      showNewSlide()
      animateBg()
      if (index === -1) {
        caption.classList.remove('animate')
        image.classList.remove('animate')
        area.classList.remove('animate')
        circles[0].classList.remove('animate-end')
      }
    }
  }

  function nextSlide () {
    if (index < circles.length - 1) {
      hideOldSlide()
      index++
      showNewSlide()
      animateBg()
      if (index === 0) {
        caption.classList.add('animate')
        image.classList.add('animate')
        area.classList.add('animate')
        circles[0].classList.add('animate-end')
      }
      if (index === circles.length - 1) {
        area.classList.add('end')
        body.classList.remove('no-scroll')
      }
    }
  }

  function hideOldSlide () {
    if (circles[index]) circles[index].classList.remove('animate')
  }

  function showNewSlide () {
    if (circles[index]) circles[index].classList.add('animate')
  }

  function animateBg () {
    reasons.style.backgroundPositionY = `${step * (index+1)}px`
  }
}
