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
    makeFiltration()
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
  })

  observer.observe(tile, config)

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

  async function makeFiltration (p_paginate = 1) {
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

const articleSidebarDesc = document.querySelector('.article__sidebar_desc')

if (articleSidebarDesc) articleSidebarDescInit()

function articleSidebarDescInit () {
  const articleLinkArray = articleSidebarDesc.querySelectorAll('.article__link')
  const articleTitleArray = document.querySelectorAll('.article__title')

  window.addEventListener('scroll', checkScroll, { passive: true })

  function checkScroll () {
    for (let i = articleTitleArray.length - 1; i > -1; i--) {
      if (articleTitleArray[i].getBoundingClientRect().top < 300) {
        removeOldLinkActive()
        articleLinkArray[i].classList.add('active')
        break
      } else {
        articleLinkArray[i].classList.remove('active')
      }
    }
  }

  function removeOldLinkActive () {
    const oldActive = articleSidebarDesc.querySelector('.article__link.active')
    if (oldActive) oldActive.classList.remove('active')
  }
}

const articleSidebarMob = document.querySelector('.article__sidebar_mob')

if (articleSidebarMob) articleSidebarMobInit()

function articleSidebarMobInit () {
  const name = articleSidebarMob.querySelector('.article__name')
  const layer = articleSidebarMob.querySelector('.article__layer')

  window.addEventListener('scroll', togglePosition, {passive: true})
  let lastScrollTop = 0;
  function togglePosition () {
    let st = window.scrollY
    if (st > lastScrollTop) {
      articleSidebarMob.classList.remove('fixed')
    } else if (st < lastScrollTop) {
      articleSidebarMob.classList.add('fixed')
    }
    lastScrollTop = st <= 0 ? 0 : st
  }

  name.addEventListener('click', toggleSidebar)
  layer.addEventListener('click', closeSidebar)

  function toggleSidebar () {
    if (name.classList.contains('active')) {
      closeSidebar()
    } else {
      window.removeEventListener('scroll', togglePosition)
      name.classList.add('active')
    }
  }

  function closeSidebar () {
    name.classList.remove('active')
    window.addEventListener('scroll', togglePosition, {passive: true})
  }

  const articleLinkArray = articleSidebarMob.querySelectorAll('.article__link')

  for (let i = 0; i < articleLinkArray.length; i++) {
    articleLinkArray[i].addEventListener('click', toggleLinkActive)
  }

  function toggleLinkActive () {
    const oldActive = articleSidebarMob.querySelector('.article__link.active')
    if (oldActive) oldActive.classList.remove('active')
    this.classList.add('active')
    name.classList.remove('active')
    articleSidebarMob.classList.remove('fixed')
    window.addEventListener('scroll', togglePosition, {passive: true})
  }
}

const articleVideoBoxArray = document.querySelectorAll("[data-element='article__video-box']")

if (articleVideoBoxArray.length) articleVideoBoxArrayInit()

function articleVideoBoxArrayInit () {
  for (let i = 0; i < articleVideoBoxArray.length; i++) {
    articleVideoBoxArray[i].addEventListener('click', () => articleVideoBoxInit(articleVideoBoxArray[i]), { once: true })
  }

  function articleVideoBoxInit (box) {
    const video = box.querySelector('video')
    video.controls = true
    box.classList.add('active')
  }
}

const btnFixed = document.querySelector('[data-element="btn-fixed"]')

if (btnFixed) btnFixedInit()

function btnFixedInit () {
  const start = btnFixed.getAttribute('data-btn-fixed-start')
  const end = btnFixed.getAttribute('data-btn-fixed-end')
  const body = document.getElementsByTagName('body')[0]
  const promo = document.querySelector('.promo')
  window.addEventListener('scroll', checkBtnFixed, { passive: true })

  function checkBtnFixed () {
    if (window.scrollY > start && body.scrollHeight - window.pageYOffset > end && !checkBtnFixedHide()) {
      btnFixed.classList.add('active')
      if (promo) promo.classList.add('transition')
    } else {
      btnFixed.classList.remove('active')
      if (promo) promo.classList.remove('transition')
    }
  }

  const sectionsWhenBtnHide = document.querySelectorAll('[data-btn-fixed-hide="true"]')

  function checkBtnFixedHide () {
    let isHide = false
    for (let i = 0; i < sectionsWhenBtnHide.length; i++) {
      if (elementInViewport(sectionsWhenBtnHide[i])) isHide = true
    }
    return isHide
  }

  function elementInViewport(el) {
    let top = el.offsetTop
    let left = el.offsetLeft
    let width = el.offsetWidth
    let height = el.offsetHeight

    while(el.offsetParent) {
      el = el.offsetParent
      top += el.offsetTop
      left += el.offsetLeft
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    )
  }
}

function setViewportProperty() {
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

window.addEventListener('resize', setViewportProperty)

setViewportProperty()

const cards = document.querySelector("[data-element='cards']")

if (cards) cardsInit()

function cardsInit () {
  const cardsBoxes = cards.querySelectorAll("[data-element='cards-box']")

  cardsBoxes.forEach((box) => {
    box.addEventListener('click', toggleBox)
  })

  function toggleBox () {
    const oldActive = cards.querySelector('.active')
    if (oldActive) oldActive.classList.remove('active')
    this.classList.add('active')
  }
}

const costAreas = document.querySelectorAll('.cost__area')

if (costAreas.length) costAreasInit()

function costAreasInit () {
  for (let i = 0; i < costAreas.length; i++) {
    costAreaInit(costAreas[i])
  }

  function costAreaInit (area) {
    const checkbox = area.querySelector('.cost__checkbox')
    if (!checkbox) return

    checkbox.addEventListener('change', changePrice)
    checkbox.addEventListener('change', changeHref)

    const button = area.querySelector('.cost__button')
    const newHref = checkbox.getAttribute('new-href')
    const initialHref = button.getAttribute('href')

    function changeHref () {
      const href = button.getAttribute('href')
      if (href === newHref) {
        button.setAttribute('href', initialHref)
      } else {
        button.setAttribute('href', newHref)
      }
    }

    const price_full_old_checkbox_off = checkbox.getAttribute('data-price-full-old-checkbox-off')
    const price_full_old_checkbox_on = checkbox.getAttribute('data-price-full-old-checkbox-on')
    const price_full_current_checkbox_off = checkbox.getAttribute('data-price-full-current-checkbox-off')
    const price_full_current_checkbox_on = checkbox.getAttribute('data-price-full-current-checkbox-on')
    const price_plan_old_checkbox_off = checkbox.getAttribute('data-price-plan-old-checkbox-off')
    const price_plan_old_checkbox_on = checkbox.getAttribute('data-price-plan-old-checkbox-on')
    const price_plan_current_checkbox_off = checkbox.getAttribute('data-price-plan-current-checkbox-off')
    const price_plan_current_checkbox_on = checkbox.getAttribute('data-price-plan-current-checkbox-on')

    const priceFullCurrentNode = area.querySelector('[data-element="price-full-current"]')
    const priceFullOldNode = area.querySelector('[data-element="price-full-old"]')
    const pricePlanCurrentNode = area.querySelector('[data-element="price-plan-current"]')
    const pricePlanOldNode = area.querySelector('[data-element="price-plan-old"]')

    function changePrice () {
      if (this.checked) {
        if (priceFullCurrentNode) priceFullCurrentNode.innerHTML = price_full_current_checkbox_on
        if (priceFullOldNode) priceFullOldNode.innerHTML = price_full_old_checkbox_on
        if (pricePlanCurrentNode) pricePlanCurrentNode.innerHTML = price_plan_current_checkbox_on
        if (pricePlanOldNode) pricePlanOldNode.innerHTML = price_plan_old_checkbox_on
      }
      else {
        if (priceFullCurrentNode) priceFullCurrentNode.innerHTML = price_full_current_checkbox_off
        if (priceFullOldNode) priceFullOldNode.innerHTML = price_full_old_checkbox_off
        if (pricePlanCurrentNode) pricePlanCurrentNode.innerHTML = price_plan_current_checkbox_off
        if (pricePlanOldNode) pricePlanOldNode.innerHTML = price_plan_old_checkbox_off
      }
    }
  }
}

const courseAboutVideo = document.querySelector("[data-element='course-about-video']")

if (courseAboutVideo) courseAboutVideoInit()

function courseAboutVideoInit () {
  const videoWrap = document.querySelector("[data-element='course-about-video-wrap']")
  const soundBtn = document.querySelector(".course-about__sound")
  let startPlayTime = courseAboutVideo.getAttribute('data-play-start')
  if (!startPlayTime) startPlayTime = 0

  try {
    courseAboutVideo.currentTime = startPlayTime
  } catch (e) {
    console.log(e)
  }

  courseAboutVideo.addEventListener('loadeddata', videoLoaded)

  function videoLoaded () {
    videoWrap.classList.add('loaded')
  }

  videoWrap.addEventListener('click', playVideo)

  function playVideo (e) {
    e.stopPropagation()
    if (courseAboutVideo.muted) {
      courseAboutVideo.muted = false
      courseAboutVideo.loop = false
      courseAboutVideo.currentTime = 0
      courseAboutVideo.controls = true
      soundBtn.classList.add('hide')
      setTimeout(() => courseAboutVideo.play(), 100)
    } else {
      courseAboutVideo.muted = true
      courseAboutVideo.controls = false
      soundBtn.classList.remove('hide')
    }
  }
}

const selectArray = document.querySelectorAll('[data-role="custom-select"]')

for (let i = 0; i < selectArray.length; i++) {
  customSelect(selectArray[i])
}

const discount = document.querySelector('[data-element="discount"]')

if (discount) discountInit()

function discountInit () {
  const close = document.querySelector('[data-element="discount__close"]')
  close.addEventListener('click', removeDiscount)

  function removeDiscount (e) {
    e.preventDefault()
    discount.remove()
  }
}

const famDoc = document.querySelector('.fam-doc')

if (famDoc) famDocInit()

function famDocInit () {
  const toggle = famDoc.querySelector('.fam-doc__button')
  toggle.addEventListener('click', toggleDoc)

  function toggleDoc () {
    if (famDoc.classList.contains('open')) {
      famDoc.classList.remove('open')
      toggle.innerHTML = 'Открыть расписание аттестации'
    } else {
      famDoc.classList.add('open')
      toggle.innerHTML = 'Скрыть расписание аттестации'
    }
  }
}

const famPrice = document.querySelector('.fam-price')

if (famPrice) famPriceInit()

function famPriceInit () {
  const tabs = famPrice.querySelectorAll('.fam-price__tab')
  const slides = famPrice.querySelectorAll('.fam-price__slide')

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', toggleSlide)
  }

  function toggleSlide () {
    const oldTabActive = famPrice.querySelector('.fam-price__tab.active')
    if (oldTabActive) oldTabActive.classList.remove('active')
    this.classList.add('active')

    const oldActiveSlide = famPrice.querySelector('.fam-price__slide.active')
    if (oldActiveSlide) oldActiveSlide.classList.remove('active')

    const newSlide = slides[this.getAttribute('data-id')]
    newSlide.classList.add('active')
  }

  const famPriceLists = famPrice.querySelectorAll('.fam-price__list')

  for (let i = 0; i < famPriceLists.length; i++) {
    const list = famPriceLists[i]
    const items = list.querySelectorAll('.fam-price__item')
    const btn = list.querySelector('.fam-price__more')

    if (items.length > 8) {
      btn.style.display = 'flex'
      btn.addEventListener('click', toggleList)
      hideList()
    }

    function hideList () {
      list.classList.remove('active')
      for (let j = items.length - 1; j > 7; j--) {
        items[j].style.display = 'none'
      }
      btn.innerHTML = `Показать ещё +${items.length - 8}`
    }

    function showList () {
      list.classList.add('active')
      for (let j = items.length - 1; j > 7; j--) {
        items[j].style.display = 'flex'
      }
      btn.innerHTML = `Свернуть`
    }

    function toggleList () {
      if (list.classList.contains('active')) {
        hideList()
      } else {
        showList()
      }
    }
  }

  const tile = famPrice.querySelector('.fam-price__slides')

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
}

const familyHowSlider = document.querySelector('[data-element="family-how-slider"]')

if (familyHowSlider) familyHowSliderInit()

function familyHowSliderInit () {
  let familyHowSliderSwiper

  function initSlider () {
    familyHowSliderSwiper = new Swiper(familyHowSlider, {
      slidesPerView: 'auto',
      spaceBetween: 40,
      a11y: false,
      navigation: {
        nextEl: '.family-how__nav-btn_next',
        prevEl: '.family-how__nav-btn_prev',
      },
      scrollbar: {
        el: '.family-how__scrollbar',
        draggable: true,
      },
    })
  }

  window.addEventListener('resize', checkSlider)

  checkSlider()

  function checkSlider () {
    if (window.innerWidth >= 744) {
      initSlider()
    } else {
      familyHowSliderSwiper?.destroy()
    }
  }
}

const familyProgram = document.querySelector('.family-program')

if (familyProgram) familyProgramInit()

function familyProgramInit () {
  const wrap = document.querySelector('.family-program__wrap')
  const overlay = document.querySelector('.family-program__overlay')

  overlay.addEventListener('scroll', function () {
    wrap.classList.add('hide-hint')
  }, {once: true})

  if (overlay.scrollWidth <= overlay.clientWidth) {
    wrap.classList.add('hide-hint')
  }
}

const scheduleFamily = document.querySelector('[data-element="family-schedule"]')

if (scheduleFamily) scheduleFamilyInit()

function scheduleFamilyInit () {
  let offsetHeader
  const toggleBottom = scheduleFamily.querySelector('[data-element="family-schedule__toggle-bottom"]')
  const toggleTop = document.querySelector('[data-element="family-schedule__toggle-top"]')
  const table = scheduleFamily.querySelector('[data-element="family-schedule__box"]')
  const row = scheduleFamily.querySelector('[data-element="family-schedule__row"]')
  const cells = scheduleFamily.querySelectorAll('[data-element="family-schedule__cell"]')
  const cellTime = scheduleFamily.querySelector('[data-element="family-schedule__time"]')

  const isSummer = toggleTop?.classList.contains('summer')
  tableFixedCalculate()
  function tableFixedCalculate() {
    if (window.innerWidth <= 360) {
      offsetHeader = 70
    } else if (window.innerWidth < 1200) {
      offsetHeader = 82
    } else {
      offsetHeader = 108
    }
    if (window.innerWidth < 1440) {
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.height = cells[i].parentNode.offsetHeight + 'px'
      }
    } else {
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.height = 'auto'
      }
    }
  }

  window.addEventListener('scroll', rowFixedCalculate)
  window.addEventListener('resize', tableFixedCalculate)

  rowFixedCalculate()

  function rowFixedCalculate () {
    if (window.innerWidth >= 1440) {
      row.style.transform = 'none'
      cellTime.style.transform = 'none'
    } else {
      const topCoord = table.getBoundingClientRect().top
      const bottomCoord = table.getBoundingClientRect().bottom
      if (topCoord < offsetHeader && bottomCoord > 100) {
        row.style.transform = row.style.transform.slice(0, row.style.transform.length - 2) - 400 + 'px'
        cellTime.style.transform = cellTime.style.transform.slice(0, cellTime.style.transform.length - 2) - 400 + 'px'
        window.requestAnimationFrame(updateRowFixedTop)
      } else {
        row.style.transform = ''
        cellTime.style.transform = ''
      }
    }
  }

  function updateRowFixedTop () {
    row.style.transform = 'translateY(' + (offsetHeader - table.getBoundingClientRect().top) + 'px' + ')'
    cellTime.style.transform = 'translateY(' + (offsetHeader - table.getBoundingClientRect().top) + 'px' + ')'
  }

  toggleBottom.addEventListener('click', toggleTable)
  toggleTop?.addEventListener('click', toggleTable)
  toggleBottom.addEventListener('click', scrollToTable)

  function toggleTable () {
    if (table.classList.contains('hide')) {
      showTable()
    } else {
      hideTable()
    }
  }

  function scrollToTable () {
    const y = scheduleFamily.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({top: y, behavior: 'smooth'})
  }

  function hideTable () {
    table.classList.add('hide')
    toggleBottom.classList.add('reverse')
    toggleTop.classList.add('reverse')
    if (!isSummer) {
      toggleBottom.innerHTML = "Показать расписание"
      toggleTop.innerHTML = "Показать расписание"
    } else {
      toggleBottom.innerHTML = "Расписание на май"
      toggleTop.innerHTML = "Расписание на май"
    }
    toggleBottom.classList.add('hide')
  }

  function showTable () {
    table.classList.remove('hide')
    toggleBottom.classList.remove('reverse')
    toggleTop.classList.remove('reverse')
    toggleBottom.innerHTML = "Свернуть расписание"
    toggleTop.innerHTML = "Свернуть расписание"
    toggleBottom.classList.remove('hide')
    row.style.transform = 'none'
    cellTime.style.transform = 'none'
    setTimeout(() => tableFixedCalculate(), 100)
  }
}

