const libraryCap = document.querySelector('.library-cap')

if (libraryCap) libraryCapInit()

function libraryCapInit () {
  const libraryTile = document.querySelector('.library-tile')
  const libraryWhy = document.querySelector('.library-why')
  const libraryInformer = document.querySelector('.library-informer')
  const config = { attributes: false, childList: true, characterData: true, subtree: true }
  const openers = libraryCap.querySelectorAll("[data-element='library-cap-filter-opener']")
  const grades = libraryCap.querySelector("[data-ftype='class_select']")
  const subjects = libraryCap.querySelector("[data-ftype='class_subjects']")
  const filterSubjectBox = libraryCap.querySelector(".library-cap__filter.library-cap__filter_subject")
  const filterSubjectsList = libraryCap.querySelector(".library-cap__filter-list.class_subjects")
  const filterClassBox = libraryCap.querySelector(".library-cap__filter.library-cap__filter_class")
  const tile = document.querySelector('.library-tile')

  const title = document.querySelector('.library-tile__title')
  const urlFilter = libraryCap.getAttribute('data-item-h')
  const h1Filter = libraryCap.getAttribute('data-hname')
  const metaName = libraryCap.getAttribute('data-meta_name')
  const metaDescription = libraryCap.getAttribute('data-meta_descr')
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')

  const observer = new MutationObserver(function() {
    const wrap = openers[1].nextElementSibling
    const items = wrap.querySelectorAll("[data-element='library-cap-filter-input']")
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[1], wrap))
    })
  })

  initTabs()

  const observerPoster = new MutationObserver(function() {
    initLibraryPosters()
    initTabs()
  })

  observerPoster.observe(tile, config)

  const save = libraryCap.querySelector(".library-cap__button")
  if (save) save.addEventListener('click', saveHandler)

  function saveHandler () {
    let valid = true
    for (let i = 0; i < openers.length; i++) {
      const wrap = openers[i].nextElementSibling
      const itemChecked = wrap.querySelector(["input:checked"])
      if (!itemChecked) {
        valid = false
        openers[i].classList.add('error')
        setError()
      }
    }

    if (valid) {
      makeFiltration()
      scrollToTile()
    }
  }

  const subjectWrap =  libraryCap.querySelector('.library-cap__filter.library-cap__filter_subject .library-cap__filter-wrap')
  const simpleBar = new SimpleBar(document.querySelector('.library-cap__filter-scroll'))
  const node = simpleBar.getScrollElement()
  const icon = libraryCap.querySelector('.library-cap__filter-icon')
  const labels = subjectWrap.querySelectorAll('.library-cap__filter-item')
  if (labels.length < 7 && icon) icon.remove()
  if (node) {
    node.addEventListener('scroll', function () {
      if (icon) icon.remove()
      if (node.scrollTop > 10) {
        subjectWrap.classList.add('show-top-gradient')
      } else {
        subjectWrap.classList.remove('show-top-gradient')
      }
    })
  }

  const reset = libraryCap.querySelector("[data-element='library-cap-filter-reset']")
  if (reset) reset.addEventListener('click', resetFilters)

  function resetFilters () {
    filterSubjectBox.classList.add('disable')
    for (let i = 0; i < openers.length; i++) {
      const wrap = openers[i].nextElementSibling
      const items = wrap.querySelectorAll("[data-element='library-cap-filter-input']")
      items.forEach((item) => {
        item.checked = false
      })
      updateFilter(openers[i], wrap, true, true)
    }
    makeFiltration()
    hideBlocks()
  }

  async function makeFiltration () {
    const grades_wrap = grades.nextElementSibling
    const grades_items = grades_wrap.querySelectorAll(["input:checked"])
    let grades_result = ''
    let grade_first = 0
    let grade_h1_part= ''
    let grade_item = ''
    grades_items.forEach((item, i) => {
      if (i > 0) grades_result += '|'
      if (grade_first == 0) grade_first = item.value
      if (grade_item === '') grade_item = item.getAttribute('data-item')
      if (grade_h1_part === '') grade_h1_part = item.getAttribute('data-hname')
      grades_result += item.value
    })
    let subjects_result = ''
    let subject_item = ''
    let subject_h1_part= ''
    try{
      const subjects_wrap = subjects.nextElementSibling
      const subjects_items = subjects_wrap.querySelectorAll(["input:checked"])
      subjects_items.forEach((item, i) => {
        if (i > 0) subjects_result += '|'
        subjects_result += item.value
        if (subject_item === '') subject_item = item.getAttribute('data-item')
        if (subject_h1_part === '') subject_h1_part = item.getAttribute('data-hname')
      })
    }catch(e){}
    let utm_f = libraryCap.getAttribute('data-utm');
    $('.filtered_elements').html("<div class='tile-loader'></div>");
    $.request('VideoCourseFunctions::onPaginateAllCourses', {
      data: {
        'grade': grades_result,
        'subject': subjects_result,
        'utm_t': utm_f
      }
    })
    if (grade_first > 0 && urlFilter){
      // let url = new URL(window.location.href)
      // url.searchParams.set('gr', grade_first);

      let url = urlFilter
      if (grade_item !== "") {
        url = url + '/' + grade_item
        if (subject_item !== "") {
          url = url + '/' + subject_item
        }

      }


      url = url + utm_f

      history.replaceState(null, "", url.toString())

      if (urlFilter && h1Filter && metaName && metaDescription) {
        let new_h1 = 'Уроки'
        let new_title = metaName
        let new_description = metaDescription

        if (subject_h1_part !== "") {
          new_h1 = new_h1 + ' по '+ subject_h1_part
        }else{
        }
        if (grade_h1_part !== "") {
          new_h1 = new_h1 + ' для ' + grade_h1_part
        }else{
        }
        if (new_h1 === 'Уроки' ){
          new_h1 = h1Filter
        }

        title.innerHTML = new_h1
        document.title = new_title
        const meta= document.getElementsByTagName("meta")
        for (let i= 0; i < meta.length; i++) {
          if (meta[i].name.toLowerCase() === "description") {
            meta[i].content = new_description
          }
        }
      }
    } else if (urlFilter) {
      let url = urlFilter
      url = url + utm_f
      history.replaceState(null, "", url.toString())
    }
    initLibraryPosters()
    // }

  }

  function scrollToTile () {
    showBlocks()
    const banner = document.querySelector('.discount')
    const bannerHeight = banner ? banner.clientHeight : 0
    const theElement = document.getElementById('library-tile')
    let offset
    if (window.innerWidth < 744) {
      offset = 84 + bannerHeight
    } else if (window.innerWidth < 1200) {
      offset = 102 + bannerHeight
    } else {
      offset = 120 + bannerHeight
    }
    window.scrollTo(0, theElement.getBoundingClientRect().top + scrollY - offset)
  }

  function showBlocks () {
    if (libraryTile) libraryTile.classList.remove('hide')
    if (libraryWhy) libraryWhy.classList.remove('hide')
    if (libraryInformer) libraryInformer.classList.remove('hide')
  }

  function hideBlocks () {
    if (libraryTile) libraryTile.classList.add('hide')
    if (libraryWhy) libraryWhy.classList.add('hide')
    if (libraryInformer) libraryInformer.classList.add('hide')
  }

  for (let i = 0; i < openers.length; i++) {
    openers[i].addEventListener("click", (e)=> openFilter(openers[i], e))

    const wrap = openers[i].nextElementSibling
    const items = wrap.querySelectorAll("[data-element='library-cap-filter-input']")
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[i], wrap))
    })
    if (i === 1) {
      window.onload = function() {
        observer.observe(wrap, config)
      }
    }
  }

  function openFilter (opener, e) {
    e.stopPropagation()
    if (opener.parentElement.classList.contains('library-cap__filter_subject') && !filterClassBox.querySelector(["input:checked"])) {
      setError()
    } else {
      resetError()
      if (opener.classList.contains('active')) {
        closeFilter(opener)
      } else {
        const oldOpen = libraryCap.querySelector(".library-cap__filter-top.active")
        if (oldOpen) oldOpen.classList.remove('active')
        opener.classList.add('active')

        const filter = opener.parentElement
        const oldFilter = libraryCap.querySelector(".library-cap__filter.open")
        if (oldFilter) oldFilter.classList.remove('open')
        if (filter) filter.classList.add('open')

        stickyHeader.classList.add('mob-hide')
        body.classList.add('no-scroll-mob')
      }
    }
  }

  window.addEventListener('click', closeAllFilters)

  function closeAllFilters () {
    const oldOpen = libraryCap.querySelector(".library-cap__filter-top.active")
    if (oldOpen) oldOpen.classList.remove('active')
    stickyHeader.classList.remove('mob-hide')
    body.classList.remove('no-scroll-mob')
  }

  function closeFilter (opener) {
    opener.classList.remove('active')
    const filter = opener.parentElement
    if (filter) filter.classList.remove('open')
    stickyHeader.classList.remove('mob-hide')
    body.classList.remove('no-scroll-mob')
  }

  async function updateFilter (opener, wrap, noScroll, noFiltration) {
    resetError()
    if(opener.getAttribute('data-ftype') === 'class_select') {
      filterSubjectsList.innerHTML = "<div class='tile-loader-box'><div class='tile-loader'></div></div>";
      //    makeFiltration()
      updateFilter(openers[1], openers[1].nextElementSibling, true)
      if (!noFiltration) updateFilter(openers[1], openers[1].nextElementSibling, true)
    } else {
      if (!noFiltration) makeFiltration()
      if (!noScroll) scrollToTile()
    }
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
    const itemsAll = libraryCap.querySelectorAll(["input:checked"])
    if (itemsAll.length) {
      if (reset) reset.classList.add('show')
    } else {
      if (reset) reset.classList.remove('show')
    }
    closeFilter(opener)
  }

  initLibraryPosters()

  function setError () {
    openers[0].parentElement.classList.add('library-cap__filter_error')
    openers[1].parentElement.classList.add('library-cap__filter_error')
  }

  function resetError () {
    openers[0].parentElement.classList.remove('library-cap__filter_error')
    openers[1].parentElement.classList.remove('library-cap__filter_error')
  }

  function initTabs () {
    const tabs = tile.querySelectorAll('.library-tile__tab')
    if (!tabs.length) return

    const items = tile.querySelectorAll('.library-tile__item')

    for (let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', tabFiltration)
    }

    function tabFiltration () {
      const oldActive = document.querySelector('.library-tile__tab.active')
      if (oldActive) oldActive.classList.remove('active')
      this.classList.add('active')
      for (let i = 0; i < items.length; i++) {
        items[i].style.display = 'none'
      }
      const dataIndex = this.getAttribute('data-index')
      const filteredItems = tile.querySelectorAll('[data-index="' + dataIndex + '"]')
      for (let i = 0; i < filteredItems.length; i++) {
        filteredItems[i].style.display = 'flex'
      }
    }
  }
}

initLibraryPosters()

function initLibraryPosters () {
  const videoBoxes = document.querySelectorAll('.library-tile__video-box')
  for (let i = 0; i < videoBoxes.length; i++) {
    videoBoxes[i].addEventListener('click', function () {
      videoBoxes[i].classList.add('active')
      const iframe = videoBoxes[i].querySelector('iframe')
      iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1')
    })
  }
}
