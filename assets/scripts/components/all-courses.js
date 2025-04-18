const allCourses = document.querySelector('.all-courses')

if (allCourses) allCoursesInit()

function allCoursesInit () {
  const openers = allCourses.querySelectorAll("[data-element='all-courses-filter-opener']")
  const filterSubjectBox = allCourses.querySelector(".all-courses__filter.all-courses__filter_subject")
  const filterClassBox = allCourses.querySelector(".all-courses__filter.all-courses__filter_class")

  for (let i = 0; i < openers.length; i++) {
    openers[i].addEventListener("click", (e)=> openFilter(openers[i], e))

    const wrap = openers[i].nextElementSibling
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
  }

  async function updateFilter (opener, wrap, noScroll) {
    if(opener.getAttribute('data-ftype') === 'class_select') {
      await makeFiltration()
      filterSubjectBox.classList.remove('disable')
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
    const oldOpen = allCourses.querySelector(".all-courses__filter-top.active")
    if (oldOpen) oldOpen.classList.remove('active')
  }

  function closeFilter (opener) {
    opener.classList.remove('active')
    const filter = opener.parentElement
    if (filter) filter.classList.remove('open')
  }

  function scrollToTile () {

  }

  async function makeFiltration () {

  }
}
