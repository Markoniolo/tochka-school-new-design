const educatorTile = document.querySelector('.educator-tile')

if (educatorTile) educatorTileInit()

function educatorTileInit () {
  const config = { attributes: true, childList: true, characterData: true, subtree: true }

  const observer = new MutationObserver(function() {
    moreBtnInit()
    togglePrice()
    buttonDataHrefLinksInit()
    dataRedirect()
  })

  togglePrice()

  function togglePrice () {
    const items = educatorTile.querySelectorAll(".all-courses__item")
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
    const dataRedirectLinks = educatorTile.querySelectorAll('[data-redirect]')

    for (let i = 0; i < dataRedirectLinks.length; i++) {
      dataRedirectLinks[i].addEventListener('click', dataRedirect)
    }

    function dataRedirect (e) {
      e.preventDefault()
      window.open(this.href, '_blank');
    }
  }


  observer.observe(educatorTile, config)

  moreBtnInit()

  function moreBtnInit () {
    const moreBtn = educatorTile.querySelector('.all-courses__more-button')
    if (moreBtn) moreBtn.addEventListener('click', () => makeFiltration(moreBtn.getAttribute('data-v')))
  }

  function makeFiltration (p_paginate = 1) {

    let utm_f = educatorTile.getAttribute('data-utm');
    let promo_f = educatorTile.getAttribute('data-promo');
    let oge_ege_type = educatorTile.getAttribute('data-oge-ege');

    if(p_paginate === 1 ){
      $('.filtered_elements').html("<div class='tile-loader'></div>");
      $('.more_b').html("");
    }

    var obData = {
      'utm_t': utm_f,
      'promo': promo_f,
      'oge_ege_type': oge_ege_type,
      'pagePaginate': p_paginate,
    };
    $.request('DirectionFunctions::onPaginateAllCourses', {
      data: obData
    })
  }
}
