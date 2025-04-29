const allCourses = document.querySelector('.all-courses')

if (allCourses) allCoursesInit()

function allCoursesInit () {
  const config = { attributes: false, childList: true, characterData: true, subtree: true }

  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')

  const urlFilter = allCourses.getAttribute('data-item-h')
  const h1Filter = allCourses.getAttribute('data-hname')
  const metaNameFilter = allCourses.getAttribute('data-meta_name')
  const metaDescriptionFilter = allCourses.getAttribute('data-meta_descr')



  const openers = allCourses.querySelectorAll("[data-element='all-courses-filter-opener']")
  const filterh1block = allCourses.querySelector(".all-courses_h1")
  const filterSubjectsList = allCourses.querySelector(".class_subjects")
  const filterClassBox = allCourses.querySelector(".all-courses__filter.all-courses__filter_class")
  const filterSubjectWrap = allCourses.querySelector(".all-courses__filter-wrap_subject")
  const filterTagWrap = allCourses.querySelector(".all-courses__filter-wrap_tag")
  const findBtn = allCourses.querySelector('.all-courses__find')
  const moreBtn = allCourses.querySelector('.filter_more_b')
  const reset = false
  const grades = allCourses.querySelector("[data-ftype='class_select']")
  const subjects = allCourses.querySelector("[data-ftype='class_subjects']")
  const tags = allCourses.querySelector("[data-ftype='class_tags']")
  const tile = document.querySelector('.all-courses__tile')

  moreBtnInit()


  function moreBtnInit () {
    if (moreBtn) moreBtn.addEventListener('click', () => makeFiltration(moreBtn.getAttribute('data-v')))
  }

  const observer = new MutationObserver(function() {
    togglePrice()
    moreBtnInit()
  })

  observer.observe(tile, config)

  togglePrice()

  function togglePrice () {
    const items = tile.querySelectorAll(".all-courses__item")
    items.forEach((item) => {
      const toggle = item.querySelectorAll('.all-courses__radio-input')
      if (!toggle.length) return
      const boxes = item.querySelectorAll('.all-courses__box')
      for (let i = 0; i < toggle.length; i++) {
        toggle[i].addEventListener('change', toggleBoxes)
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
    })
  }

  const observerSubject = new MutationObserver(function() {
    initTabs()
    const items = filterSubjectWrap.querySelectorAll("[data-element='all-courses-filter-input']")
    const wrap = openers[1].nextElementSibling
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[1], wrap))
    })
  })
  observerSubject.observe(filterSubjectWrap, config)

  const observerTag = new MutationObserver(function() {
    const items = filterTagWrap.querySelectorAll("[data-element='all-courses-filter-input']")
    const wrap = openers[1].nextElementSibling
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[1], wrap))
    })
  })
  observerTag.observe(filterTagWrap, config)

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
    if(opener.getAttribute('data-ftype') === 'class_select' || opener.getAttribute('data-ftype') === 'class_tags') {
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

  async function makeFiltration (p_paginate = 1) {
    const grades_wrap = grades.nextElementSibling
    const grades_items = grades_wrap.querySelectorAll(["input:checked"])
    let grades_result = ''
    let grade_first = 0
    let grade_item = ''
    let grade_h1_part= ''
    grades_items.forEach((item, i) => {
      if (i > 0) grades_result += '|'
      if (grade_first == 0) grade_first = item.value
      if (grade_item === '') grade_item = item.getAttribute('data-item')
      if (grade_h1_part === '') grade_h1_part = item.getAttribute('data-hname')
      grades_result += item.value
    })
    let subjects_result = ''
    let subject_first = 0
    let subject_item = ''
    let subject_h1_part= ''
    try{
      const subjects_wrap = subjects.nextElementSibling
      const subjects_items = subjects_wrap.querySelectorAll(["input:checked"])
      subjects_items.forEach((item, i) => {
        if (i > 0) subjects_result += '|'
        if (subject_first == 0) subject_first = item.value
        if (subject_item === '') subject_item = item.getAttribute('data-item')
        if (subject_h1_part === '') subject_h1_part = item.getAttribute('data-hname')
        subjects_result += item.value
      })
    }catch(e){}
    let tags_result = ''
    let tag_first = 0
    let tag_item = ''
    let tag_h1_part= ''
    try{
      const tags_wrap = tags.nextElementSibling
      const tags_items = tags_wrap.querySelectorAll(["input:checked"])
      tags_items.forEach((item, i) => {
        if (i > 0) tags_result += '|'
        if (tag_first == 0) tag_first = item.value
        if (tag_item === '') tag_item = item.getAttribute('data-item')
        if (tag_h1_part === '') tag_h1_part = item.getAttribute('data-hname')
        tags_result += item.value
      })
    }catch(e){}
    let utm_f = allCourses.getAttribute('data-utm');
    $('.filtered_elements').html("<div class='tile-loader'></div>");
    let promo_f = '';
    let promo_ = allCourses.getAttribute('data-promo');
    if(promo_ != null && promo_ != '' && promo_ != undefined){
      promo_f = promo_;
    }
    if(p_paginate > 1 && grade_item === '' && grade_h1_part === '' && subject_item === '' && subject_h1_part === ''){
      grades_result = 'all'
      subjects_result = 'all'
      tags_result = ''
    }
    var obData = {
      'grade': grades_result,
      'subject': subjects_result,
      'tag': tags_result,
      'utm_t': utm_f,
      'promo': promo_f,
      'pagePaginate': p_paginate,
    };
    console.log(obData);
    $.request('FilterCourseFunctions::onPaginateAllCourses', {
      data: obData
    })
    //  let url = new URL(window.location.href)
    let url = urlFilter
    //  let useFilterReplaceState = false
    //  if (grade_first > 0){
    //    url.searchParams.set('gr', grade_first);
    //    useFilterReplaceState = true
    //  }
    //  if (subject_first > 0){
    //    url.searchParams.set('subject', subject_first);
    //    useFilterReplaceState = true
    //  }
    //  if (tag_first > 0){
    //    url.searchParams.set('tag', tag_first);
    //    useFilterReplaceState = true
    //  }
    //  if (useFilterReplaceState === true) history.replaceState(null, "", url.toString())
    if (subject_item !== "") {
      url = url + '/' + subject_item
      if (grade_item !== "") {
        url = url + '/' + grade_item
        if (tag_item !== "") url = url + '/' + tag_item

      }else{
        url = urlFilter
      }
    }
    history.replaceState(null, "", url.toString())
    let new_h1 = h1Filter
    let new_title = metaNameFilter
    let new_description = metaDescriptionFilter
    if (subject_h1_part !== "") {
      new_h1 = 'Курсы по '+ subject_h1_part
      if (grade_h1_part !== "") {
        new_h1 = new_h1 + ' для ' + grade_h1_part
        if (tag_h1_part !== "") new_h1 = new_h1 + ', чтобы ' + tag_h1_part
      }
      new_title = new_h1 + 'в онлайн-школе «Точка Знаний»'
      new_description = new_h1 + 'в онлайн-школе «Точка Знаний». ✔️ Интересные и понятные онлайн-занятия с преподавателями. ✔️ Персональный тьютор. ✔️ Подготовка к ЕГЭ, ОГЭ и ВПР. ✔️ Учитесь в удобном темпе, все курсы доступны в записи!'


    }

    filterh1block.textContent = new_h1

    document.title = new_title
    const meta= document.getElementsByTagName("meta")
    for (let i= 0; i < meta.length; i++) {
      if (meta[i].name.toLowerCase() === "description") {
        meta[i].content = new_description
      }
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
