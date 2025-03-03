const tile = document.querySelector('.tile')

if (tile) tileInit()

function tileInit () {
  const tileTabs = tile.querySelectorAll('.tile__tab')
  const tiles = tile.querySelectorAll('.tile__tile')

  tileTabs.forEach((tab) => {
    tab.addEventListener('click', toggleTab)
  })

  function toggleTab () {
    const oldTab = tile.querySelector('.tile__tab.active')
    if (oldTab) oldTab.classList.remove('active')
    this.classList.add('active')

    const oldTile = tile.querySelector('.tile__tile.active')
    if (oldTile) oldTile.classList.remove('active')
    // oldTile.style.opacity = '0'
    // setTimeout(() => oldTile.style.display = 'none', 200)


    const id = this.getAttribute('data-id')
    tiles[id].classList.add('active')
  }
}
