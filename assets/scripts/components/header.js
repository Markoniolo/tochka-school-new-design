const header = document.querySelector('[data-element="header"]')

if (header) headerInit()

function headerInit () {
  const body = document.querySelector('body')

  window.addEventListener('scroll', checkHeader, { passive: true })

  checkHeader()

  function checkHeader () {
    if (window.scrollY > 10) {
      header.classList.add('header_white')
    } else {
      header.classList.remove('header_white')
    }
  }

  const menuBtn = document.querySelector('.header__nav-item_menu')
  const layer = document.querySelector('.header__layer')

  menuBtn.addEventListener('click', toggleMenu)
  layer.addEventListener('click', closeMenu)

  function toggleMenu () {
    header.classList.toggle('open')
    body.classList.toggle('no-scroll')
  }

  function closeMenu () {
    header.classList.remove('open')
    body.classList.remove('no-scroll')
  }
}
