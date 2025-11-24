const cake = document.querySelector('.cake')

if (cake) checkCake()

function checkCake() {
  const cakeButton = cake.querySelector('.cake__button')
  const btnScrollToTop = document.querySelector('.btn-scroll-to-top')
  if (!getCookie('cakes_policy')) {
    cake.classList.add('cake_active')
    if (btnScrollToTop) btnScrollToTop.classList.add('active-cake')

    cakeButton.addEventListener('click', function () {
      setCake('cakes_policy', 'true', 365)
      cake.classList.remove('cake_active')
      const btnFixed = document.querySelector('[data-element="btn-fixed"]')
      const promo = document.querySelector('.promo')
      if (promo) {
        promo.classList.remove('transition-with-cake')
        promo.classList.remove('transition-with-cake-offset')
      }
      if (btnFixed) btnFixed.classList.remove('active-with-cake-offset')
      if (btnScrollToTop) btnScrollToTop.classList.remove('active-cake')
    })
  }
}

function setCake(name, value, days) {
  let expires = ""
  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"
}
