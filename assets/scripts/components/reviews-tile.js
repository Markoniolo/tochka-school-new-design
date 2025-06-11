const reviewsTile = document.querySelector('.reviews-tile')

if (reviewsTile) reviewsTileInit()

function reviewsTileInit () {
  const config = { attributes: false, childList: true, characterData: true, subtree: false }
  const body = document.querySelector('body')
  const sidebar = reviewsTile.querySelector('.reviews-tile__sidebar')
  const openFilterBtn = reviewsTile.querySelector('.reviews-tile__filter')
  const closeFilterBtn = reviewsTile.querySelector('.reviews-tile__close')
  const inputs = reviewsTile.querySelectorAll('.reviews-tile__input')
  const reviewsTileWrap = reviewsTile.querySelector('.reviews-tile__wrap')
  const filterNote = reviewsTile.querySelector('.reviews-tile__filter-note')
  const scrollTopBtn = document.querySelector('.reviews-tile__scroll-top')

  openFilterBtn.addEventListener('click', openFilters)
  closeFilterBtn.addEventListener('click', closeFilters)

  function openFilters () {
    sidebar.classList.add('active')
    body.classList.add('no-scroll')
  }

  function closeFilters () {
    sidebar.classList.remove('active')
    body.classList.remove('no-scroll')
  }

  function textsInit () {
    const texts = document.querySelectorAll('.reviews-tile__text')

    for (let i = 0; i < texts.length; i++) {
      const toggle = texts[i].parentElement.querySelector('.reviews-tile__toggle')
      if (texts[i].clientHeight > 230 && window.innerWidth >= 1440 || texts[i].clientHeight > 190 && window.innerWidth >= 744 || texts[i].clientHeight > 350 && window.innerWidth < 744) {
        texts[i].classList.add('hide')
        toggle.addEventListener('click', () => toggleText(texts[i]))
      } else {
        toggle.style.display = 'none'
      }
    }

    function toggleText (text) {
      const toggle = text.parentElement.querySelector('.reviews-tile__toggle')
      if (text.classList.contains('hide')) {
        text.classList.remove('hide')
        console.log(text)
        toggle.innerHTML = 'Скрыть'
      } else {
        text.classList.add('hide')
        toggle.innerHTML = 'Показать полностью'
      }
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', sort)
  }

  function sort () {
    closeFilters()
    filterNote.innerHTML = this.value
    console.log('sort')
  }

  function moreBtnInit () {
    const moreBtn = reviewsTile.querySelector('.reviews-tile__more')
    if (moreBtn) moreBtn.addEventListener('click', sort)
  }

  videoInit()
  textsInit()
  moreBtnInit()

  const observer = new MutationObserver(function() {
    videoInit()
    textsInit()
    moreBtnInit()
  })

  observer.observe(reviewsTileWrap, config)

  function videoInit () {
    const videoBoxes = reviewsTile.querySelectorAll('.reviews-tile__video-box')

    for (let i = 0; i < videoBoxes.length; i++) {
      videoBoxes[i].addEventListener('click', playVideo)
    }

    function playVideo () {
      this.classList.add('active')
      const video = this.parentElement.querySelector('video')
      if (video) video.play()
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
    window.addEventListener('scroll', toggleAllCoursesTop, { passive: true })

    function toggleAllCoursesTop () {
      if (window.scrollY > 0) {
        scrollTopBtn.classList.add('active')
      } else {
        scrollTopBtn.classList.remove('active')
      }
    }
  }
}
