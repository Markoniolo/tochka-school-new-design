const enrichTile = document.getElementById("enrich-tile")

if (enrichTile) enrichTileInit()

function enrichTileInit () {
  if (window.location.href.includes('#enrich-tile')) {
    window.addEventListener('load', function() {
      let offset
      if (window.innerWidth < 744) {
        offset = 60
      } else if (window.innerWidth < 1200) {
        offset = 80
      } else {
        offset = 80
      }
      console.log(enrichTile.getBoundingClientRect().top + window.scrollY - offset)
      window.scrollTo({
        top: enrichTile.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      })
    }, { once: true })
  }

  const enrichTileFilterTops = enrichTile.querySelectorAll(".offer-tile__filter-top")
  const filterSubject = enrichTile.querySelector(".offer-tile__filter_subject")
  const filterClass = enrichTile.querySelector(".offer-tile__filter_class")
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')

  enrichTileFilterTops[0].addEventListener("click", (e)=> openFilter(enrichTileFilterTops[0], e))
  enrichTileFilterTops[1].addEventListener("click", (e)=> openFilter(enrichTileFilterTops[1], e))

  document.addEventListener('click', function () {
    enrichTileFilterTops[0].classList.remove('active')
    enrichTileFilterTops[1].classList.remove('active')
    showHeader()
  })

  function openFilter (opener, e) {
    e.stopPropagation()
    if (!opener.classList.contains('active')) {
      const oldActive = enrichTile.querySelector('.offer-tile__filter-top.active')
      if (oldActive) oldActive.classList.remove('active')
      const oldActiveFilter = enrichTile.querySelector('.offer-tile__filter.active')
      if (oldActiveFilter) oldActiveFilter.classList.remove('active')
    }
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
  const tile = enrichTile.querySelector('.all-courses__tile')
  const classInputs = enrichTile.querySelectorAll('.offer-tile__filter-input_class')
  const classInputText = enrichTile.querySelector('.offer-tile__filter_class .offer-tile__filter-top-text')
  const subjectInputs = enrichTile.querySelectorAll('.offer-tile__filter-input_subject')
  const subjectInputText = enrichTile.querySelector('.offer-tile__filter_subject .offer-tile__filter-top-text')

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

  const reset = enrichTile.querySelector('.offer-tile__reset-filter')
  if (reset) reset.addEventListener('click', resetFilters)

  function resetFilters () {
    const items = enrichTile.querySelectorAll("input")
    items.forEach((item) => {
      if (item.hasAttribute('data-default-garde') || item.hasAttribute('data-default-subject')) {
        item.checked = true
      }else{
        item.checked = false
      }
    })
    reset.style.display = 'none'
    classInputText.innerHTML = "Все классы"
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
    const moreBtn = enrichTile.querySelector('.all-courses__more-button')
    if (moreBtn) moreBtn.addEventListener('click', () => makeFiltration(moreBtn.getAttribute('data-v')))
  }

  function updateFilter () {
    const itemsAll = enrichTile.querySelectorAll(["input:checked"])
    if (itemsAll.length) {
      if (reset) reset.style.display = 'flex'
    } else {
      if (reset) reset.style.display = 'none'
    }
    makeFiltration()
  }

  function makeFiltration (p_paginate = 1) {
    const grades_items = enrichTile.querySelectorAll('.offer-tile__filter-input_class:checked')
    let grades_result = ''
    let grade_first = 0
    grades_items.forEach((item, i) => {
      if (i > 0) grades_result += '|'
      if (grade_first == 0) grade_first = item.value
      grades_result += item.value
    })
    let subjects_result = ''
    try{
      const subjects_items = enrichTile.querySelectorAll('.offer-tile__filter-input_subject:checked')
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

  initTabs()

  function initTabs () {
    const tabsParent = filterSubject.querySelector('.offer-tile__filter-tabs')
    const tabs = filterSubject.querySelectorAll('.offer-tile__filter-tab')
    const subjects = filterSubject.querySelectorAll('.offer-tile__filter-item')

    if (!tabs.length || !subjects.length) return

    tabs.forEach((tab) => {
      tab.addEventListener('click', changeTab)

      function changeTab (e) {
        e.stopPropagation()
        const oldTab = filterSubject.querySelector('.offer-tile__filter-tab.active')
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