const familyTeachersSlider = document.querySelector('.family-teachers__slider')

if (familyTeachersSlider) familyTeachersSliderInit()

function familyTeachersSliderInit () {
  let swiper
  if (window.innerWidth >= 744) {
    swiper = new Swiper(familyTeachersSlider, {
      slidesPerView: 'auto',
      autoHeight: true,
      spaceBetween: 500,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      a11y: false,
      pagination: {
        el: '.family-teachers__pagination',
        clickable: true,
      },
      breakpoints: {
        744: {
          effect: 'fade',
          navigation: {
            nextEl: '.family-teachers__nav-btn_next',
            prevEl: '.family-teachers__nav-btn_prev',
          },
          scrollbar: {
            el: '.family-teachers__scrollbar',
            draggable: true,
          },
        }
      }
    })
  } else {
    swiper = new Swiper(familyTeachersSlider, {
      slidesPerView: 'auto',
      autoHeight: true,
      spaceBetween: 200,
      fadeEffect: {
        crossFade: true
      },
      a11y: false,
      pagination: {
        el: '.family-teachers__pagination',
        clickable: true,
      },
      breakpoints: {
        744: {
          effect: 'fade',
          navigation: {
            nextEl: '.family-teachers__nav-btn_next',
            prevEl: '.family-teachers__nav-btn_prev',
          },
          scrollbar: {
            el: '.family-teachers__scrollbar',
            draggable: true,
          },
        }
      }
    })
  }

  const boxes = familyTeachersSlider.querySelectorAll('.family-teachers__box')

  for (let i = 0; i < boxes.length; i++) {
    const list = boxes[i].querySelector('.family-teachers__list')
    if (list.clientHeight > 150) moreBtnInit(boxes[i])
  }

  function moreBtnInit (box) {
    box.classList.add('hide')
    const btn = box.querySelector('.family-teachers__more')
    btn.classList.add('active')
    btn.addEventListener('click', toggleBox)

    function toggleBox () {
      if (box.classList.contains('hide')) {
        box.classList.remove('hide')
        btn.innerHTML = 'Свернуть'
      } else {
        box.classList.add('hide')
        btn.innerHTML = 'Показать полностью'
      }
      swiper.update()
    }
  }
}

const faqItems = document.querySelectorAll("[data-element='faq-item']")

for (let i = 0; i < faqItems.length; i++) {
  faqItems[i].addEventListener("click", toggleFaqItem)

  function toggleFaqItem () {
    this.classList.toggle('active')
  }
}

const footerNewDoc = document.querySelector('[data-element="footer-new-doc"]')

if (footerNewDoc) footerNewDocInit()

function footerNewDocInit () {
  footerNewDoc.addEventListener('click', () => footerNewDoc.classList.toggle('active'))
}

const footerTitleArray = document.querySelectorAll('[data-element="footer__title"]')

if (footerTitleArray.length) footerTitleArrayInit()

function footerTitleArrayInit () {
  for (let i = 0; i < footerTitleArray.length; i++) {
    footerTitleArray[i].addEventListener('click', toggleFooterTitle)
  }

  function toggleFooterTitle () {
    this.classList.toggle('active')
  }
}

const externalFormArray = document.querySelectorAll("[data-element='external-form']")

for (let i = 0; i < externalFormArray.length; i++) {
  globalFormInit(externalFormArray[i], 'onSendMessageTb', 'externalFormData');
}

const familyOrderForm = document.querySelector("[data-element='family-order-form']")
if (familyOrderForm) globalFormInit(familyOrderForm, 'onSendConsultMessage', 'consultFormData')

const orderForm = document.querySelector("[data-element='order-form']")
if (orderForm) globalFormInit(orderForm, 'onSendOrderMessage', 'orderFormData')

const orderFormTeacher = document.querySelector("[data-element='order-form-teacher']")
if (orderFormTeacher) globalFormInit(orderFormTeacher, 'onSendTeacherOrderMessage', 'orderFormTeacherData')

const trialForm = document.querySelector("[data-element='trial']")
if (trialForm) globalFormInit(trialForm, 'onSendBlogMessage', 'trialFormData')


const blogPhoneFormItems = document.querySelectorAll("[data-element='blog-phone']")
blogPhoneFormItems.forEach((blogPhoneForm) => {
  if (blogPhoneForm) globalFormInit(blogPhoneForm, 'onSendBlogMessagePh', 'blogPhoneFormData')
})

const blogEmailFormItems = document.querySelectorAll("[data-element='blog-email']")
blogEmailFormItems.forEach((blogEmailForm) => {
  if (blogEmailForm) globalFormInit(blogEmailForm, 'onSendBlogMessageEm', 'blogEmailFormData')
})

const blogPhoneEmailFormItems = document.querySelectorAll("[data-element='blog-phone-email']")
blogPhoneEmailFormItems.forEach((blogPhoneEmailForm) => {
  if (blogPhoneEmailForm) globalFormInit(blogPhoneEmailForm, 'onSendBlogMessagePhEm', 'blogPhoneEmailFormData')
})

const newsletterForm = document.querySelector("[data-element='newsletter']")
if (newsletterForm) globalFormInit(newsletterForm, 'onSendSubscribeMessage', 'newsletterFormData')

const preCapForm = document.querySelector("[data-element='pre-cap__form']")
if (preCapForm) globalFormInit(preCapForm, 'onSendPreSubscribeMessage', 'preFormData')

const preRegForm = document.querySelector("[data-element='pre-reg__form']")
if (preRegForm) globalFormInit(preRegForm, 'onSendPreSubscribeMessage', 'preFormData')

const libraryPopupForm = document.querySelector("[data-element='library-popup']")
if (libraryPopupForm) globalFormInit(libraryPopupForm, 'onSendLibraryM', 'libraryPopupFormData')

