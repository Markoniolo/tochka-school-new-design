const itTileItems = document.querySelectorAll('.it-tile__item')

for (let i = 0; i < itTileItems.length; i++) {
  itTileMoreInit(itTileItems[i])
}

function itTileMoreInit (parent) {
  const btn = parent.querySelector('.it-tile__more')
  const descr = parent.querySelector('.it-tile__author-descr')

  if (btn && descr) {
    if ((descr.clientHeight > 68 && window.innerWidth >= 1440) || (descr.clientHeight > 50 && window.innerWidth < 1440)) {
      descr.classList.add('hide')
    } else {
      btn.remove()
    }
  }
}
