const allCourses = document.querySelector('.all-courses')

if (allCourses) allCoursesInit()

function allCoursesInit () {
  const config = { attributes: false, childList: true, characterData: true, subtree: true }

  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')
  const openers = allCourses.querySelectorAll("[data-element='all-courses-filter-opener']")
  const filterSubjectsList = allCourses.querySelector(".class_subjects")
  const filterClassBox = allCourses.querySelector(".all-courses__filter.all-courses__filter_class")
  const filterSubjectWrap = allCourses.querySelector(".all-courses__filter-wrap_subject")
  const findBtn = allCourses.querySelector('.all-courses__find')
  const reset = false
  const grades = allCourses.querySelector("[data-ftype='class_select']")
  const subjects = allCourses.querySelector("[data-ftype='class_subjects']")
  const tile = document.querySelector('.all-courses__tile')

  const observer = new MutationObserver(function() {
    togglePrice()
  })

  observer.observe(tile, config)

  togglePrice()

  function togglePrice () {
    const items = tile.querySelectorAll(".all-courses__item")
    items.forEach((item) => {
      const toggle = item.querySelector('.all-courses__toggle-checkbox')
      if (!toggle) return
      const boxes = item.querySelectorAll('.all-courses__box')
      toggle.addEventListener('change', toggleBoxes)

      function toggleBoxes () {
        for (let i = 0; i < boxes.length; i++) {
          if (boxes[i].classList.contains('hide')) {
            boxes[i].classList.remove('hide')
          } else {
            boxes[i].classList.add('hide')
          }
        }
      }
    })
  }

  const observerSubject = new MutationObserver(function() {
    initTabs()
    const items = filterSubjectWrap.querySelectorAll("[data-element='all-courses-filter-input']")
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[1], wrap))
    })
  })
  observerSubject.observe(filterSubjectWrap, config)
  initTabs()

  function initTabs () {
    const tabs = filterSubjectWrap.querySelectorAll('.all-courses__filter-tab')
    const subjects = filterSubjectWrap.querySelectorAll('.all-courses__filter-item')

    if (!tabs.length || !subjects.length) return

    tabs.forEach((tab) => {
      tab.addEventListener('click', changeTab)

      function changeTab (e) {
        e.stopPropagation()
        const oldTab = filterSubjectWrap.querySelector('.all-courses__filter-tab.active')
        if (oldTab) oldTab.classList.remove('active')

        this.classList.add('active')

        subjects.forEach((subject) => {
          subject.classList.add('hide')
        })

        const index = this.getAttribute('data-index')
        const activeSubjects = filterSubjectWrap.querySelectorAll('[data-index="' + index + '"]')
        activeSubjects.forEach((subject) => {
          subject.classList.remove('hide')
        })
      }
    })

    tabs[0].click()
  }

  findBtn.addEventListener('click', findHandler)

  function findHandler () {
    let valid = true
    for (let i = 0; i < openers.length; i++) {
      const wrap = openers[i].nextElementSibling
      const itemChecked = wrap.querySelector(["input:checked"])
      if (!itemChecked) {
        valid = false
        setError()
      }
    }

    if (valid) {
      makeFiltration()
      scrollToTile()
    }
  }

  for (let i = 0; i < openers.length; i++) {
    openers[i].addEventListener("click", (e)=> openFilter(openers[i], e))

    const wrap = openers[i].nextElementSibling

    const closeBtn = wrap.querySelector('.all-courses__filter-close')
    if (closeBtn) closeBtn.addEventListener('click', () => closeFilter(openers[i]))

    const items = wrap.querySelectorAll("[data-element='all-courses-filter-input']")
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[i], wrap))
    })
  }

  function openFilter (opener, e) {
    e.stopPropagation()
    if (opener.parentElement.classList.contains('all-courses__filter_subject') && !filterClassBox.querySelector(["input:checked"])) {
      setError()
    } else {
      resetError()
      if (opener.classList.contains('active')) {
        closeFilter(opener)
      } else {
        const oldOpen = allCourses.querySelector(".all-courses__filter-top.active")
        if (oldOpen) oldOpen.classList.remove('active')
        opener.classList.add('active')

        const filter = opener.parentElement
        const oldFilter = allCourses.querySelector(".all-courses__filter.open")
        if (oldFilter) oldFilter.classList.remove('open')
        if (filter) filter.classList.add('open')
      }
    }
    hideHeader()
  }

  async function updateFilter (opener, wrap, noScroll) {
    resetError()
    if(opener.getAttribute('data-ftype') === 'class_select') {
      filterSubjectsList.innerHTML = "<div class='tile-loader-box'><div class='tile-loader'></div></div>";
      makeFiltration()
      updateFilter(openers[1], openers[1].nextElementSibling, true)
    } else {
      makeFiltration()
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
    const itemsAll = allCourses.querySelectorAll(["input:checked"])
    if (itemsAll.length) {
      if (reset) reset.classList.add('show')
    } else {
      if (reset) reset.classList.remove('show')
    }
    closeFilter(opener)
  }

  function setError () {
    openers[0].parentElement.classList.add('all-courses__filter_error')
    openers[1].parentElement.classList.add('all-courses__filter_error')
  }

  function resetError () {
    openers[0].parentElement.classList.remove('all-courses__filter_error')
    openers[1].parentElement.classList.remove('all-courses__filter_error')
  }

  window.addEventListener('click', closeAllFilters)

  function closeAllFilters () {
    if (window.innerWidth >= 744) {
      const oldOpen = allCourses.querySelector(".all-courses__filter-top.active")
      if (oldOpen) oldOpen.classList.remove('active')
      showHeader()
    }
  }

  function closeFilter (opener) {
    opener.classList.remove('active')
    const filter = opener.parentElement
    if (filter) filter.classList.remove('open')
    showHeader()
  }

  function scrollToTile () {

  }

  async function makeFiltration () {
    const grades_wrap = grades.nextElementSibling
    const grades_items = grades_wrap.querySelectorAll(["input:checked"])
    let grades_result = ''
    let grade_first = 0
    grades_items.forEach((item, i) => {
      if (i > 0) grades_result += '|'
      if (grade_first == 0) grade_first = item.value
      grades_result += item.value
    })
    let subjects_result = ''
    try{
      const subjects_wrap = subjects.nextElementSibling
      const subjects_items = subjects_wrap.querySelectorAll(["input:checked"])
      subjects_items.forEach((item, i) => {
        if (i > 0) subjects_result += '|'
        subjects_result += item.value
      })
    }catch(e){}
    let utm_f = allCourses.getAttribute('data-utm');
    $('.filtered_elements').html("<div class='tile-loader'></div>");
    // $.request('VideoCourseFunctions::onPaginateAllCourses', {
    //   data: {
    //     'grade': grades_result,
    //     'subject': subjects_result,
    //     'utm_t': utm_f
    //   }
    // })
    if (grade_first > 0){
      let url = new URL(window.location.href)
      url.searchParams.set('gr', grade_first);
      history.replaceState(null, "", url.toString())
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
}