function blogPhoneFormData (globalForm) {
  return {
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}

function blogEmailFormData (globalForm) {
  return {
    'utm': globalForm.querySelector("[name='utm']").value,
    'email': globalForm.querySelector("[name='email']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}

function blogPhoneEmailFormData (globalForm) {
  return {
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'email': globalForm.querySelector("[name='email']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}

function libraryPopupFormData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'email': globalForm.querySelector("[name='email']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}

function preFormData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'email': globalForm.querySelector("[name='email']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}

function newsletterFormData (globalForm) {
  return {
    'utm': globalForm.querySelector("[name='utm']").value,
    'email': globalForm.querySelector("[name='email']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}

function trialFormData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}

function orderFormTeacherData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'email': globalForm.querySelector("[name='email']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}

function orderFormData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    //'class_name': globalForm.querySelector("[name='class_name']").options[globalForm.querySelector("[name='class_name']").selectedIndex].value,
    // 'class_name': globalForm.querySelector("[name='class_name']").value,
    'class_name': globalForm.querySelector(".modal-order-new__select-input").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}
function externalFormData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'email': globalForm.querySelector("[name='email']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}
function consultFormData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'messenger': globalForm.querySelector("[name='messenger']:checked").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}

function globalFormInit (form, func_name, type) {
  const globalForm = form
  const btnSubmit = globalForm.querySelector('.btn-warning')
  const input = globalForm.querySelector("[data-element='input-phone-intl']")

  const inputHidden = globalForm.querySelector("[data-element='input-phone-hidden']")
  const linkTo = globalForm.getAttribute("data-docex")

  const utm_input = globalForm.querySelector('[name="utm"]')

  const news = form.querySelector('[name="news"]')
  const policy = form.querySelector('[name="policy"]')
//   const classSelect = globalForm.querySelector('.modal-order__select')
  const classSelectInputs = globalForm.querySelectorAll('.modal-order-new__select-input')
  const classSelectTop = globalForm.querySelector('.modal-order-new__select-top')

  if (news) news.addEventListener('change', () => news.closest('label').classList.remove('error-text'))
  if (policy) policy.addEventListener('change',() => policy.closest('label').classList.remove('error-text'))
//   if (classSelect) classSelect.addEventListener('change',() => classSelect.closest('.custom-select-container').querySelector('.custom-select-opener').classList.remove('error'))
  for (let i = 0; i < classSelectInputs.length; i++) {
    classSelectInputs[i].addEventListener('change', () => {
      if (classSelectTop) classSelectTop.classList.remove('error')
    })
  }

  let iti
  let data_phone_pattern_exists = false;
  if (input) {
    if (input.hasAttribute('data-phone-pattern')) {
      data_phone_pattern_exists = true;
    }
    if(type == 'libraryPopupFormData' || data_phone_pattern_exists){
      input.addEventListener('input', function () {
        let tempValue = input.value
        const cleanNumber = tempValue.replace(/[^+\d]/g, '')
        inputHidden.value = cleanNumber
      })
    }else{
      iti = window.intlTelInput(input, {
        utilsScript: "../libs/intlTelInputWithUtils.min",
        initialCountry: 'ru',
        separateDialCode: true,
        strictMode: true
      })

      input.addEventListener('input', function () {
        let tempValue = input.value
        inputHidden.value = input.value
        const cleanNumber = tempValue.replace(/[^+\d]/g, '')
        if (iti.selectedCountryData.dialCode === "7" && cleanNumber.length > 10) {
          inputHidden.value = cleanNumber.substring(cleanNumber.length - 10)
        }
        inputHidden.value = iti.selectedCountryData.dialCode + ' ' + inputHidden.value
      })
    }
  }

  function resetError () {
    if (input) input.classList.remove("error")
  }

  globalForm.addEventListener('submit', async (e) => {
    resetError()
    e.preventDefault()
    if (input && !input?.value?.trim()) {
      input.classList.add("error")
    } else if (iti?.isValidNumber() || !input || type == 'libraryPopupFormData' || type == 'blogPhoneFormData' || type == 'blogPhoneEmailFormData' || data_phone_pattern_exists) {

      if (type == 'externalFormData') {
        var form_data = externalFormData(globalForm);
      } else if (type == 'orderFormData') {
        var form_data = orderFormData(globalForm);
      } else if (type == 'consultFormData') {
        var form_data = consultFormData(globalForm);
      } else if (type == 'orderFormTeacherData') {
        var form_data = orderFormTeacherData(globalForm);
      } else if (type == 'trialFormData') {
        var form_data = trialFormData(globalForm);
      } else if (type == 'newsletterFormData') {
        var form_data = newsletterFormData(globalForm);
      } else if (type == 'preFormData') {
        var form_data = preFormData(globalForm);
      } else if (type == 'preFormData') {
        var form_data = preFormData(globalForm);
      } else if (type == 'libraryPopupFormData') {
        var form_data = libraryPopupFormData(globalForm);
      } else if (type == 'blogPhoneFormData') {
        var form_data = blogPhoneFormData(globalForm);
      } else if (type == 'blogEmailFormData') {
        var form_data = blogEmailFormData(globalForm);
      } else if (type == 'blogPhoneEmailFormData') {
        var form_data = blogPhoneEmailFormData(globalForm);
      }

      const email = globalForm.querySelector('[name="email"]')

      let isValid = true

      if (email) {
        isValid = validateEmail(email)
        if (!isValid) email.addEventListener('input', () => validateEmail(email))
      }
      if (news) {
        if (!news.checked) {
          news.closest('label').classList.add('error-text')
          news.classList.add('error')
          isValid = false
        }
      }
      if (policy) {
        if (!policy.checked) {
          policy.closest('label').classList.add('error-text')
          isValid = false
        }
      }
      //   if (classSelect) {
      //     if (!classSelect.value) {
      //       const opener = classSelect.closest('.custom-select-container').querySelector('.custom-select-opener')
      //       opener.classList.add('error')
      //       isValid = false
      //     }
      //   }
      if (classSelectTop) {
        const checkedClass = document.querySelector('.modal-order-new__select-input:checked')
        if (!checkedClass) {
          if (classSelectTop) classSelectTop.classList.add('error')
          isValid = false
        }
      }

      if (isValid) {
        if (email) {
          email_value = email.value;
        }

        btnSubmit.disabled = true;
        if (type === 'preFormData') {
          e.stopPropagation();
          const loader = document.querySelector('.form-loader')
          if (loader) loader.classList.add('active')
          $.request('MainFunctions::onSendPreSubscribeMessage', {
            data: form_data,
          });
          location.assign(linkTo + `?cemail=${email_value}`);
          // setTimeout(() => {
          //     globalForm.submit();
          //     setTimeout(() => {
          //       clearForm();
          //         location.assign(linkTo + `?cemail=${email_value}`);
          //         // location.assign(linkTo + '?email='+email_value)
          //     }, 100)
          // }, 100)
        } else {
          let linkTo_ = linkTo;
          if (utm_input) {
            utm_f = utm_input.value;
            if(utm_f != null && utm_f != '' && utm_f != undefined){
            }else{
              utm_f = ''
            }
            if (utm_f.length > 0) {
              linkTo_ = linkTo_ + utm_f;
            }
          }
          globalForm.submit();
          setTimeout(() => {
            clearForm();
            // location.assign(linkTo + `?cemail=${email_value}`);
            // location.assign(linkTo + '?email='+email_value)

            location.assign(linkTo_);

          }, 100)
        }
      }

    } else {
      input.classList.add("error")
    }

  })

  function clearForm () {
    const inputs = globalForm.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = ''
    }
  }

  if (input) input.addEventListener('input', resetError)

  function validateEmail (email) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
      email.classList.remove('error')
      return true
    } else {
      email.classList.add('error')
      return false
    }
  }
}

const headerNew = document.querySelector('[data-element="header-new"]')

if (headerNew) headerNewInit()

function headerNewInit () {
  window.addEventListener('scroll', toggleHeader, {passive: true})

  function toggleHeader () {
    if (window.scrollY > 0) {
      headerNew.classList.add('thin')
    } else {
      headerNew.classList.remove('thin')
    }
  }
}

const header = document.querySelector('[data-element="header"]')

if (header) headerInit()

function headerInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')
  const headerStages = document.querySelector('.header__stages')
  let lastScrollTop = 0
  let scrollDown = true
  const headerArea = header.querySelector('.header__area')
  const reviewsTileSidebar = document.querySelector('.reviews-tile__sidebar')

  window.addEventListener('scroll', checkHeader, { passive: true })
  window.addEventListener('scroll', checkScrollDirection, { passive: true })
  window.addEventListener('resize', checkHeader, { passive: true })

  checkHeader()

  function checkHeader () {
    if (window.scrollY > 10) {
      header.classList.add('header_white')
      stickyHeader.classList.add('white')
    } else {
      header.classList.remove('header_white')
      stickyHeader.classList.remove('white')
    }
  }

  function checkScrollDirection () {
    const st = window.scrollY
    if (st > lastScrollTop) {
      scrollDown = true
    } else if (st < lastScrollTop) {
      scrollDown = false
    }
    lastScrollTop = st <= 0 ? 0 : st
    if (scrollDown) {
      if (headerStages) header.classList.add('stages-hide')
      header.classList.add('thin')
      if (reviewsTileSidebar) reviewsTileSidebar.classList.add('space')
    } else {
      if (headerStages) header.classList.remove('stages-hide')
      header.classList.remove('thin')
      if (reviewsTileSidebar) reviewsTileSidebar.classList.remove('space')
    }
  }

  const menuBtn = document.querySelector('.header__nav-item_menu')
  const layer = document.querySelector('.header__layer')

  const navCloseBtns = header.querySelectorAll('.nav__close')
  for (let i = 0; i < navCloseBtns.length; i++) {
    navCloseBtns[i].addEventListener('click', closeMenu)
  }

  menuBtn.addEventListener('click', toggleMenu)
  layer.addEventListener('click', closeMenu)

  function toggleMenu () {
    header.classList.toggle('open')
    stickyHeader.classList.toggle('open')
    body.classList.toggle('no-scroll')
  }

  function closeMenu () {
    header.classList.remove('open')
    stickyHeader.classList.remove('open')
    body.classList.remove('no-scroll')
    headerArea.classList.remove('hide')
    const activeArea = document.querySelector('.nav__area.active-mob')
    if (activeArea) activeArea.classList.remove('active-mob')
  }
}

const howSlider = document.querySelector('[data-element="how-slider"]')

if (howSlider) howSliderInit()

function howSliderInit () {
  let howSliderSwiper

  function initSlider () {
    howSliderSwiper = new Swiper(howSlider, {
      slidesPerView: 'auto',
      spaceBetween: 40,
      a11y: false,
      navigation: {
        nextEl: '.how__nav-btn_next',
        prevEl: '.how__nav-btn_prev',
      },
      scrollbar: {
        el: '.how__scrollbar',
        draggable: true,
      },
    })
  }

  window.addEventListener('resize', checkSlider)

  checkSlider()

  function checkSlider () {
    if (window.innerWidth >= 1440) {
      initSlider()
    } else {
      howSliderSwiper?.destroy()
    }
  }
}

const how = document.querySelector("[data-element='how']")

if (how) howInit()

function howInit () {
  const btn = document.querySelector("[data-element='how-button']")
  btn.addEventListener('click', function () {
    this.style.display = "none"
    how.classList.add('active')
  })
}

const information = document.querySelector('.information')

if (information) informationInit()

function informationInit () {
  const togglers = document.querySelectorAll('[data-information-toggler]')
  const accordions = document.querySelectorAll('[data-information-accordion]')
  const sidebarOpenBtn = document.querySelector('.information__sidebar-open')
  const sidebarCloseBtn = document.querySelector('.information__sidebar-close')
  const sidebar = document.querySelector('.information__sidebar')
  const body = document.querySelector('body')

  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', () => {
      const oldToggler = document.querySelector('.information__button.active')
      if (oldToggler && !accordions[i].classList.contains('active')) oldToggler.classList.remove('active')
      accordions[i].classList.toggle('active')
    })
  }

  for (let i = 0; i < togglers.length; i++) {
    togglers[i].addEventListener('click', toggleBox)
  }

  function toggleBox () {
    const id = this.getAttribute('data-information-button-id')
    const box = information.querySelector('[data-information-box-id="' + id + '"]')
    if (box) {
      const oldActive = document.querySelector('.information__box.active')
      if (oldActive) oldActive.classList.remove('active')
      const oldToggler = document.querySelector('.information__button.active')
      if (oldToggler && !this.classList.contains('information__btn')) oldToggler.classList.remove('active')
      box.classList.add('active')
      this.classList.add('active')
      closeSidebar()
      window.scrollTo(0, 0)
    }
  }

  sidebarOpenBtn.addEventListener('click', openSidebar)
  sidebarCloseBtn.addEventListener('click', closeSidebar)

  function openSidebar () {
    sidebar.classList.add('active')
    body.classList.add('no-scroll')
  }

  function closeSidebar () {
    sidebar.classList.remove('active')
    body.classList.remove('no-scroll')
  }
}

const itHowSlider = document.querySelector(".it-how__slider")

if (itHowSlider) itHowSliderInit()

function itHowSliderInit () {
  let itHowSliderSwiper

  function initSlider () {
    itHowSliderSwiper = new Swiper(itHowSlider, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      a11y: false,
      navigation: {
        nextEl: '.it-how__nav-btn_next',
        prevEl: '.it-how__nav-btn_prev',
      },
      scrollbar: {
        el: '.it-how__scrollbar',
        draggable: true,
      },
      breakpoints: {
        1440: {
          spaceBetween: 30,
        }
      }
    })
  }

  window.addEventListener('resize', checkSlider)

  checkSlider()

  function checkSlider () {
    if (window.innerWidth >= 744) {
      initSlider()
    } else {
      itHowSliderSwiper?.destroy()
    }
  }
}

const animateItems = document.querySelectorAll('.library-cap__animate')

if (animateItems.length) animateItemsInit()

function animateItemsInit () {
  const speed = 50
  let itemsIndex = 0
  const text = document.querySelector('.library-cap__text')
  const cursor = text.querySelector('.library-cap__cursor')

  createString(animateItems[itemsIndex])

  function createString (item) {
    item.classList.add('active')
    const string = item.querySelector('.library-cap__animate-string')
    const text = [...string.innerHTML]
    let stringWithSpans = ''
    text.forEach((char, i) => {
      stringWithSpans += `<span>${char}</span>`
    })
    string.innerHTML = stringWithSpans
    animateString(string)
  }

  function animateString (string) {
    const spans = string.querySelectorAll('span')
    const length = spans.length
    let index = 0
    animateSpan()

    function animateSpan () {
      spans[index].classList.add('active')
      calculateCoords(spans[index])
      index += 1
      if (index < length) {
        setTimeout(animateSpan, speed)
      } else {
        setTimeout(animateHide, 1000)
      }
    }

    function animateHide () {
      const spans = string.querySelectorAll('span')
      let index = spans.length - 1
      animateSpanHide()

      function animateSpanHide () {
        spans[index].classList.remove('active')
        index -= 1
        calculateCoords(spans[index])
        if (index < 0) {
          cursor.style.left = `${cursor.style.left.slice(0, -2) - 22}px`
          const oldActive = document.querySelector('.library-cap__animate.active')
          setTimeout(function () {
            oldActive.classList.remove('active')
          }, 50)
          setTimeout(function () {
            const oldString = oldActive.querySelector('.library-cap__animate-string')
            oldString.innerHTML = oldString.getAttribute('data-text')
            itemsIndex += 1
            if (itemsIndex >= animateItems.length) itemsIndex = 0
            createString(animateItems[itemsIndex])
          }, 100)
        } else {
          setTimeout(animateSpanHide, speed*0.7)
        }
      }
    }
  }

  function calculateCoords (span) {
    if (!span) return
    const top = span.getBoundingClientRect().top - text.getBoundingClientRect().top
    const left = span.getBoundingClientRect().left - text.getBoundingClientRect().left
    cursor.style.top = `${top}px`
    cursor.style.left = `${left}px`
  }
}

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
  const filterSubjectsList = libraryCap.querySelector(".library-cap__filter-list.class_subjects")
  const filterClassBox = libraryCap.querySelector(".library-cap__filter.library-cap__filter_class")
  const tile = document.querySelector('.library-tile')

  const observer = new MutationObserver(function() {
    const wrap = openers[1].nextElementSibling
    const items = wrap.querySelectorAll("[data-element='library-cap-filter-input']")
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[1], wrap))
    })
  })

  initTabs()

  const observerPoster = new MutationObserver(function() {
    initPosters()
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
    // $('.filtered_elements').html("<div class='tile-loader'></div>");
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
    initPosters()
    // }
  }

  function scrollToTile () {
    showBlocks()
    const banner = document.querySelector('.discount')
    const bannerHeight = banner ? banner.clientHeight : 0
    const theElement = document.getElementById('library-tile')
    let offset
    if (window.innerWidth < 744) {
      offset = 100 + bannerHeight
    } else if (window.innerWidth < 1200) {
      offset = 120 + bannerHeight
    } else {
      offset = 200 + bannerHeight
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
      }
    }
  }

  window.addEventListener('click', closeAllFilters)

  function closeAllFilters () {
    const oldOpen = libraryCap.querySelector(".library-cap__filter-top.active")
    if (oldOpen) oldOpen.classList.remove('active')
  }

  function closeFilter (opener) {
    opener.classList.remove('active')
    const filter = opener.parentElement
    if (filter) filter.classList.remove('open')
  }

  async function updateFilter (opener, wrap, noScroll, noFiltration) {
    resetError()
    if(opener.getAttribute('data-ftype') === 'class_select') {
      filterSubjectsList.innerHTML = "<div class='tile-loader-box'><div class='tile-loader'></div></div>";
      // makeFiltration()
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

  initPosters()

  function initPosters () {
    const videoBoxes = document.querySelectorAll('.library-tile__video-box')
    for (let i = 0; i < videoBoxes.length; i++) {
      videoBoxes[i].addEventListener('click', function () {
        videoBoxes[i].classList.add('active')
        const iframe = videoBoxes[i].querySelector('iframe')
        iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1')
      })
    }
  }

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

const lottieAnimations = document.querySelectorAll('[data-path]')

for (let i = 0; i < lottieAnimations.length; i++) {
  lottie.loadAnimation({
    container: lottieAnimations[i],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: lottieAnimations[i].getAttribute('data-path')
  })
}

const marathonChildThemes = document.querySelector('[data-element="marathon-child__themes"]')

if (marathonChildThemes) marathonChildThemesInit()

function marathonChildThemesInit () {
  const navItems = document.querySelectorAll('[data-element="marathon-child__nav-item"]')
  const boxes = document.querySelectorAll('[data-element="marathon-child__box"]')

  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', toggleBox)
  }

  function toggleBox () {
    const oldNav = marathonChildThemes.querySelector('.marathon-child__nav-item_active')
    oldNav.classList.remove('marathon-child__nav-item_active')
    this.classList.add('marathon-child__nav-item_active')
    const oldBox = marathonChildThemes.querySelector('.marathon-child__box_active')
    oldBox.classList.remove('marathon-child__box_active')
    const index = this.getAttribute('data-index')
    boxes[index].classList.add('marathon-child__box_active')
  }

  const marathonChildClose = document.querySelector('[data-element="marathon-child__close"]')

  marathonChildThemes.addEventListener('click', openModal)
  marathonChildClose.addEventListener('click', closeModal)
  window.addEventListener('click', windowCloseModal)

  function openModal () {
    marathonChildThemes.classList.add('marathon-child__themes_active')
  }

  function closeModal (e) {
    e.stopPropagation()
    marathonChildThemes.classList.remove('marathon-child__themes_active')
  }

  function windowCloseModal (e) {
    if (!e.target.classList.contains('marathon-child__themes') && !e.target.closest('.marathon-child__themes')) {
      marathonChildThemes.classList.remove('marathon-child__themes_active')
    }
  }
}

const marathonInformer = document.querySelector('[data-element="marathon-informer"]')

if (marathonInformer) marathonInformerInit()

function marathonInformerInit () {
  const close = document.querySelector('[data-element="marathon-informer__close"]')
  close.addEventListener('click', removeMarathon)

  function removeMarathon (e) {
    e.preventDefault()
    localStorage.setItem('isMarathonInformerShown', 'true')
    marathonInformer.remove()
  }

  const isShown = localStorage.getItem('isMarathonInformerShown')

  if (!isShown || marathonInformer.getAttribute('show-always')) {
    marathonInformer.style.display = 'block'
  }
}

const marathonOrderSelect = document.querySelector("[data-element='marathon-order__select']")

if (marathonOrderSelect) marathonOrderSelectInit()

function marathonOrderSelectInit () {
  const button = document.querySelector("[data-element='marathon-order__button']")
  const priceOld = document.querySelector("[data-element='marathon-order__price-old']")
  const priceNew = document.querySelector("[data-element='marathon-order__price-new']")
  const opener = marathonOrderSelect.closest('.custom-select-container').querySelector('.custom-select-opener')

  marathonOrderSelect.addEventListener('change', updateButton)
  button.addEventListener('click', validateButton)

  function validateButton (e) {
    if (!marathonOrderSelect.value) {
      e.preventDefault()
      opener.classList.add('error')
    } else {
      window.open(button.href)
    }
  }

  function updateButton () {
    opener.classList.remove('error')

    const link = this.options[this.selectedIndex].getAttribute('data-product-link')
    const priceOldValue = this.options[this.selectedIndex].getAttribute('data-product-old-price')
    const priceNewValue = this.options[this.selectedIndex].getAttribute('data-product-new-price')

    button.href = link
    if (priceOldValue) {
      priceOld.style.display = 'block'
      priceOld.innerHTML =`${priceOldValue}`
    } else {
      priceOld.style.display = 'none'
    }
    priceNew.innerHTML =`${priceNewValue}`
  }
}

const maxDiscount = document.querySelector('.max-discount')

if (maxDiscount) maxDiscountInit()

function maxDiscountInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const timer = maxDiscount.querySelector('.max-discount__timer')

  window.addEventListener('scroll', checkScroll, { passive: true })

  function checkScroll () {
    if (window.scrollY > 100) {
      stickyHeader.classList.add('predzaps-top-hide')
      setTimeout(() => stickyHeader.classList.add('predzaps-top-hide-no-transition'), 300)
    } else if (window.scrollY <= 20) {
      stickyHeader.classList.remove('predzaps-top-hide-no-transition')
      setTimeout(() => stickyHeader.classList.remove('predzaps-top-hide'), 100)
    }
  }

  if (timer) offerTimerInit(timer)

  function offerTimerInit (timer) {
    const date = timer.getAttribute('date-end')
    const countDownDate = new Date(date).getTime()

    const nodes = timer.querySelectorAll('.max-discount__number')

    const interval = setInterval(updateTimer, 1000)

    function updateTimer () {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      nodes[0].innerHTML = days
      nodes[1].innerHTML = hours
      nodes[2].innerHTML = minutes
      nodes[3].innerHTML = seconds

      if (distance < 0) {
        clearInterval(interval);
        nodes[0].innerHTML = "0"
        nodes[1].innerHTML = "0"
        nodes[2].innerHTML = "0"
        nodes[3].innerHTML = "0"
      }
    }
  }
}

