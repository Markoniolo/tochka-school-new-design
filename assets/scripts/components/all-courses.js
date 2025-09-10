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
  const reset = allCourses.querySelector('.all-courses__reset')
  const grades = allCourses.querySelector("[data-ftype='class_select']")
  const subjects = allCourses.querySelector("[data-ftype='class_subjects']")
  const tags = allCourses.querySelector("[data-ftype='class_tags']")
  const tile = document.querySelector('.all-courses__tile')

  let timerReload = setTimeout(() => window.location.reload(), 300000)

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


  if (reset) reset.addEventListener('click', resetFilters)

  function resetFilters () {
    for (let i = 0; i < openers.length; i++) {
      const wrap = openers[i].nextElementSibling
      const items = wrap.querySelectorAll("input")
      items.forEach((item) => {
        item.checked = false
      })
      updateFilter(openers[i], wrap, false, true)
    }
    makeFiltration(1, true)
    if (reset) reset.classList.remove('active')
  }

  function resetFilter (opener) {
    const wrap = opener.nextElementSibling
    const items = wrap.querySelectorAll("input")
    items.forEach((item) => {
      item.checked = false
    })
    updateFilter(opener, wrap)
  }

  moreBtnInit()


  function moreBtnInit () {
    const moreBtn = allCourses.querySelector('.all-courses__more-button')
    if (moreBtn) moreBtn.addEventListener('click', () => makeFiltration(moreBtn.getAttribute('data-v')))
  }

  const observer = new MutationObserver(function() {
    togglePrice()
    moreBtnInit()
    buttonDataHrefLinksInit()
    dataRedirect()
  })

  observer.observe(tile, config)

  dataRedirect()

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

  togglePrice()

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

//    const observerSubject = new MutationObserver(function() {
//      initTabs()
//      const items = filterSubjectWrap.querySelectorAll("[data-element='all-courses-filter-input']")
//      const wrap = openers[1].nextElementSibling
//      items.forEach((item) => {
//        item.addEventListener('change', () => updateFilter(openers[1], wrap))
//      })
//    })
//    observerSubject.observe(filterSubjectWrap, config)

