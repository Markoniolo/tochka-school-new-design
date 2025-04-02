const predzapsTop = document.querySelector('.predzaps-top')

if (predzapsTop) predzapsTopInit()

function predzapsTopInit () {
  const close = predzapsTop.querySelector('.predzaps-top__close')
  close.addEventListener('click', removePredzapsTop)

  window.addEventListener('scroll', checkScroll, { passive: true })

  function checkScroll () {
    if (window.scrollY > 0) {
      predzapsTop.classList.add('hide')
    } else {
      predzapsTop.classList.remove('hide')
    }
  }

  function removePredzapsTop (e) {
    e.preventDefault()
    predzapsTop.classList.add('hide')
    setTimeout(() => predzapsTop.remove(), 300)
  }
}
