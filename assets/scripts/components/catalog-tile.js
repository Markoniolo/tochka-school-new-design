const catalogTile = document.querySelector(".catalog-tile")

if (catalogTile) catalogTileInit()

function catalogTileInit () {
  const catalogTileFilterTops = catalogTile.querySelectorAll(".catalog-tile__filter-top")
  const filterSubject = catalogTile.querySelector(".catalog-tile__filter_subject")
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')

  catalogTileFilterTops[0].addEventListener("click", (e)=> openFilter(catalogTileFilterTops[0], e))

  document.addEventListener('click', function () {
    catalogTileFilterTops[0].classList.remove('active')
    showHeader()
  })

  function openFilter (opener, e) {
    e.stopPropagation()
    if (opener.classList.contains('active')) {
      opener.classList.remove('active')
      showHeader()
      opener.parentElement.classList.remove('active')
    } else {
      opener.classList.add('active')
      opener.parentElement.classList.add('active')
      hideHeader()
    }
  }

  function showHeader () {
    stickyHeader.classList.remove('mob-hide')
    body.classList.remove('no-scroll-mob')
  }

  function hideHeader () {
    stickyHeader.classList.add('mob-hide')
    body.classList.add('no-scroll-mob')
  }

  const config = { attributes: true, childList: true, characterData: true, subtree: true }
  const tile = catalogTile.querySelector('.catalog-tile__list')
  const subjectInputs = catalogTile.querySelectorAll('.catalog-tile__filter-input_subject')
  const subjectInputText = catalogTile.querySelector('.catalog-tile__filter_subject .catalog-tile__filter-top-text')

  const observer = new MutationObserver(function() {
    moreBtnInit()
    buttonDataHrefLinksInit()
    dataRedirect()
  })

  buttonDataHrefLinksInit()

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

  const reset = catalogTile.querySelector('.catalog-tile__reset-filter')
  if (reset) reset.addEventListener('click', resetFilters)

  function resetFilters () {
    const items = catalogTile.querySelectorAll("input")
    items.forEach((item) => {
      if (item.hasAttribute('data-default-garde') || item.hasAttribute('data-default-subject')) {
        item.checked = true
      }else{
        item.checked = false
      }
    })
    reset.style.display = 'none'
    subjectInputText.innerHTML = "Все предметы"
    makeFiltration()
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
    const moreBtn = catalogTile.querySelector('.all-courses__more-button')
    if (moreBtn) moreBtn.addEventListener('click', () => makeFiltration(moreBtn.getAttribute('data-v')))
  }

  function updateFilter () {
    const itemsAll = catalogTile.querySelectorAll(["input:checked"])
    if (itemsAll.length) {
      if (reset) reset.style.display = 'flex'
    } else {
      if (reset) reset.style.display = 'none'
    }
    makeFiltration()
  }

  function makeFiltration (p_paginate = 1) {
    let subjects_result = ''
    try{
      const subjects_items = catalogTile.querySelectorAll('.catalog-tile__filter-input_subject:checked')
      subjects_items.forEach((item, i) => {
        if (i > 0) subjects_result += '|'
        subjects_result += item.value
      })
    }catch(e){}

    let utm_f = tile.getAttribute('data-utm');
    let promo_f = tile.getAttribute('data-promo');

    if(p_paginate === 1 ){
      $('.filtered_elements').html("<div class='tile-loader'></div>");
      $('.more_b').html("");
    }

    var obData = {
      'subject': subjects_result,
      'utm_t': utm_f,
      'promo': promo_f,
      'pagePaginate': p_paginate,
    };
    $.request('DirectionFunctions::onPaginateAllCourses', {
      data: obData
    })
  }

  initTabs()

  function initTabs () {
    const tabsParent = filterSubject.querySelector('.catalog-tile__filter-tabs')
    const tabs = filterSubject.querySelectorAll('.catalog-tile__filter-tab')
    const subjects = filterSubject.querySelectorAll('.catalog-tile__filter-item')

    if (!tabs.length || !subjects.length) return

    tabs.forEach((tab) => {
      tab.addEventListener('click', changeTab)

      function changeTab (e) {
        e.stopPropagation()
        const oldTab = filterSubject.querySelector('.catalog-tile__filter-tab.active')
        if (oldTab) oldTab.classList.remove('active')

        this.classList.add('active')

        subjects.forEach((subject) => {
          subject.classList.add('hide')
        })

        const index = this.getAttribute('data-index')
        const activeSubjects = filterSubject.querySelectorAll('[data-index="' + index + '"]')
        activeSubjects.forEach((subject) => {
          subject.classList.remove('hide')
        })

        tabsParent.scrollLeft = this.offsetLeft - tabsParent.clientWidth/2 + this.clientWidth/2
      }
    })

    tabs[0].click()
  }

}