const modalOrderNewSelect = document.querySelector(".modal-order-new__select")

if (modalOrderNewSelect) modalOrderNewSelectInit()

function modalOrderNewSelectInit () {
  const top = modalOrderNewSelect.querySelector('.modal-order-new__select-top')
  const placeholder = modalOrderNewSelect.querySelector('.modal-order-new__select-placeholder')
  const inputs = modalOrderNewSelect.querySelectorAll('.modal-order-new__select-input')

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', setValue)
  }

  top.addEventListener('click', openSelect)
  window.addEventListener('click', closeSelect)

  function openSelect (e) {
    e.stopPropagation()
    top.classList.toggle('active')
  }

  function closeSelect () {
    top.classList.remove('active')
  }

  function setValue () {
    placeholder.innerHTML = this.parentElement.querySelector('.modal-order-new__select-view').innerHTML
  }
}



const nav = document.querySelector('.header .nav')

if (nav) navInit()

function navInit () {
  const buttons = nav.querySelectorAll('button.nav__box-link')
  const headerArea = document.querySelector('.header__area')
  const navBackButtons = nav.querySelectorAll('.nav__back')
  let timeout

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', toggleArea)
    buttons[i].addEventListener('mouseenter', toggleArea)
  }

  for (let i = 0; i < navBackButtons.length; i++) {
    navBackButtons[i].addEventListener('click', backArea)
  }

  function backArea () {
    const activeArea = nav.querySelector('.nav__area.active-mob')
    if (activeArea) activeArea.classList.remove('active-mob')
    headerArea.classList.remove('hide')
  }

  function toggleArea (e) {
    clearTimeout(timeout)
    timeout = setTimeout(() => toggle(this),50)

    function toggle (that) {
      if (!that.closest('.nav__left').querySelector('.nav__box-link:hover')) return
      const id = that.getAttribute('data-nav-id')
      const oldArea = nav.querySelector('.nav__area.active')
      if (oldArea) oldArea.classList.remove('active')
      if (oldArea) oldArea.classList.remove('active-mob')
      const oldButton = nav.querySelector('button.nav__box-link.active')
      if (oldButton) oldButton.classList.remove('active')
      const area = nav.querySelector("[data-nav-area='" + id + "']")
      if (area) area.classList.add('active')
      if (area) area.classList.add('active-mob')
      headerArea.classList.add('hide')
      that.classList.add('active')
    }
  }
}

