const predzapsTop = document.querySelector('.predzaps-top')

if (predzapsTop) predzapsTopInit()

function predzapsTopInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const close = predzapsTop.querySelector('.predzaps-top__close')
  close.addEventListener('click', removePredzapsTop)

  window.addEventListener('scroll', checkScroll, { passive: true })

  function checkScroll () {
    if (window.scrollY > 100) {
      stickyHeader.classList.add('predzaps-top-hide')
      setTimeout(() => stickyHeader.classList.add('predzaps-top-hide-no-transition'), 300)
    } else if (window.scrollY <= 20) {
      stickyHeader.classList.remove('predzaps-top-hide-no-transition')
      setTimeout(() => stickyHeader.classList.remove('predzaps-top-hide'), 100)
    }
  }

  function removePredzapsTop (e) {
    e.preventDefault()
    stickyHeader.classList.add('predzaps-top-hide')
    setTimeout(() => {
      stickyHeader.classList.add('no-transform')
      stickyHeader.classList.remove('predzaps-top-hide')
      window.removeEventListener('scroll', checkScroll, { passive: true })
      predzapsTop.classList.add('hide')
      setTimeout(() => predzapsTop.remove(), 600)
    }, 300)
  }
}
