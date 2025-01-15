const header = document.querySelector('[data-element="header"]')

if (header) headerInit()

function headerInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')

  window.addEventListener('scroll', checkHeader, { passive: true })
  window.addEventListener('resize', checkHeader, { passive: true })

  checkHeader()

  function checkHeader () {
    if (window.scrollY > 10) {
      header.classList.add('header_white')
      stickyHeader.classList.add('white')
    } else {
      header.classList.remove('header_white')
      stickyHeader.classList.remove('white')
    }

    if (window.scrollY > 200 && window.innerWidth >= 1200) {
      header.classList.add('thin')
    } else if (window.scrollY < 100 && window.innerWidth >= 1200) {
      header.classList.remove('thin')
    } else if (window.innerWidth < 1200) {
      header.classList.remove('thin')
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
