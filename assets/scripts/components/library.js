const libraryCap = document.querySelector('.library-cap')

if (libraryCap) libraryCapInit()

function libraryCapInit () {
  const config = { attributes: true, childList: true, characterData: true, subtree: true }
  const openers = libraryCap.querySelectorAll("[data-element='library-cap-filter-opener']")
  const grades = libraryCap.querySelector("[data-ftype='class_select']")
  const subjects = libraryCap.querySelector("[data-ftype='class_subjects']")

  const observer = new MutationObserver(function() {
    const wrap = openers[1].nextElementSibling
    const items = wrap.querySelectorAll("[data-element='library-cap-filter-input']")
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[1], wrap))
    })
  })

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
      }
    }

    if (valid) {
      makeFiltration()
      scrollToTile()
    }
  }

  const reset = libraryCap.querySelector("[data-element='library-cap-filter-reset']")
  if (reset) reset.addEventListener('click', resetFilters)

  function resetFilters () {
    for (let i = 0; i < openers.length; i++) {
      const wrap = openers[i].nextElementSibling
      const items = wrap.querySelectorAll("[data-element='library-cap-filter-input']")
      items.forEach((item) => {
        item.checked = false
      })
      updateFilter(openers[i], wrap)
    }
    makeFiltration()
  }

  function makeFiltration () {
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
    let utm_f = libraryCap.getAttribute('data-utm');
    $('.filtered_elements').html("<div class='tile-loader'></div>");
    $.request('VideoCourseFunctions::onPaginateAllCourses', {
      data: {
        'grade': grades_result,
        'subject': subjects_result,
        'utm_t': utm_f
      }
    })
    if (grade_first > 0){
      let url = new URL(window.location.href)
      url.searchParams.set('gr', grade_first);
      history.replaceState(null, "", url.toString())
    }
    // }
  }

  function scrollToTile () {
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

  for (let i = 0; i < openers.length; i++) {
    openers[i].addEventListener("click", ()=> openFilter(openers[i]))

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

  function openFilter (opener) {
    opener.classList.remove('error')
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
    }
  }

  function closeFilter (opener) {
    opener.classList.remove('active')
    const filter = opener.parentElement
    if (filter) filter.classList.remove('open')
  }

  function updateFilter (opener, wrap) {
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


}
