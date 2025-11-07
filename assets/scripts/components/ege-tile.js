const egeTileFilter = document.querySelector(".ege-tile__filter")

if (egeTileFilter) egeTileFilterInit()

function egeTileFilterInit () {
  const egeTileFilterTop = egeTileFilter.querySelector(".ege-tile__filter-top")
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')

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

  const config = { attributes: true, childList: true, characterData: true, subtree: true }
  const egeTile = document.querySelector('.ege-tile')
  const tile = egeTile.querySelector('.all-courses__tile')
  const classInputs = egeTile.querySelectorAll('.ege-tile__tab-input_class')
  const subjectInputs = egeTile.querySelectorAll('.ege-tile__filter-input_subject')
  const subjectInputText = egeTile.querySelector('.ege-tile__filter-top-text')

  const observer = new MutationObserver(function() {
    moreBtnInit()
    togglePrice()
    buttonDataHrefLinksInit()
    dataRedirect()
  })

  if (tile) togglePrice()

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

  if (tile) dataRedirect()

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


  if (tile) observer.observe(tile, config)

  const reset = egeTile.querySelector('.ege-tile__reset-filter')
  if (reset) reset.addEventListener('click', resetFilters)

  function resetFilters () {
    const items = egeTile.querySelectorAll("input")
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
    const moreBtn = egeTile.querySelector('.all-courses__more-button')
    if (moreBtn) moreBtn.addEventListener('click', () => makeFiltration(moreBtn.getAttribute('data-v')))
  }

  function updateFilter () {
    const itemsAll = egeTile.querySelectorAll(["input:checked"])
    if (itemsAll.length) {
      if (reset) reset.style.display = 'flex'
    } else {
      if (reset) reset.style.display = 'none'
    }
    makeFiltration()
  }

  function makeFiltration (p_paginate = 1) {
    const grades_items = egeTile.querySelectorAll('.ege-tile__tab-input_class:checked')
    let grades_result = ''
    let grade_first = 0
    grades_items.forEach((item, i) => {
      if (i > 0) grades_result += '|'
      if (grade_first == 0) grade_first = item.value
      grades_result += item.value
    })
    let subjects_result = ''
    try{
      const subjects_items = egeTile.querySelectorAll('.ege-tile__filter-input_subject:checked')
      subjects_items.forEach((item, i) => {
        if (i > 0) subjects_result += '|'
        subjects_result += item.value
      })
    }catch(e){}

    let utm_f = tile?.getAttribute('data-utm');
    let promo_f = tile?.getAttribute('data-promo');
    let oge_ege_type = tile?.getAttribute('data-oge-ege');

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
