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
