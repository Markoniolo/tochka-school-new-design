const btnFixed = document.querySelector('[data-element="btn-fixed"]')

if (btnFixed) btnFixedInit()

function btnFixedInit () {
  const start = btnFixed.getAttribute('data-btn-fixed-start')
  const end = btnFixed.getAttribute('data-btn-fixed-end')
  const body = document.getElementsByTagName('body')[0]
  const promo = document.querySelector('.promo')
  window.addEventListener('scroll', checkBtnFixed, { passive: true })

  function checkBtnFixed () {
    if (window.scrollY > start && body.scrollHeight - window.pageYOffset > end && !checkBtnFixedHide()) {
      btnFixed.classList.add('active')
      if (promo) promo.classList.add('transition')
    } else {
      btnFixed.classList.remove('active')
      if (promo) promo.classList.remove('transition')
    }
  }

  const sectionsWhenBtnHide = document.querySelectorAll('[data-btn-fixed-hide="true"]')

  function checkBtnFixedHide () {
    let isHide = false
    for (let i = 0; i < sectionsWhenBtnHide.length; i++) {
      if (elementInViewport(sectionsWhenBtnHide[i])) isHide = true
    }
    return isHide
  }

  function elementInViewport(el) {
    let top = el.offsetTop
    let left = el.offsetLeft
    let width = el.offsetWidth
    let height = el.offsetHeight

    while(el.offsetParent) {
      el = el.offsetParent
      top += el.offsetTop
      left += el.offsetLeft
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    )
  }
}
