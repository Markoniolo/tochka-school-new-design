const langsTile = document.querySelector(".langs-tile")

if (langsTile) langsTileInit()

function langsTileInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')

  const config = { attributes: true, childList: true, characterData: true, subtree: true }
  const subjectInputs = langsTile.querySelectorAll('.langs-tile__filter-input_subject')

  const observer = new MutationObserver(function() {
    moreBtnInit()
    togglePrice()
    buttonDataHrefLinksInit()
    dataRedirect()
  })

  togglePrice()

  function togglePrice () {
    const items = langsTile.querySelectorAll(".all-courses__item")
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

  dataRedirect()

  function dataRedirect () {
    const dataRedirectLinks = langsTile.querySelectorAll('[data-redirect]')

    for (let i = 0; i < dataRedirectLinks.length; i++) {
      dataRedirectLinks[i].addEventListener('click', dataRedirect)
    }

    function dataRedirect (e) {
      e.preventDefault()
      window.open(this.href, '_blank');
    }
  }


  observer.observe(langsTile, config)

  for (let i = 0; i < subjectInputs.length; i++) {
    subjectInputs[i].addEventListener('change', updateFilter)
  }

  moreBtnInit()

  function moreBtnInit () {
    const moreBtn = langsTile.querySelector('.all-courses__more-button')
    if (moreBtn) moreBtn.addEventListener('click', () => makeFiltration(moreBtn.getAttribute('data-v')))
  }

  function updateFilter () {
    makeFiltration()
  }

  function makeFiltration (p_paginate = 1) {
    let subjects_result = ''
    try{
      const subjects_items = langsTile.querySelectorAll('.langs-tile__filter-input_subject:checked')
      subjects_items.forEach((item, i) => {
        if (i > 0) subjects_result += '|'
        subjects_result += item.value
      })
    }catch(e){}

    let utm_f = langsTile.getAttribute('data-utm');
    let promo_f = langsTile.getAttribute('data-promo');
    let oge_ege_type = langsTile.getAttribute('data-oge-ege');

    if(p_paginate === 1 ){
      $('.filtered_elements').html("<div class='tile-loader'></div>");
      $('.more_b').html("");
    }

    var obData = {
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