const offerTimers = document.querySelectorAll('.offer-timer')

if (offerTimers.length) offerTimersInit()

function offerTimersInit () {
  for (let i = 0; i < offerTimers.length; i++) {
    offerTimerInit(offerTimers[i])
  }
}

function offerTimerInit (timer) {
  const date = timer.getAttribute('date-end')
  const countDownDate = new Date(date).getTime()

  const nodes = timer.querySelectorAll('.offer-timer__number')

  const interval = setInterval(updateTimer, 1000)

  function updateTimer () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    nodes[0].innerHTML = days
    nodes[1].innerHTML = hours
    nodes[2].innerHTML = minutes
    nodes[3].innerHTML = seconds

    if (distance < 0) {
      clearInterval(interval);
      nodes[0].innerHTML = "0"
      nodes[1].innerHTML = "0"
      nodes[2].innerHTML = "0"
      nodes[3].innerHTML = "0"
    }
  }
}

// try {
//   const mask = (selector) => {
//     function setMask() {
//       let matrix = '+###############';
//
//       maskList.forEach(item => {
//         let code = item.code.replace(/[\s#]/g, ''),
//           phone = this.value.replace(/[\s#-)(]/g, '');
//
//         if (phone.includes(code)) {
//           //console.log(phone, code);
//           matrix = item.code;
//         }
//       });
//
//       let i = 0,
//         val = this.value.replace(/\D/g, '');
//
//       this.value = matrix.replace(/(?!\+)./g, function(a) {
//         return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
//       });
//     }
//
//     let inputs = document.querySelectorAll(selector);
//
//     inputs.forEach(input => {
//       input.addEventListener('focus', () => initInputHandlers(input), {once: true});
//     });
//
//     function initInputHandlers (input) {
//       if (!input.value) input.value = '+';
//       input.addEventListener('input', setMask);
//       input.addEventListener('focus', setMask);
//       input.addEventListener('blur', setMask);
//     }
//   };
//   mask("[data-phone-pattern]");
// } catch (error) {
//
// }

const preAboutVideo = document.querySelector("[data-element='pre-about-video']")

if (preAboutVideo) preAboutVideoInit()

function preAboutVideoInit () {
  const videoWrap = document.querySelector("[data-element='pre-about-video-wrap']")
  const timeNode = document.querySelector("[data-element='pre-about-time']")
  const soundBtn = document.querySelector(".pre-about__sound")

  preAboutVideo.addEventListener("timeupdate", timeupdateHandler)

  function timeupdateHandler () {
    const date = new Date(null)
    date.setSeconds(Math.round(preAboutVideo.currentTime))
    timeNode.innerHTML = date.toISOString().slice(14, 19)
  }

  videoWrap.addEventListener('click', playVideo)

  function playVideo (e) {
    e.stopPropagation()
    if (preAboutVideo.muted) {
      preAboutVideo.muted = false
      preAboutVideo.loop = false
      preAboutVideo.currentTime = 0
      preAboutVideo.play()
      soundBtn.classList.add('active')
    } else {
      preAboutVideo.muted = true
      soundBtn.classList.remove('active')
    }
  }
}

const preFaqItems = document.querySelectorAll("[data-element='pre-faq-item']")

for (let i = 0; i < preFaqItems.length; i++) {
  preFaqItems[i].addEventListener("click", toggleFaqItem)

  function toggleFaqItem () {
    this.classList.toggle('active')
  }
}

const preReviewsSlider = document.querySelector('[data-element="pre-reviews-slider"]')

if (preReviewsSlider) preReviewsSliderInit()

function preReviewsSliderInit () {
  const preReviewsSliderSwiper = new Swiper(preReviewsSlider, {
    slidesPerView: 'auto',
    spaceBetween: 25,
    a11y: false,
    navigation: {
      nextEl: '.pre-reviews__nav-btn_right',
      prevEl: '.pre-reviews__nav-btn_left',
    },
    scrollbar: {
      el: '.pre-reviews__scrollbar',
      draggable: true,
    },
    breakpoints: {
      1440: {
        spaceBetween: 30,
      }
    }
  })
}

const preReviewsVideoWraps = document.querySelectorAll("[data-element='pre-reviews-video-wrap']")

if (preReviewsVideoWraps.length) preReviewsVideoWrapsInit()

function preReviewsVideoWrapsInit () {
  for (let i = 0; i < preReviewsVideoWraps.length; i++) {
    videoInit(preReviewsVideoWraps[i])
    const video = preReviewsVideoWraps[i].querySelector("[data-element='pre-reviews-video']")
    video.addEventListener('play', stopOtherVideo)
  }

  function stopOtherVideo () {
    const index = this.getAttribute('data-index')
    for (let i = 0; i < preReviewsVideoWraps.length; i++) {
      if (index != i) {
        let videoOther = preReviewsVideoWraps[i].querySelector("[data-element='pre-reviews-video']")
        videoOther.pause()
      }
    }
  }

  function videoInit (wrap) {
    const video = wrap.querySelector("[data-element='pre-reviews-video']")
    wrap.addEventListener('click', playVideo, {once: true})

    function playVideo () {
      wrap.classList.add('active')
      video.controls = true
      setTimeout(() => video.play(), 100)
    }
  }
}

const preStudySlider = document.querySelector('[data-element="pre-study-slider"]')

if (preStudySlider) {
  var preStudySliderSwiper
  var animationPlayed = false
  const wrapper = preStudySlider.querySelector('.pre-study__wrapper')
  window.addEventListener('resize', watchSlider, {passive: true})
  window.addEventListener('scroll', animateSlider, {passive: true})
  watchSlider()

  function initSlider () {
    preStudySliderSwiper = new Swiper(preStudySlider, {
      slidesPerView: 'auto',
      spaceBetween: 25,
      loop: true,
      pagination: {
        el: ".pre-study__pagination",
      },
    })
  }

  function watchSlider () {
    if (window.innerWidth < 1440) {
      preStudySliderSwiper?.destroy()
      initSlider()
    } else {
      preStudySliderSwiper?.destroy()
    }
  }

  function animateSlider () {
    if (preStudySlider.getBoundingClientRect().top < window.innerHeight/2 && !animationPlayed && window.innerWidth < 992) {
      animationPlayed = true
      wrapper.style.transitionDuration = '0.5s'
      wrapper.style.transform = 'translate3d(-160px, 0, 0)'
      setTimeout(function () {
        wrapper.style.transform = 'translate3d(0, 0, 0)'
      }, 500)
    }
  }
}

const preThanks = document.querySelector('.pre-thanks')

if (preThanks) preThanksInit()

function preThanksInit () {
  const url = new URL(window.location.href)
  //url.searchParams.delete('email')
//   url.searchParams.delete('cemail')
//   history.replaceState(null, "", url.toString())
}

const preWaysSlideArray = document.querySelectorAll('[data-element="pre-ways-slide"]')

if (preWaysSlideArray.length) preWaysSlideArrayInit()

function preWaysSlideArrayInit () {
  for (let i = 0; i < preWaysSlideArray.length; i++) {
    preWaysSlideInit(preWaysSlideArray[i])
  }

  function preWaysSlideInit (slide) {
    const list = slide.querySelector('[data-element="pre-ways-list"]')
    const btn = slide.querySelector('[data-element="pre-ways-more"]')

    if (window.innerWidth >= 1200 ? list?.clientHeight > 140 : list?.clientHeight > 70) {
      btn.classList.add('show')
      btn.addEventListener('click', toggleList)
      slide.classList.add('hide')
    }

    function toggleList () {
      if (slide.classList.contains('hide')) {
        slide.classList.remove('hide')
        btn.textContent = 'Свернуть'
      } else {
        slide.classList.add('hide')
        btn.textContent = 'Показать все предметы'
      }
    }
  }
}

const preWaysSlider = document.querySelector('[data-element="pre-ways__slider"]')

if (preWaysSlider) preWaysSliderInit()

function preWaysSliderInit () {
  let preWaysSliderSwiper
  window.addEventListener('resize', watchSlider, {passive: true})
  watchSlider()

  function watchSlider () {
    if (window.innerWidth < 1200) {
      preWaysSliderSwiper?.destroy()
    } else {
      preWaysSliderSwiper?.destroy()
      initSlider()
    }
  }

  function initSlider () {
    preWaysSliderSwiper = new Swiper(preWaysSlider, {
      slidesPerView: 'auto',
      spaceBetween: 25,
      pagination: {
        el: ".pre-ways__pagination",
      },
      navigation: {
        nextEl: '.pre-ways__nav-btn_right',
        prevEl: '.pre-ways__nav-btn_left',
      },
      scrollbar: {
        el: '.pre-ways__scrollbar',
        draggable: true,
      },
      breakpoints: {
        1440: {
          spaceBetween: 30,
        }
      }
    })
  }
}

const predzapsTop = document.querySelector('.predzaps-top')

if (predzapsTop) predzapsTopInit()

function predzapsTopInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const close = predzapsTop.querySelector('.predzaps-top__close')
  close.addEventListener('click', removePredzapsTop)

  window.addEventListener('scroll', checkScroll, { passive: true })

  function checkScroll () {
    if (window.scrollY > 100) {
      stickyHeader.classList.add('predzaps-top-hide')
      setTimeout(() => stickyHeader.classList.add('predzaps-top-hide-no-transition'), 300)
    } else if (window.scrollY <= 20) {
      stickyHeader.classList.remove('predzaps-top-hide-no-transition')
      setTimeout(() => stickyHeader.classList.remove('predzaps-top-hide'), 100)
    }
  }

  function removePredzapsTop (e) {
    e.preventDefault()
    stickyHeader.classList.add('predzaps-top-hide')
    setTimeout(() => {
      stickyHeader.classList.add('no-transform')
      stickyHeader.classList.remove('predzaps-top-hide')
      window.removeEventListener('scroll', checkScroll, { passive: true })
      predzapsTop.classList.add('hide')
      setTimeout(() => predzapsTop.remove(), 600)
    }, 300)
  }
}

const teacherCostArray = document.querySelectorAll('.teacher-cost .cost__area')

if (teacherCostArray.length) teacherCostArrayInit()

function teacherCostArrayInit () {
  for (let i = 0; i < teacherCostArray.length; i++) {
    teacherCostInit(teacherCostArray[i])
  }
}

