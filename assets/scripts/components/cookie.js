const cookie = document.querySelector('.cookie')

if (cookie) checkCookies()

function checkCookies() {
  const cookieButton = cookie.querySelector('.cookie__button')

  if (!getCookie('cookies_policy')) {
    cookie.classList.add('cookie_active')

    cookieButton.addEventListener('click', function () {
      setCookie('cookies_policy', 'true', 365)
      cookie.classList.remove('cookie_active')
      const btnFixed = document.querySelector('[data-element="btn-fixed"]')
      const promo = document.querySelector('.promo')
      if (promo) {
        promo.classList.remove('transition-with-cookie')
        promo.classList.remove('transition-with-cookie-offset')
      }
      if (btnFixed) btnFixed.classList.remove('active-with-cookie-offset')
    })
  }
}

function setCookie(name, value, days) {
  let expires = ""
  if (days) {
    let date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = "; expires=" + date.toUTCString()
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/"
}
