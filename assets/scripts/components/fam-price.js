const famPrice = document.querySelector('.fam-price')

if (famPrice) famPriceInit()

function famPriceInit () {
  const tabs = famPrice.querySelectorAll('.fam-price__tab')
  const slides = famPrice.querySelectorAll('.fam-price__slide')

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', toggleSlide)
  }

  function toggleSlide () {
    const oldTabActive = famPrice.querySelector('.fam-price__tab.active')
    if (oldTabActive) oldTabActive.classList.remove('active')
    this.classList.add('active')

    const oldActiveSlide = famPrice.querySelector('.fam-price__slide.active')
    if (oldActiveSlide) oldActiveSlide.classList.remove('active')

    const newSlide = slides[this.getAttribute('data-id')]
    newSlide.classList.add('active')
  }

  const famPriceLists = famPrice.querySelectorAll('.fam-price__list')

  for (let i = 0; i < famPriceLists.length; i++) {
    const list = famPriceLists[i]
    const items = list.querySelectorAll('.fam-price__item')
    const btn = list.querySelector('.fam-price__more')

    if (items.length > 8) {
      btn.style.display = 'flex'
      btn.addEventListener('click', toggleList)
      hideList()
    }

    function hideList () {
      list.classList.remove('active')
      for (let j = items.length - 1; j > 7; j--) {
        items[j].style.display = 'none'
      }
      btn.innerHTML = `Показать ещё +${items.length - 8}`
    }

    function showList () {
      list.classList.add('active')
      for (let j = items.length - 1; j > 7; j--) {
        items[j].style.display = 'flex'
      }
      btn.innerHTML = `Свернуть`
    }

    function toggleList () {
      if (list.classList.contains('active')) {
        hideList()
      } else {
        showList()
      }
    }
  }

  const tile = famPrice.querySelector('.fam-price__slides')

  togglePrice()

  function togglePrice () {
    const items = tile?.querySelectorAll(".all-courses__item")
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
}
