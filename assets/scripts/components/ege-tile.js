const egeTileFilter = document.querySelector(".ege-tile__filter")

if (egeTileFilter) egeTileFilterInit()

function egeTileFilterInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')
  const egeTileFilterTop = egeTileFilter.querySelector(".ege-tile__filter-top")
  const selectedText = egeTileFilter.querySelector('.ege-tile__filter-top-text')
  const inputs = egeTileFilter.querySelectorAll('.ege-tile__filter-input')
  const cards = document.querySelectorAll('.all-courses__item')
  const tabs = document.querySelectorAll('.ege-tile__tab-input')
  const tile = document.querySelector('.all-courses__tile')
  let classId = false

  egeTileFilterTop.addEventListener("click", (e)=> openFilter(egeTileFilterTop, e))

  document.addEventListener('click', function () {
    egeTileFilterTop.classList.remove('active')
  })

  togglePrice()

  function togglePrice () {
    const items = tile.querySelectorAll(".all-courses__item")
    items.forEach((item) => {
      const toggle = item.querySelectorAll('.all-courses__radio-input')
      if (!toggle.length) return
      const boxes = item.querySelectorAll('.all-courses__box')
      const textReplace = item.querySelector('.all-courses__info.text-replace')
      let texts
      if (textReplace) {
        texts = textReplace.querySelectorAll('.all-courses__info-span')
      }
      for (let i = 0; i < toggle.length; i++) {
        toggle[i].addEventListener('change', toggleBoxes)
        if (texts) toggle[i].addEventListener('change', toggleTexts)
      }

      function toggleBoxes () {
        for (let i = 0; i < boxes.length; i++) {
          if (boxes[i].classList.contains('hide')) {
            boxes[i].classList.remove('hide')
          } else {
            boxes[i].classList.add('hide')
          }
        }
      }

      function toggleTexts () {
        for (let i = 0; i < texts.length; i++) {
          if (texts[i].classList.contains('hide')) {
            texts[i].classList.remove('hide')
          } else {
            texts[i].classList.add('hide')
          }
        }
      }
    })
  }

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('input', tabHandler)
  }

  function tabHandler() {
    this.checked = !this.checked
    if (this.checked) {
      this.checked = false
      classId = false
    } else {
      const oldActiveTabs = document.querySelectorAll('.ege-tile__tab-input:checked')
      for (let i = 0; i < oldActiveTabs.length; i++) {
        oldActiveTabs[i].checked = false
      }
      this.checked = true
      classId = this.value
    }
    updateFilter()
  }

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
    const subject = egeTileFilter.querySelector('.ege-tile__filter-input:checked')
    if (subject.value === 'all-subjects') {
      if (classId) {
        const activeCards = document.querySelectorAll('[data-class-id="' + classId + '"]')
        hideAllCards()
        showActiveCards(activeCards)
      } else {
        showAllCards()
      }
    } else {
      hideAllCards()
      selectedText.innerHTML = subject.getAttribute('data-text')
      const activeCards = document.querySelectorAll('[data-subject-id="' + subject.value + '"]')
      if (classId && activeCards.length) {
        const filteredCards = []
        for (let i = 0; i < activeCards.length; i++) {
          if (activeCards[i].getAttribute('data-class-id') === classId) filteredCards.push(activeCards[i])
        }
        showActiveCards(filteredCards)
      } else {
        showActiveCards(activeCards)
      }
    }
  }

  function showActiveCards (activeCards) {
    for (let i = 0; i < activeCards.length; i++) {
      activeCards[i].style.display = 'flex'
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
