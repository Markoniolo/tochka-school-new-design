const dataRedirectLinks = document.querySelectorAll('[data-redirect]')

if (dataRedirectLinks.length) dataRedirectLinksInit()

function dataRedirectLinksInit () {
  for (let i = 0; i < dataRedirectLinks.length; i++) {
    dataRedirectLinks[i].addEventListener('click', dataRedirect)
  }
}

function dataRedirect (e) {
  e.preventDefault()
  window.open(this.href, '_blank');
}

const directionTile = document.querySelector('.direction-tile')

if (directionTile) directionTileInit()

function directionTileInit () {
  const config = { attributes: false, childList: true, characterData: true, subtree: true }
  const observer = new MutationObserver(function() {
    dataRedirectInit()
  })

  observer.observe(directionTile, config)
}

function dataRedirectInit () {
  const dataRedirectLinks = directionTile.querySelectorAll('[data-redirect]')

  for (let i = 0; i < dataRedirectLinks.length; i++) {
    dataRedirectLinks[i].addEventListener('click', dataRedirect)
  }
}