function teacherCostInit(node) {
  const btn = node.querySelector('.cost__button')
  const checkbox = node.querySelector('.cost__teacher-checkbox')
  const price = node.querySelector('.cost__price-current')

  checkbox.addEventListener('change', checkboxChangeHandler)

  function checkboxChangeHandler () {
    const newPrice = checkbox.getAttribute('new-price')
    const oldPrice = btn.getAttribute('old-price')

    const newHref = checkbox.getAttribute('new-href')
    const oldHref = btn.getAttribute('old-href')

    if (checkbox.checked) {
      price.textContent = newPrice
      btn.href = newHref
    } else {
      price.textContent = oldPrice
      btn.href = oldHref
    }
  }
}

const programBoxes = document.querySelectorAll('.program__box')

if (programBoxes.length) programBoxesInit()

function programBoxesInit () {
  for (let i = 0; i < programBoxes.length; i++) {
    programBoxInit(programBoxes[i])
  }

  function programBoxInit (box) {
    const items = box.querySelectorAll('.program__item')
    let span

    if (window.innerWidth >= 1440 && items.length > 12 || window.innerWidth >= 744  && items.length > 10 || window.innerWidth < 744 && items.length > 6) {
      box.classList.add('hide')
      const btn = box.querySelector('.program__more')
      btn.addEventListener('click', toogleBox)
      span = btn.querySelector('span')
    }

    function toogleBox () {
      if (box.classList.contains('active')) {
        box.classList.remove('active')
        span.innerHTML = 'Показать полностью'
        box.scrollIntoView()
      } else {
        box.classList.add('active')
        span.innerHTML = 'Скрыть список'
      }
    }
  }
}

const promo = document.querySelector('.promo')

if (promo) promoInit()

function promoInit () {
  const closeBtn = promo.querySelector('.promo__close')
  const promoView = promo.querySelector('.promo__view')

  promoView.addEventListener('click', openPromo)
  closeBtn.addEventListener('click', closePromo)

  window.addEventListener('click', closePromo)

  function openPromo (e) {
    e.stopPropagation()
    promo.classList.add('active')
  }

  function closePromo () {
    promo.classList.remove('active')
  }
}

const quiz = document.querySelector('[data-element="quiz"]')

if (quiz) quizInit()

function quizInit () {
  const generateData = {
    list_4: [
      ['Математика','Русский язык','Литературное чтение','Английский язык','Не планирую'],
      ['Математика','Русский язык','Окружающий мир','Литературное чтение','Английский язык','Музыка','Физическая культура','ИЗО и технология','Не планирую'],
      ['Математика','Русский язык','Окружающий мир','Литературное чтение','Английский язык','Музыка','Физическая культура','ИЗО и технология','Не планирую'],
      ['Математика','Русский язык','Окружающий мир','Литературное чтение','Английский язык','Музыка','Физическая культура','ИЗО и технология','Не планирую'],
      ['Математика','Русский язык','Окружающий мир','Литературное чтение','Английский язык','Музыка','Физическая культура','ИЗО и технология','Не планирую'],
      ['Математика','Русский язык','Литература','Биология','История','География','Английский язык','Музыка','Физическая культура','ИЗО и технология','Не планирую'],
      ['Математика','Русский язык','Литература','Биология','История','География','Английский язык','Музыка','Физическая культура','ИЗО и технология','Обществознание','Не планирую'],
      ['Математика','Русский язык','Литература','Биология','История','География','Английский язык','Музыка',
        'Физическая культура','ИЗО и технология','Обществознание','Физика','Химия','Информатика','Не планирую'],
      ['Математика','Русский язык','Литература','Биология','История','География','Английский язык','Музыка',
        'Физическая культура','ИЗО и технология','Обществознание','Физика','Химия','Информатика','Не планирую'],
      ['Русский язык','Литература','Английский язык','Математика','Информатика','Физика','Общество','История','География',
        'Биология','Химия','Физическая культура','Технология','ОБЗР','Не планирую'],
      ['Русский язык','Литература','Английский язык','Математика','Информатика','Физика','Общество','История','География',
        'Биология','Химия','Физическая культура','ОБЗР','Не планирую'],
      ['Русский язык','Литература','Английский язык','Математика','Информатика','Физика','Общество','История','География',
        'Биология','Химия','Физическая культура','ОБЗР','Не планирую'],
    ],
    list_5: [
      [],
      ['Китайский язык','Французский язык','Компьютерная грамотность','Программирование в Minecraft','Программирование в Scratch',
        'Шахматы','Блогинг','Испанский язык','Немецкий язык','Олимпиадный русский язык','Не планирую'],
      ['Китайский язык','Французский язык','Математика и логика. Первые шаги в олимпиадах','Компьютерная грамотность',
        'Программирование в Minecraft','Программирование в Scratch','Шахматы','Блогинг','Испанский язык','Немецкий язык',
        'Олимпиадный русский язык','Не планирую'],
      ['Китайский язык','Французский язык','Математика и логика. Первые шаги в олимпиадах','Компьютерная грамотность',
        'Программирование в Minecraft','Программирование в Scratch','Курс по разработке игр в Roblox','Ораторское мастерство',
        'Финансовая грамотность','Эмоциональный интеллект','Шахматы','Блогинг','Испанский язык','Немецкий язык',
        'Олимпиадный русский язык','Не планирую'],
      ['Китайский язык','Французский язык','Математика и логика. Первые шаги в олимпиадах','Компьютерная грамотность',
        'Программирование в Minecraft','Программирование в Scratch','Курс по разработке игр в Roblox','Ораторское мастерство',
        'Финансовая грамотность','Эмоциональный интеллект','Шахматы','Блогинг','Испанский язык','Немецкий язык',
        'Олимпиадный русский язык','Не планирую'],
      ['Китайский язык','Французский язык','Математика и логика. Первые шаги в олимпиадах','Программирование на Python',
        'Создание сайтов','Компьютерная грамотность','Программирование в Minecraft','Программирование в Scratch',
        'Курс по разработке игр в Roblox','Графический дизайн в Figma','Ораторское мастерство','Финансовая грамотность',
        'Эмоциональный интеллект','Шахматы','Блогинг','Испанский язык','Немецкий язык',
        'Олимпиадный русский язык','Не планирую'],
      ['Китайский язык','Французский язык','Математика и логика. Первые шаги в олимпиадах','Программирование на Python',
        'Создание сайтов','Компьютерная грамотность','Программирование в Minecraft','Программирование в Scratch',
        'Курс по разработке игр в Roblox','Графический дизайн в Figma','Ораторское мастерство','Финансовая грамотность',
        'Эмоциональный интеллект','Шахматы','Блогинг','Испанский язык','Немецкий язык',
        'Олимпиадный русский язык','Не планирую'],
      ['Китайский язык','Французский язык','Математика и логика. Первые шаги в олимпиадах','Программирование на Python',
        'Создание сайтов','Компьютерная грамотность','Курс по разработке игр в Roblox','Графический дизайн в Figma',
        'Ораторское мастерство','Финансовая грамотность','Эмоциональный интеллект','Шахматы','Блогинг','Испанский язык',
        'Немецкий язык','Олимпиадный русский язык','Не планирую'],
      ['Китайский язык','Французский язык','Математика и логика. Первые шаги в олимпиадах','Программирование на Python',
        'Создание сайтов','Компьютерная грамотность','Курс по разработке игр в Roblox','Графический дизайн в Figma',
        'Ораторское мастерство','Финансовая грамотность','Эмоциональный интеллект','Шахматы','Блогинг','Испанский язык',
        'Немецкий язык','Олимпиадный русский язык','Не планирую'],
      ['Подготовка к ОГЭ по математике','Подготовка к ОГЭ по русскому языку','Подготовка к ОГЭ по биологии','Подготовка к ОГЭ по истории',
        'Подготовка к ОГЭ по английскому языку','Подготовка к ОГЭ по обществознанию','Подготовка к ОГЭ по физике','Подготовка к ОГЭ по химии',
        'Подготовка к ОГЭ по информатике','Подготовка к ОГЭ по географии','Подготовка к ОГЭ по литературе',
        'Китайский язык','Французский язык','Программирование на Python','Создание сайтов','Компьютерная грамотность',
        'Курс по разработке игр в Roblox','Графический дизайн в Figma','Ораторское мастерство','Финансовая грамотность',
        'Эмоциональный интеллект','Шахматы','Блогинг','Цифровые профессии','Испанский язык','Немецкий язык',
        'Подготовка к перечневым олимпиадам по математике','Олимпиадный русский язык','Не планирую'],
      ['Подготовка к ЕГЭ по математике','Подготовка к ЕГЭ по русскому языку','Подготовка к ЕГЭ по биологии','Подготовка к ЕГЭ по истории',
        'Подготовка к ЕГЭ по английскому языку','Подготовка к ЕГЭ по обществознанию','Подготовка к ЕГЭ по физике','Подготовка к ЕГЭ по химии',
        'Подготовка к ЕГЭ по информатике','Подготовка к ЕГЭ по географии','Подготовка к ЕГЭ по литературе',
        'Китайский язык','Французский язык','Программирование на Python','Создание сайтов','Графический дизайн в Figma',
        'Ораторское мастерство','Финансовая грамотность','Эмоциональный интеллект','Шахматы','Блогинг','Цифровые профессии',
        'Испанский язык','Немецкий язык','Подготовка к перечневым олимпиадам по математике','Олимпиадный русский язык','Не планирую'
      ],
      ['Подготовка к ЕГЭ по профильной математике','Подготовка к ЕГЭ по базовой математике','Подготовка к ЕГЭ по русскому языку',
        'Подготовка к ЕГЭ по биологии','Подготовка к ЕГЭ по истории',
        'Подготовка к ЕГЭ по английскому языку','Подготовка к ЕГЭ по обществознанию','Подготовка к ЕГЭ по физике','Подготовка к ЕГЭ по химии',
        'Подготовка к ЕГЭ по информатике','Подготовка к ЕГЭ по географии','Подготовка к ЕГЭ по литературе',
        'Китайский язык','Французский язык','Программирование на Python','Создание сайтов','Графический дизайн в Figma',
        'Ораторское мастерство','Финансовая грамотность','Эмоциональный интеллект','Шахматы','Блогинг','Цифровые профессии',
        'Испанский язык','Немецкий язык','Подготовка к перечневым олимпиадам по математике','Олимпиадный русский язык',
        'Не планирую']
    ]
  }

  let currentSlide = 0
  let classChosen
  const nextBtns = quiz.querySelectorAll('[data-element="quiz-next"]')
  const prevBtns = quiz.querySelectorAll('[data-element="quiz-prev"]')
  const slides = quiz.querySelectorAll('[data-element="quiz-inner"]')
  const form = quiz.querySelector('[data-element="quiz-form"]')
  const linkTo = form.getAttribute("data-docex")
  const wrap = quiz.querySelector('.quiz__wrap')
  const progress = quiz.querySelector('[data-element="quiz-progress"]')
  const progressFill = quiz.querySelector('[data-element="quiz-progress-bar-fill"]')

  function initValidate () {
    const button = slides[currentSlide].querySelector("[data-element='quiz-next']")
    const input = slides[currentSlide].querySelectorAll('.quiz__input')
    if (input[0].type === 'text') {
      for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('input', function () {
          button.disabled = !input[0].value || !input[1].value
        })
      }
    } else if (input[0].type === 'radio') {
      for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('input', function () {
          const checked = slides[currentSlide].querySelector("input:checked")
          button.disabled = !checked
        })
      }
    } else {
      const hidden = slides[currentSlide].querySelector('.quiz__hidden-checkbox')
      for (let i = 0; i < input.length; i++) {
        input[i].addEventListener('input', function () {
          const checked = slides[currentSlide].querySelectorAll("input:checked")
          button.disabled = !checked.length
          let temp = ''
          for (let j = 0; j < checked.length; j++) {
            temp += checked[j].value
            if (j !== checked.length - 1) temp += ', '
          }
          hidden.value = temp
        })
      }
    }
  }

  function initValidateLastSlide () {
    const inputs = slides[currentSlide].querySelectorAll('input')

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('change', validate)
    }
    function validate () {
      if (inputs[inputs.length - 1].checked) {
        for (let i = 0; i < inputs.length - 1; i++) {
          if (inputs[i].getAttribute('type') != 'hidden') {
            inputs[i].disabled = true
            inputs[i].closest('.quiz__label')?.classList?.add('disable')
          }
        }
      } else {
        for (let i = 0; i < inputs.length - 1; i++) {
          inputs[i].disabled = false
          inputs[i].closest('.quiz__label')?.classList?.remove('disable')
        }
      }
      let disableLastInput = false
      for (let i = 0; i < inputs.length - 1; i++) {
        if (inputs[i].checked) {
          inputs[inputs.length - 1].disabled = true
          inputs[inputs.length - 1].closest('.quiz__label').classList.add('disable')
          disableLastInput = true
        }
      }
      if (!disableLastInput) {
        inputs[inputs.length - 1].disabled = false
        inputs[inputs.length - 1].closest('.quiz__label').classList.remove('disable')
      }
    }
  }

  for (let i = 0; i < nextBtns.length; i++) {
    nextBtns[i].addEventListener('click', nextSlide)
  }

  for (let i = 0; i < prevBtns.length; i++) {
    prevBtns[i].addEventListener('click', prevSlide)
  }

  initValidate()

  function nextSlide () {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (currentSlide === 0) {
      progress.classList.remove('hide')
      wrap.classList.remove('quiz__wrap_first-slide')
    }
    if (currentSlide === 1) {
      classChosen = slides[currentSlide].querySelector('input:checked').value
      const button = slides[currentSlide + 2].querySelector('.quiz__button')
      if (classChosen === "0") {
        currentSlide += 1
        button.type = 'submit'
        button.textContent = 'Отправить ответы'
        button.disabled = true
      } else {
        button.type = 'button'
        button.textContent = 'Дальше'
        button.disabled = true
      }
    } else if (currentSlide === 2) {
      if (slides[currentSlide].querySelector('input:checked').value === "Да") {
        currentSlide += 1
      }
    } else if (currentSlide === 3 && classChosen === "0") {
      sendData()
    }

    if (currentSlide < slides.length - 1) {
      const generateListNode = slides[currentSlide + 1].querySelector('[data-element="quiz-generate"]')
      if (generateListNode) generateList(generateListNode)

      const oldActiveSlide = quiz.querySelector('.quiz__inner.active')
      oldActiveSlide.classList.remove('active')
      currentSlide += 1
      slides[currentSlide].classList.add('active')
      initValidate()
      if (currentSlide === slides.length - 1 || generateListNode) initValidateLastSlide()
    } else {
      sendData()
    }
    progressFill.style.width = Math.round(currentSlide/(slides.length - 1) * 100) + '%'
  }

  function prevSlide () {
    if (currentSlide > 0) {
      if (currentSlide === 1) {
        progress.classList.add('hide')
        wrap.classList.add('quiz__wrap_first-slide')
      }

      if (currentSlide === 4 && slides[2].querySelector('input:checked').value === "Да") {
        currentSlide -= 1
      } else if (currentSlide === 3 && classChosen === "0") {
        currentSlide -= 1
      }

      const oldActiveSlide = quiz.querySelector('.quiz__inner.active')
      oldActiveSlide.classList.remove('active')
      currentSlide -= 1
      slides[currentSlide].classList.add('active')

      progressFill.style.width = Math.round(currentSlide/(slides.length - 1) * 100) + '%'
    }
  }

  function sendData () {
    form.submit()
    setTimeout(() => {
      location.assign(linkTo)
    }, 100)
  }

  function generateList (list) {
    const type = list.getAttribute('data-type')
    const name = list.getAttribute('data-name')
    const array = (generateData[list.getAttribute('data-list')])[classChosen]
    list.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
      const nameInput = type === "radio" ? name : false
      let item
      if (nameInput) {
        item = `<label class="quiz__label">
        <input class="quiz__input" type="${type}" name="${nameInput}" value="${array[i]}">
        <div class="${'quiz__input-view quiz__input-view_' + type}"></div>
        <div class="quiz__input-text">${array[i]}</div>
      </label>`
      } else {
        item = `<label class="quiz__label">
        <input class="quiz__input" type="${type}" value="${array[i]}">
        <div class="${'quiz__input-view quiz__input-view_' + type}"></div>
        <div class="quiz__input-text">${array[i]}</div>
      </label>`
      }

      list.innerHTML += item
    }
  }
}

