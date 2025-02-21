const headerNew = document.querySelector('[data-element="header-new"]')

if (headerNew) headerNewInit()

function headerNewInit () {
  window.addEventListener('scroll', toggleHeader, {passive: true})

  function toggleHeader () {
    if (window.scrollY > 0) {
      headerNew.classList.add('thin')
    } else {
      headerNew.classList.remove('thin')
    }
  }
}
