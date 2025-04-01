const trialTile = document.getElementById("trial-tile")

if (trialTile) trialTileInit()

function trialTileInit () {
  const config = { attributes: true, childList: true, characterData: true, subtree: true }

  const openers = trialTile.querySelectorAll("[data-element='trial-tile-filter-opener']")

  const observer = new MutationObserver(function() {
    const wrap = openers[1].nextElementSibling
    const items = wrap.querySelectorAll("[data-element='trial-tile-filter-input']")
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[1], wrap))
    })
  })

  const reset = trialTile.querySelector("[data-element='trial-tile-filter-reset']")
  if (reset) reset.addEventListener('click', resetFilters)

  function resetFilters () {
    for (let i = 0; i < openers.length; i++) {
      const wrap = openers[i].nextElementSibling
      const items = wrap.querySelectorAll("[data-element='trial-tile-filter-input']")
      items.forEach((item) => {
        item.checked = false
      })
      updateFilter(openers[i], wrap)
    }
  }

  for (let i = 0; i < openers.length; i++) {
    openers[i].addEventListener("click", ()=> openFilter(openers[i]))
    const wrap = openers[i].nextElementSibling
    const button = wrap.querySelector("[data-element='trial-tile-filter-save']")
    if (button) button.addEventListener("click", ()=> closeFilter(openers[i], wrap))
    const items = wrap.querySelectorAll("[data-element='trial-tile-filter-input']")
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[i], wrap))
      if (!button) item.addEventListener('change', () => closeFilter(openers[i], wrap))
    })
    if (i === 1) {
      window.onload = function() {
        observer.observe(wrap, config)
      }
    }
  }

  function updateFilter (opener, wrap) {
    opener.innerHTML = opener.getAttribute('data-default-text')
    const items = wrap.querySelectorAll(["input:checked"])
    if (items.length) {
      opener.innerHTML = 'Выбрано: '
      items.forEach((item) => {
        const span = document.createElement("span")
        span.innerHTML = item.nextElementSibling.innerHTML
        span.classList.add('span')
        opener.append(span)
      })
    }
    const itemsAll = trialTile.querySelectorAll(["input:checked"])
    if (itemsAll.length) {
      if (reset) reset.style.display = 'flex'
    } else {
      if (reset) reset.style.display = 'none'
    }
  }

  function openFilter (opener) {
    if (opener.classList.contains('active')) {
      closeFilter(opener)
    } else {
      const oldOpen = trialTile.querySelector(".trial-tile__filter-top.active")
      if (oldOpen) oldOpen.classList.remove('active')
      opener.classList.add('active')
    }
  }

  function closeFilter (opener) {
    opener.classList.remove('active')
    for (let i = 0; i < openers.length; i++) {
      const wrap = openers[i].nextElementSibling
      const items = wrap.querySelectorAll(["input:checked"])
      let result = ''
      items.forEach((item, i) => {
        if (i > 0) result += '|'
        result += item.value
      })
      console.log(result)
    }
  }

}