const reviewsTile = document.querySelector('.reviews-tile')

if (reviewsTile) reviewsTileInit()

function reviewsTileInit () {
  const config = { attributes: false, childList: true, characterData: true, subtree: false }
  const body = document.querySelector('body')
  const sidebar = reviewsTile.querySelector('.reviews-tile__sidebar')
  const openFilterBtn = reviewsTile.querySelector('.reviews-tile__filter')
  const closeFilterBtn = reviewsTile.querySelector('.reviews-tile__close')
  const inputs = reviewsTile.querySelectorAll('.reviews-tile__input')
  const filterNote = reviewsTile.querySelector('.reviews-tile__filter-note')
  const scrollTopBtn = document.querySelector('.reviews-tile__scroll-top')
  const reviewsTileCards = document.querySelector('.reviews-tile__cards')

  openFilterBtn.addEventListener('click', openFilters)
  closeFilterBtn.addEventListener('click', closeFilters)

  function openFilters () {
    sidebar.classList.add('active')
    body.classList.add('no-scroll')
  }

  function closeFilters () {
    sidebar.classList.remove('active')
    body.classList.remove('no-scroll')
  }

  function textsInit () {
    const texts = document.querySelectorAll('.reviews-tile__text')

    for (let i = 0; i < texts.length; i++) {
      const toggle = texts[i].parentElement.querySelector('.reviews-tile__toggle')
      if (texts[i].clientHeight > 230 && window.innerWidth >= 1440 || texts[i].clientHeight > 190 && window.innerWidth >= 744 && window.innerWidth < 1440 || texts[i].clientHeight > 350 && window.innerWidth < 744) {
        texts[i].classList.add('hide')
        toggle.addEventListener('click', () => toggleText(texts[i]))
      } else {
        toggle.style.display = 'none'
      }
    }

    function toggleText (text) {
      const toggle = text.parentElement.querySelector('.reviews-tile__toggle')
      if (text.classList.contains('hide')) {
        text.classList.remove('hide')
        console.log(text)
        toggle.innerHTML = 'Скрыть'
      } else {
        text.classList.add('hide')
        toggle.innerHTML = 'Показать полностью'
      }
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', (e) => sort(e))
  }

  async function makeFiltration (attr_type = '', attr_utm = '',p_paginate = 1) {
    if (typeof attr_type !== 'undefined' && attr_type !== false &&
      typeof attr_utm !== 'undefined' && attr_utm !== false) {
      if (typeof p_paginate == 'undefined' || p_paginate == false || p_paginate == null){
        p_paginate = 1;
      }
      console.log(attr_type);
      console.log(attr_utm);
      console.log(p_paginate);
      $.request('ModelUrl::onPaginateR', {
        data: {
          'pagePaginate': p_paginate,
          'utm_t': attr_utm,
          'type': attr_type,
        }
      });
    }
  }

  function sort (e, isMoreBtn) {
    closeFilters()
    if (!isMoreBtn) {
      window.scrollTo({ top: window.scrollY + reviewsTile.getBoundingClientRect().top - 180, behavior: 'smooth' })
      filterNote.innerHTML = e.currentTarget.value
    }
    let utm_f = reviewsTile.getAttribute('data-utm');
    let attr_type = e.currentTarget.getAttribute('data-value');
    let p_paginate = e.currentTarget.getAttribute('data-v');
    if(p_paginate > 1){
      $('.review___more_pagi').html("<div class='tile-loader'></div>");
    }else{
      $('.review___catalog_pagi').html("<div class='tile-loader'></div>");
      $('.review___more_pagi').html("");
    }
    makeFiltration (attr_type, utm_f, p_paginate);

  }

  function moreBtnInit () {
    const moreBtn = reviewsTile.querySelector('.reviews-tile__more')
    if (moreBtn) moreBtn.addEventListener('click', (e) => sort(e, true))
  }

  videoInit()
  textsInit()
  moreBtnInit()

  const observer = new MutationObserver(function() {
    videoInit()
    textsInit()
    moreBtnInit()
  })

  observer.observe(reviewsTileCards, config)

  function videoInit () {
    const videoBoxes = reviewsTile.querySelectorAll('.reviews-tile__video-box')

    for (let i = 0; i < videoBoxes.length; i++) {
      videoBoxes[i].addEventListener('click', playVideo)
    }

    function playVideo () {

        const oldActive = reviewsTile.querySelector('.reviews-tile__video-box.active')
        if (oldActive) {
          const video = oldActive.parentElement.querySelector('video')
          oldActive.classList.remove('active')
          video.pause()
        }

      this.classList.add('active')
      const that = this
      const video = this.parentElement.querySelector('video')
      if (video) {
        video.play()
        // video.addEventListener('pause', () => that.classList.remove('active'))
      }
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
    window.addEventListener('scroll', toggleAllCoursesTop, { passive: true })

    function toggleAllCoursesTop () {
      if (window.scrollY > 0) {
        scrollTopBtn.classList.add('active')
      } else {
        scrollTopBtn.classList.remove('active')
      }
    }
  }
}

const reviewsSlider = document.querySelector('.reviews__slider')

if (reviewsSlider) reviewsSliderInit()

function reviewsSliderInit () {
  const body = document.querySelector('body')
  const preReviewsSliderSwiper = new Swiper(reviewsSlider, {
    slidesPerView: 'auto',
    spaceBetween: 15,
    a11y: false,
    navigation: {
      nextEl: '.reviews__nav-btn.reviews__nav-btn_next',
      prevEl: '.reviews__nav-btn.reviews__nav-btn_prev',
    },
    scrollbar: {
      el: '.reviews__scrollbar',
      draggable: true,
    },
    breakpoints: {
      744: {
        spaceBetween: 20,
      },
      1440: {
        spaceBetween: 30,
      }
    }
  })

  const videos = reviewsSlider.querySelectorAll('.reviews__video')

  for (let i = 0; i < videos.length; i++) {
    initVideo(videos[i])
  }

  function initVideo (video) {
    const box = video.closest('.reviews__box')
    box.addEventListener('click', playVideo)
    video.addEventListener('click', stopVideo)

    function playVideo () {
      const oldBox = reviewsSlider.querySelector('.reviews__box.active')
      if (oldBox) {
        const oldVideo = oldBox.querySelector('.reviews__video')
        if (oldVideo) oldVideo.pause()
        oldBox.classList.remove('active')
      }
      video.play()
      box.classList.add('active')
    }

    function stopVideo (e) {
      e.stopPropagation()
      video.pause()
      box.classList.remove('active')
    }
  }

  const inners = reviewsSlider.querySelectorAll('.reviews__inner')

  for (let i = 0; i < inners.length; i++) {
    initInner(inners[i])
  }

  function initInner (inner) {
    const btn = inner.querySelector('.reviews__toggle')

    if (inner.clientHeight > 260) {
      inner.classList.add('hide')
      btn.addEventListener('click', toggle)
    } else {
      btn.remove()
    }

    function toggle () {
      if (inner.classList.contains('hide')) {
        inner.classList.remove('hide')
        btn.innerHTML = 'Скрыть'
        inner.classList.add('show')
        const oldBox = reviewsSlider.querySelector('.reviews__box.active')
        if (oldBox) {
          const oldVideo = oldBox.querySelector('.reviews__video')
          if (oldVideo) oldVideo.pause()
        }
        createModal(inner, btn)
      } else {
        inner.classList.add('hide')
        btn.innerHTML = 'Читать весь отзыв'
        inner.classList.remove('show')
      }
    }

    function createModal(innerOld) {
      const slide = innerOld.closest('.reviews__slide')
      const videoOld = slide.querySelector('.reviews__video')
      const imageOld = slide.querySelector('.reviews__image')
      const textOld = slide.querySelector('.reviews__text')
      const nameOld = slide.querySelector('.reviews__name')
      const noteOld = slide.querySelector('.reviews__note')

      const modal = document.createElement('div')
      modal.classList.add('review-modal')

      const layer = document.createElement('div')
      layer.classList.add('review-modal__layer')

      const inner = document.createElement('div')
      inner.classList.add('review-modal__inner')

      const close = document.createElement('button')
      close.classList.add('review-modal__close')

      const left = document.createElement('div')
      left.classList.add('review-modal__left')

      const box = document.createElement('div')
      box.classList.add('review-modal__box')

      const image = document.createElement('img')
      image.classList.add('review-modal__image')

      const name = document.createElement('div')
      name.classList.add('review-modal__name')

      const note = document.createElement('div')
      note.classList.add('review-modal__note')

      const right = document.createElement('div')
      right.classList.add('review-modal__right')

      const text = document.createElement('div')
      text.classList.add('review-modal__text')

      image.src = imageOld.src

      if (videoOld) {
        const play = document.createElement('div')
        play.classList.add('review-modal__play')
        const video = document.createElement('video')
        video.classList.add('review-modal__video')
        box.classList.add('review-modal__box_video')
        video.src = videoOld.src
        box.append(play)
        box.append(video)

        box.addEventListener('click', playVideo)
        video.addEventListener('click', stopVideo)

        function playVideo () {
          video.play()
          box.classList.add('active')
        }

        function stopVideo (e) {
          e.stopPropagation()
          video.pause()
          box.classList.remove('active')
        }
      }

      box.append(image)
      left.append(box)
      name.innerHTML = nameOld.innerHTML
      note.innerHTML = noteOld.innerHTML
      left.append(name)
      left.append(note)
      text.innerHTML = textOld.innerHTML
      right.append(text)
      inner.append(close)
      inner.append(left)
      inner.append(right)
      modal.append(layer)
      modal.append(inner)

      layer.addEventListener('click', closeModal)
      close.addEventListener('click', closeModal)

      const main = document.querySelector('main')
      main.append(modal)

      body.classList.add('no-scroll-desktop')

      function closeModal () {
        modal.remove()
        innerOld.classList.add('hide')
        btn.innerHTML = 'Читать весь отзыв'
        innerOld.classList.remove('show')
        body.classList.remove('no-scroll-desktop')
      }
    }
  }

}

if (document.querySelector('[data-role="scroll-to-anchor"]')) initScrollToAnchor()

function initScrollToAnchor () {
  const anchorElements = document.querySelectorAll('[data-role="scroll-to-anchor"]')

  for (let i = 0, len = anchorElements.length; i < len; i++) _loopAddEventScrollToAnchor(anchorElements[i])

  function _loopAddEventScrollToAnchor (node) {
    node.addEventListener('click', clickOnTheScrollElement)
  }
}

function clickOnTheScrollElement (event) {
  event.preventDefault()
  let elementId
  if (this.hash) elementId = this.hash.substr(1)
  else elementId = this.getAttribute('scroll-to-anchor-id')?.substr(1)
  const element = document.getElementById(elementId)
  const offset = this.getAttribute('scroll-offset')
  if (element) animateScrollToAnchor(element, offset)
}

function animateScrollToAnchor (theElement, offset) {
  if (!offset) {
    const banner = document.querySelector('.discount')
    const bannerHeight = banner ? banner.clientHeight : 0
    if (window.innerWidth < 744) {
      offset = 84 + bannerHeight
    } else if (window.innerWidth < 1200) {
      offset = 102 + bannerHeight
    } else {
      offset = 120 + bannerHeight
    }
  }
  const positionNow = window.pageYOffset
  const positionElement = theElement.getBoundingClientRect().top + scrollY - offset
  const duration = 200
  const step = positionElement - positionNow
  const start = performance.now()

  requestAnimationFrame(function animate (time) {
    const timePassed = time - start

    if (timePassed > duration) {
      window.scrollTo(0, positionElement)
    } else {
      window.scrollTo(0, positionNow + step * (timePassed / duration))
      requestAnimationFrame(animate)
    }
  })
}

const stageToggles = document.querySelectorAll('.header__stages-button')

if (stageToggles.length) stageTogglesInit()

function stageTogglesInit () {
  for (let i = 0; i < stageToggles.length; i++) {
    stageToggles[i].addEventListener('click', toggleStage)
  }

  function toggleStage () {
    const id = this.getAttribute('data-stage-id')
    const blocks = document.querySelectorAll("[data-stage-number='" + id + "']")

    for (let i = 0; i < blocks.length; i++) {
      blocks[i].classList.remove('stage-block-hide')
    }

    const oldToggle = document.querySelector('.header__stages-button.active')
    const oldId = oldToggle.getAttribute('data-stage-id')
    const oldBlocks = document.querySelectorAll("[data-stage-number='" + oldId + "']")

    for (let i = 0; i < oldBlocks.length; i++) {
      oldBlocks[i].classList.add('stage-block-hide')
    }

    this.classList.add('active')
    oldToggle.classList.remove('active')
  }
}

const tile = document.querySelector('.tile')

if (tile) tileInit()

function tileInit () {
  const tileTabs = tile.querySelectorAll('.tile__tab')
  const tiles = tile.querySelectorAll('.tile__tile')

  tileTabs.forEach((tab) => {
    tab.addEventListener('click', toggleTab)
  })

  function toggleTab () {
    const oldTab = tile.querySelector('.tile__tab.active')
    if (oldTab) oldTab.classList.remove('active')
    this.classList.add('active')

    const oldTile = tile.querySelector('.tile__tile.active')
    if (oldTile) oldTile.classList.remove('active')
    // oldTile.style.opacity = '0'
    // setTimeout(() => oldTile.style.display = 'none', 200)


    const id = this.getAttribute('data-id')
    tiles[id].classList.add('active')
  }
}

const timers = document.querySelectorAll('[data-element="timer"]')

for (let i = 0; i < timers.length; i++) {
  timersInit(timers[i])
}

function timersInit (timer) {
  const date = timer.getAttribute('date-end')
  const countDownDate = new Date(date).getTime()

  const nodes = timer.querySelectorAll('[data-element="timer-number"]')

  const interval = setInterval(updateTimer, 1000)

  function updateTimer () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    nodes[0].innerHTML = days
    nodes[1].innerHTML = hours
    nodes[2].innerHTML = minutes
    nodes[3].innerHTML = seconds

    if (distance < 0) {
      clearInterval(interval);
      nodes[0].innerHTML = "0"
      nodes[1].innerHTML = "0"
      nodes[2].innerHTML = "0"
      nodes[3].innerHTML = "0"
    }
  }
}

const trialFamilyStart = document.querySelector('#trial-family-start')

if (trialFamilyStart) trialFamilyStartInit()

function trialFamilyStartInit () {
  const opener = trialFamilyStart.querySelector("[data-element='trial-family-start-filter-opener']")
  const inputs = trialFamilyStart.querySelectorAll("[data-element='trial-family-start-filter-input']")
  const text = trialFamilyStart.querySelector(".trial-family-start__filter-top-text")
  const number = trialFamilyStart.querySelector(".trial-family-start__number")
  const button = trialFamilyStart.querySelector(".trial-family-start__button")

  opener.addEventListener('click', toggleSelect)

  function toggleSelect() {
    if (opener.classList.contains('active')) {
      opener.classList.remove('active')
    } else {
      const oldOpen = trialFamilyStart.querySelector(".trial-family-start__filter-top.active")
      if (oldOpen) oldOpen.classList.remove('active')
      opener.classList.add('active')
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', setValue)
  }

  function setValue () {
    opener.classList.remove('active')
    text.innerHTML = this.getAttribute('data-number')
    number.innerHTML = this.getAttribute('data-number')
    button.href = this.value
  }
}

const trialTile = document.getElementById("trial-tile")

if (trialTile) trialTileInit()

function trialTileInit () {
  const config = { attributes: true, childList: true, characterData: true, subtree: true }
  const openers = trialTile.querySelectorAll("[data-element='trial-tile-filter-opener']")
  const grades = trialTile.querySelector("[data-ftype='class_select']")
  const subjects = trialTile.querySelector("[data-ftype='class_subjects']")

  const observer = new MutationObserver(function() {
    const wrap = openers[1].nextElementSibling
    const items = wrap.querySelectorAll("[data-element='trial-tile-filter-input']")
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[1], wrap))
    })
  })

  const reset = trialTile.querySelector("[data-element='trial-tile-filter-reset']")
  if (reset) reset.addEventListener('click', resetFilters)

  function resetFilters () {
    for (let i = 0; i < openers.length; i++) {
      const wrap = openers[i].nextElementSibling
      const items = wrap.querySelectorAll("[data-element='trial-tile-filter-input']")
      items.forEach((item) => {
        item.checked = false
      })
      updateFilter(openers[i], wrap)
    }
    makeFiltration();
  }

  for (let i = 0; i < openers.length; i++) {
    openers[i].addEventListener("click", ()=> openFilter(openers[i]))
    const wrap = openers[i].nextElementSibling
    const button = wrap.querySelector("[data-element='trial-tile-filter-save']")
    if (button) button.addEventListener("click", ()=> closeFilter(openers[i], wrap))
    const items = wrap.querySelectorAll("[data-element='trial-tile-filter-input']")
    items.forEach((item) => {
      item.addEventListener('change', () => updateFilter(openers[i], wrap))
      if (!button) item.addEventListener('change', () => closeFilter(openers[i], wrap))
    })
    if (i === 1) {
      window.onload = function() {
        observer.observe(wrap, config)
      }
    }
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
    const itemsAll = trialTile.querySelectorAll(["input:checked"])
    if (itemsAll.length) {
      if (reset) reset.style.display = 'flex'
    } else {
      if (reset) reset.style.display = 'none'
    }
  }

  function openFilter (opener) {
    if (opener.classList.contains('active')) {
      closeFilter(opener)
    } else {
      const oldOpen = trialTile.querySelector(".trial-tile__filter-top.active")
      if (oldOpen) oldOpen.classList.remove('active')
      opener.classList.add('active')

      const filter = opener.parentElement
      const oldFilter = trialTile.querySelector(".trial-tile__filter.open")
      if (oldFilter) oldFilter.classList.remove('open')
      if (filter) filter.classList.add('open')
    }
  }

  function closeFilter (opener) {
    opener.classList.remove('active')
    const filter = opener.parentElement
    if (filter) filter.classList.remove('open')

    makeFiltration();
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
    //   let promo_f = trialTile.getAttribute('data-promo');
    //console.log(grades_result)
    //console.log(subjects_result)
    let utm_f = trialTile.getAttribute('data-utm');
    $('.filtered_elements').html("<div class='tile-loader'></div>");
    // if(promo_f != null && promo_f != '' && promo_f != undefined){
    //     $.request('AllCourseFunctions::onPaginateAllCourses', {
    //             data: {
    //               'grade': grades_result,
    //               'subject': subjects_result,
    //               'promo': promo_f,
    //             }
    //         })
    // }else{
    $.request('AllCourseFunctions::onPaginateAllSCourses', {
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

}