//    const observerTag = new MutationObserver(function() {
//      const items = filterTagWrap.querySelectorAll("[data-element='all-courses-filter-input']")
//      const wrap = openers[1].nextElementSibling
//      items.forEach((item) => {
//        item.addEventListener('change', () => updateFilter(openers[1], wrap))
//      })
//    })
//    observerTag.observe(filterTagWrap, config)

  initTabs()

  function initTabs () {
    const tabsParent = filterSubjectWrap.querySelector('.all-courses__filter-tabs')
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

        tabsParent.scrollLeft = this.offsetLeft - tabsParent.clientWidth/2 + this.clientWidth/2
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
      if (!itemChecked) valid = false
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

    const resetFilterBtn = wrap.querySelector('.all-courses__reset-filter')
    if (resetFilterBtn) resetFilterBtn.addEventListener('click', () => resetFilter(openers[i]))
  }

  function openFilter (opener, e) {
    e.stopPropagation()
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
    hideHeader()
  }

  async function updateFilter (opener, wrap, noScroll, noFiltration) {
    if(opener.getAttribute('data-ftype') === 'class_select' || opener.getAttribute('data-ftype') === 'class_tags') {
      //filterSubjectsList.innerHTML = "<div class='tile-loader-box'><div class='tile-loader'></div></div>";
      if (!noFiltration) makeFiltration()
      //    updateFilter(openers[1], openers[1].nextElementSibling, true)
    } else {
      if (!noFiltration) makeFiltration()
      if (!noScroll) scrollToTile()
    }
    opener.innerHTML = opener.getAttribute('data-default-text')
    const resetFilterBtn = wrap.querySelector('.all-courses__reset-filter')
    const item = wrap.querySelector(["input:checked"])
    if (item) {
      opener.innerHTML = ''
      span = document.createElement('span')
      span.innerHTML = item.nextElementSibling.innerHTML
      opener.append(span)
      if (resetFilterBtn) resetFilterBtn.classList.add('active')
    } else {
      if (resetFilterBtn) resetFilterBtn.classList.remove('active')
    }
    const itemsAll = allCourses.querySelectorAll(["input:checked"])
    if (itemsAll.length) {
      if (reset) reset.classList.add('active')
    } else {
      if (reset) reset.classList.remove('active')
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

  async function makeFiltration (p_paginate = 1, isReset = false) {
    clearTimeout(timerReload)
    timerReload = setTimeout(() => window.location.reload(), 300000)
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
    if(utm_f != null && utm_f != '' && utm_f != undefined){
    }else{
      utm_f = ''
    }
    if(p_paginate === 1 ){
      $('.filtered_elements').html("<div class='tile-loader'></div>");
      $('.more_b').html("");
    }
    let promo_f = '';
    let promo_f_param = '';
    let promo_ = allCourses.getAttribute('data-promo');
    if(promo_ != null && promo_ != '' && promo_ != undefined){
      promo_f = promo_;
      promo_f_param = '?promo='+promo_f;
    }
    if(grade_item === '' && grade_h1_part === ''){
      grades_result = 'all'
    }
    if(subject_item === '' && subject_h1_part === ''){
      subjects_result = 'all'
      //tags_result = ''
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
    }
    if (grade_item !== "") {
      if (subject_item !== "") {
      }else{
        url = url + '/all'
      }
      url = url + '/' + grade_item
    }
    if (tag_item !== "") {
      if (grade_item !== "") {
      }else{
        if (subject_item !== "") {
        }else{
          url = url + '/all'
        }
        url = url + '/all'
      }
      url = url + '/' + tag_item
    }
    url = url + utm_f
    history.replaceState(null, "", url.toString())
    let new_h1 = h1Filter
    let new_title = metaNameFilter
    let new_description = metaDescriptionFilter

    new_h1 = 'Курсы'
    const tagPurposeChecked = allCourses.querySelector('.all-courses__filter_purpose input:checked')
    let special
    if (tagPurposeChecked) special = tagPurposeChecked.getAttribute('data-special') === "special"
    if(special){
      new_h1 = 'Семейное онлайн-обучение'
    }
    if (subject_h1_part !== "" && !special) {
      new_h1 = new_h1 + ' по '+ subject_h1_part
    }else{
    }
    if (grade_h1_part !== "") {
      new_h1 = new_h1 + ' для ' + grade_h1_part
    }else{
    }
    if (tag_h1_part !== "") {
      new_h1 = new_h1 + ', чтобы ' + tag_h1_part
    }
    if (new_h1 === 'Курсы' || new_h1 === 'Семейное онлайн-обучение'){
      new_h1 = h1Filter
    }


    if(special){
      new_title = new_h1 + ' в «Точке Знаний»'
      new_description = new_h1 + ' в «Точке Знаний». ✔️ Интересные и понятные онлайн-занятия с преподавателями. ✔️ Персональный тьютор. ✔️ Подготовка к ЕГЭ, ОГЭ и ВПР. ✔️ Учитесь в удобном темпе, все курсы доступны в записи!'
    }else{
      new_title = new_h1 + ' в онлайн-школе «Точка Знаний»'
      new_description = new_h1 + ' в онлайн-школе «Точка Знаний». ✔️ Интересные и понятные онлайн-занятия с преподавателями. ✔️ Персональный тьютор. ✔️ Подготовка к ЕГЭ, ОГЭ и ВПР. ✔️ Учитесь в удобном темпе, все курсы доступны в записи!'
    }



    if (isReset) {
      filterh1block.innerHTML = new_h1 + `<svg viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="21" cy="21" r="21" fill="#6683C2" fill-opacity="0.24"></circle><path d="M20.25 29C20.25 29.4142 20.5858 29.75 21 29.75C21.4142 29.75 21.75 29.4142 21.75 29L21 29L20.25 29ZM21.5303 12.4697C21.2374 12.1768 20.7626 12.1768 20.4697 12.4697L15.6967 17.2426C15.4038 17.5355 15.4038 18.0104 15.6967 18.3033C15.9896 18.5962 16.4645 18.5962 16.7574 18.3033L21 14.0607L25.2426 18.3033C25.5355 18.5962 26.0104 18.5962 26.3033 18.3033C26.5962 18.0104 26.5962 17.5355 26.3033 17.2426L21.5303 12.4697ZM21 29L21.75 29L21.75 13L21 13L20.25 13L20.25 29L21 29Z" fill="#003C56"></path></svg>`
    } else {
      filterh1block.textContent = new_h1
    }

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

  const allCoursesTop = document.querySelector('.all-courses__top')
  const promo = document.querySelector('.promo')

  if (allCoursesTop) {
    allCoursesTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
    if (promo) allCoursesTop.classList.add('active-promo')
    window.addEventListener('scroll', toggleAllCoursesTop, { passive: true })

    function toggleAllCoursesTop () {
      if (window.scrollY > 0) {
        allCoursesTop.classList.add('active')
      } else {
        allCoursesTop.classList.remove('active')
      }
    }
  }
}
