const reviewsTile = document.querySelector('.reviews-tile')

if (reviewsTile) reviewsTileInit()

function reviewsTileInit () {
  const config = { attributes: false, childList: true, characterData: true, subtree: false }
  const body = document.querySelector('body')
  const sidebar = reviewsTile.querySelector('.reviews-tile__sidebar')
  const openFilterBtn = reviewsTile.querySelector('.reviews-tile__filter')
  const closeFilterBtn = reviewsTile.querySelector('.reviews-tile__close')
  const inputs = reviewsTile.querySelectorAll('.reviews-tile__input')
  const filterNote = reviewsTile.querySelector('.reviews-tile__filter-note')
  const scrollTopBtn = document.querySelector('.reviews-tile__scroll-top')
  const reviewsTileCards = document.querySelector('.reviews-tile__cards')

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
      if (texts[i].clientHeight > 230 && window.innerWidth >= 1440 || texts[i].clientHeight > 190 && window.innerWidth >= 744 && window.innerWidth < 1440 || texts[i].clientHeight > 350 && window.innerWidth < 744) {
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

  async function makeFiltration (attr_type = '', attr_utm = '',p_paginate = 1) {
    if (typeof attr_type !== 'undefined' && attr_type !== false &&
      typeof attr_utm !== 'undefined' && attr_utm !== false) {
      if (typeof p_paginate == 'undefined' || p_paginate == false || p_paginate == null){
        p_paginate = 1;
      }
      console.log(attr_type);
      console.log(attr_utm);
      console.log(p_paginate);
      $.request('ModelUrl::onPaginateR', {
        data: {
          'pagePaginate': p_paginate,
          'utm_t': attr_utm,
          'type': attr_type,
        }
      });
    }
  }

  function sort () {
    closeFilters()
    filterNote.innerHTML = this.value
    let utm_f = reviewsTile.getAttribute('data-utm');
    let attr_type = this.getAttribute('data-value');
    let p_paginate = this.getAttribute('data-v');
    if(p_paginate > 1){
      $('.review___more_pagi').html("<div class='tile-loader'></div>");
    }else{
      $('.review___catalog_pagi').html("<div class='tile-loader'></div>");
      $('.review___more_pagi').html("");
    }
    makeFiltration (attr_type, utm_f, p_paginate);

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

  observer.observe(reviewsTileCards, config)

  function videoInit () {
    const videoBoxes = reviewsTile.querySelectorAll('.reviews-tile__video-box')

    for (let i = 0; i < videoBoxes.length; i++) {
      videoBoxes[i].addEventListener('click', playVideo)
    }

    function playVideo () {

        const oldActive = reviewsTile.querySelector('.reviews-tile__video-box.active')
        if (oldActive) {
          const video = oldActive.parentElement.querySelector('video')
          oldActive.classList.remove('active')
          video.pause()
        }

      this.classList.add('active')
      const that = this
      const video = this.parentElement.querySelector('video')
      if (video) {
        video.play()
        // video.addEventListener('pause', () => that.classList.remove('active'))
      }
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
