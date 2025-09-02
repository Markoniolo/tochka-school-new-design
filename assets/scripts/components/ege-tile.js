const egeTileFilter = document.querySelector(".ege-tile__filter")

if (egeTileFilter) egeTileFilterInit()

function egeTileFilterInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')
  const egeTileFilterTop = egeTileFilter.querySelector(".ege-tile__filter-top")
  const selectedText = egeTileFilter.querySelector('.ege-tile__filter-top-text')
  const inputs = egeTileFilter.querySelectorAll('.ege-tile__filter-input')
  const cards = document.querySelectorAll('.all-courses__item')

  egeTileFilterTop.addEventListener("click", (e)=> openFilter(egeTileFilterTop, e))

  document.addEventListener('click', function () {
    egeTileFilterTop.classList.remove('active')
  })

  function openFilter (opener, e) {
    e.stopPropagation()
    if (opener.classList.contains('active')) {
      opener.classList.remove('active')
      showHeader()
    } else {
      opener.classList.add('active')
      hideHeader()
    }
  }

  function showHeader () {
    stickyHeader.classList.remove('hide')
    body.classList.remove('no-scroll')
  }

  function hideHeader () {
    if (window.innerWidth < 744) {
      stickyHeader.classList.add('hide')
      body.classList.add('no-scroll')
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', updateFilter)
  }

  function updateFilter () {
    if (this.value === 'all-subjects') {
      showAllCards()
    } else {
      hideAllCards()
      selectedText.innerHTML = this.getAttribute('data-text')
      const activeCards = document.querySelectorAll('[data-subject-id="' + this.value + '"]')
      for (let i = 0; i < activeCards.length; i++) {
        activeCards[i].style.display = 'flex'
      }
    }
  }

  function hideAllCards () {
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.display = 'none'
    }
  }

  function showAllCards () {
    for (let i = 0; i < cards.length; i++) {
      cards[i].style.display = 'flex'
    }
  }
}
