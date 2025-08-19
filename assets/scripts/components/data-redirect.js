const dataRedirectLinks = document.querySelectorAll('[data-redirect]')

if (dataRedirectLinks.length) dataRedirectLinksInit()

function dataRedirectLinksInit () {
  for (let i = 0; i < dataRedirectLinks.length; i++) {
    dataRedirectLinks[i].addEventListener('click', dataRedirect)
  }

  function dataRedirect (e) {
    e.preventDefault()
    window.open(this.href, '_blank');
  }
}
