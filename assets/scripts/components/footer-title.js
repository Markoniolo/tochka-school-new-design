const footerTitleArray = document.querySelectorAll('[data-element="footer__title"]')

if (footerTitleArray.length) footerTitleArrayInit()

function footerTitleArrayInit () {
  for (let i = 0; i < footerTitleArray.length; i++) {
    footerTitleArray[i].addEventListener('click', toggleFooterTitle)
  }

  function toggleFooterTitle () {
    this.classList.toggle('active')
  }
}
