const stretch = document.querySelector('[data-role="stretch"]')

if (stretch) stretchInit()

function stretchInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const close = stretch.querySelector('[data-role="stretch-close"]')
  if (close) close.addEventListener('click', removeStretch)

  function removeStretch (e) {
    e.preventDefault()
    stretch.remove()
    window.removeEventListener('scroll', checkScroll)
    stickyHeader.classList.remove('predzaps-top-hide-no-transition')
    stickyHeader.classList.remove('predzaps-top-hide')
  }

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
}
