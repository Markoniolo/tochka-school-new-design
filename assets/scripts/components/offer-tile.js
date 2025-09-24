const offerTile = document.getElementById("offer-tile")

if (offerTile) offerTileInit()

function offerTileInit () {
  const offerTileFilterTops = offerTile.querySelectorAll(".offer-tile__filter-top")
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')

  offerTileFilterTops[0].addEventListener("click", (e)=> openFilter(offerTileFilterTops[0], e))
  offerTileFilterTops[1].addEventListener("click", (e)=> openFilter(offerTileFilterTops[1], e))

  document.addEventListener('click', function () {
    offerTileFilterTops[0].classList.remove('active')
    offerTileFilterTops[1].classList.remove('active')
    showHeader()
  })

  function openFilter (opener, e) {
    e.stopPropagation()
    if (!opener.classList.contains('active')) {
      const oldActive = offerTile.querySelector('.offer-tile__filter-top.active')
      if (oldActive) oldActive.classList.remove('active')
    }
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

  const config = { attributes: true, childList: true, characterData: true, subtree: true }
  const tile = offerTile.querySelector('.offer-tile__tile')
  const classInputs = offerTile.querySelectorAll('.offer-tile__filter-input_class')
  const classInputText = offerTile.querySelector('.offer-tile__filter_class .offer-tile__filter-top-text')
  const subjectInputs = offerTile.querySelectorAll('.offer-tile__filter-input_subject')
  const subjectInputText = offerTile.querySelector('.offer-tile__filter_subject .offer-tile__filter-top-text')

  const observer = new MutationObserver(function() {
    moreBtnInit()
    buttonDataHrefLinksInit()
    dataRedirect()
  })

  buttonDataHrefLinksInit()

  function buttonDataHrefLinksInit() {
    const buttonDataHrefLinks = document.querySelectorAll('button[data-href-link]')
    for (let i = 0; i < buttonDataHrefLinks.length; i++) {
      buttonDataHrefLinks[i].addEventListener('click', function (e) {
        e.preventDefault()
        window.open(this.getAttribute('data-href-link'), '_blank')
      })
    }
  }

  dataRedirect()

  function dataRedirect () {
    const dataRedirectLinks = tile.querySelectorAll('[data-redirect]')

    for (let i = 0; i < dataRedirectLinks.length; i++) {
      dataRedirectLinks[i].addEventListener('click', dataRedirect)
    }

    function dataRedirect (e) {
      e.preventDefault()
      window.open(this.href, '_blank');
    }
  }


  observer.observe(tile, config)

  const reset = offerTile.querySelector('.offer-tile__reset-filter')
  if (reset) reset.addEventListener('click', resetFilters)

  function resetFilters () {
    const items = offerTile.querySelectorAll("input")
    items.forEach((item) => {
      if (item.hasAttribute('data-default-garde')) {
        item.checked = true
      }else{
        item.checked = false
      }
    })
    reset.style.display = 'none'
    subjectInputText.innerHTML = "Все предметы"
    makeFiltration();
  }

  for (let i = 0; i < classInputs.length; i++) {
    classInputs[i].addEventListener('change', updateFilter)
    classInputs[i].addEventListener('change', changeClassInputText)
  }

  function changeClassInputText () {
    classInputText.innerHTML = this.getAttribute('data-text')
  }

  for (let i = 0; i < subjectInputs.length; i++) {
    subjectInputs[i].addEventListener('change', updateFilter)
    subjectInputs[i].addEventListener('change', changeSubjectInputText)
  }

  function changeSubjectInputText () {
    subjectInputText.innerHTML = this.getAttribute('data-text')
  }

  moreBtnInit()

  function moreBtnInit () {
    const moreBtn = offerTile.querySelector('.all-courses__more-button')
    if (moreBtn) moreBtn.addEventListener('click', () => makeFiltration(moreBtn.getAttribute('data-v')))
  }

  function updateFilter () {
    const itemsAll = offerTile.querySelectorAll(["input:checked"])
    if (itemsAll.length) {
      if (reset) reset.style.display = 'flex'
    } else {
      if (reset) reset.style.display = 'none'
    }
    makeFiltration()
  }

  function makeFiltration (p_paginate = 1) {
    const grades_items = offerTile.querySelectorAll('.offer-tile__filter-input_class:checked')
    let grades_result = ''
    let grade_first = 0
    grades_items.forEach((item, i) => {
      if (i > 0) grades_result += '|'
      if (grade_first == 0) grade_first = item.value
      grades_result += item.value
    })
    let subjects_result = ''
    try{
      const subjects_items = offerTile.querySelectorAll('.offer-tile__filter-input_subject:checked')
      subjects_items.forEach((item, i) => {
        if (i > 0) subjects_result += '|'
        subjects_result += item.value
      })
    }catch(e){}

    let utm_f = tile.getAttribute('data-utm');
    let promo_f = tile.getAttribute('data-promo');
    let oge_ege_type = tile.getAttribute('data-oge-ege');

    if(p_paginate === 1 ){
      $('.filtered_elements').html("<div class='tile-loader'></div>");
      $('.more_b').html("");
    }

    var obData = {
      'grade': grades_result,
      'subject': subjects_result,
      'utm_t': utm_f,
      'promo': promo_f,
      'oge_ege_type': oge_ege_type,
      'pagePaginate': p_paginate,
    };
    $.request('DirectionFunctions::onPaginateAllCourses', {
      data: obData
    })
    // if (grade_first > 0){
    //   let url = new URL(window.location.href)
    //   url.searchParams.set('gr', grade_first);
    //   history.replaceState(null, "", url.toString())
    // }
    // }
  }
}
