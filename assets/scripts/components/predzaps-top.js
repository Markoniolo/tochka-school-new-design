const predzapsTop = document.querySelector('.predzaps-top')

if (predzapsTop) predzapsTopInit()

function predzapsTopInit () {
  const close = predzapsTop.querySelector('.predzaps-top__close')
  close.addEventListener('click', removePredzapsTop)

  window.addEventListener('scroll', checkScroll, { passive: true })

  function checkScroll () {
    if (window.scrollY > 0) {
      predzapsTop.style.display = 'none'
    } else {
      predzapsTop.style.display = 'block'
    }
  }

  function removePredzapsTop (e) {
    e.preventDefault()
    predzapsTop.remove()
  }
}
