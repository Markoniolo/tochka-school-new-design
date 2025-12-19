const predzapsThanks = document.querySelector('.predzaps-thanks')

if (predzapsThanks) predzapsThanksInit()

function predzapsThanksInit () {
  const form = predzapsThanks.querySelector('.predzaps-thanks__slide_form')
  const tgSlide = predzapsThanks.querySelector('.predzaps-thanks__slide_tg')
  const lastSlide = predzapsThanks.querySelector('.predzaps-thanks__slide_last')
  const tgButton = predzapsThanks.querySelector('.predzaps-thanks__tg-button')
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')
  const addButton = predzapsThanks.querySelector(".predzaps-thanks__form-add")
  const btnSubmit = predzapsThanks.querySelector(".predzaps-thanks__form-submit")
  const inners = predzapsThanks.querySelectorAll('.predzaps-thanks__form-line-inner')
  const lines = predzapsThanks.querySelector(".predzaps-thanks__form-lines")
  const innerCleanCopy = inners[inners.length - 1].cloneNode(true)
  let counter = inners.length

  function initOpeners (inner) {
    const openers = inner.querySelectorAll("[data-element='all-courses-filter-opener']")
    for (let i = 0; i < openers.length; i++) {
      openers[i].addEventListener("click", (e)=> openFilter(openers[i], e))

      const wrap = openers[i].nextElementSibling

      const closeBtn = wrap.querySelector('.all-courses__filter-close')
      if (closeBtn) closeBtn.addEventListener('click', () => closeFilter(openers[i]))

      const items = wrap.querySelectorAll("[data-element='all-courses-filter-input']")
      items.forEach((item) => {
        item.addEventListener('change', () => updateFilter(openers[i], wrap))
      })

      const confirm = wrap.querySelector('.all-courses__confirm')
      if (confirm) confirm.addEventListener('click', () => closeFilter(openers[i]))
    }
  }

  function removeInputNameError (inner) {
    const input = inner.querySelector('.predzaps-thanks__form-input')
    input.addEventListener('input', () => input.classList.remove('error-input'))
  }

  inners.forEach(inner => {
    removeInputNameError(inner)
    initTabs(inner)
    initOpeners(inner)
    initDeleteButton(inner)
  })

  function initDeleteButton (inner) {
    const buttonDelete = inner.querySelector('.predzaps-thanks__form-delete')
    buttonDelete.addEventListener('click', () => {
      const dataCounter = buttonDelete.getAttribute('data-counter')
      inner.remove()
      counter -= 1
      updateCounter(dataCounter)
      if (counter < 7) addButton.disabled = false
    })
  }

  function updateCounter (dataCounter) {
    const inners = document.querySelectorAll('.predzaps-thanks__form-line-inner')
    for (let i = dataCounter - 1; i < inners.length; i++) {
      const lineName = inners[i].querySelector('.predzaps-thanks__form-line-name')
      if (lineName) lineName.innerHTML = `Ребёнок ${i+1}`
      const inputName = inners[i].querySelector('.predzaps-thanks__form-input')
      if (inputName) inputName.setAttribute('name', `name${i+1}`)
      const classInputs = inners[i].querySelectorAll('.all-courses__filter_class input')
      classInputs.forEach((input) => {
        input.setAttribute('name', `grade${i+1}`)
      })
      const subjectInputs = inners[i].querySelectorAll('.all-courses__filter_subject input')
      subjectInputs.forEach((input) => {
        input.setAttribute('name', `subject${i+1}`)
      })
      const deleteButton = inners[i].querySelector('.predzaps-thanks__form-delete')
      if (deleteButton) deleteButton.setAttribute('data-counter', i+1)
    }
  }


  function initTabs (inner) {
    const filterSubjectWrap = inner.querySelector('.all-courses__filter-wrap_subject')
    const list = filterSubjectWrap.querySelector('.all-courses__filter-list')
    const tabsParent = filterSubjectWrap.querySelector('.all-courses__filter-tabs')
    const tabs = filterSubjectWrap.querySelectorAll('.all-courses__filter-tab')
    const subjectsBoxes = filterSubjectWrap.querySelectorAll('.all-courses__filter-box')

    if (!tabs.length || !subjectsBoxes.length) return

    filterSubjectWrap.addEventListener('scroll', wrapScrollHandler, { passive: true })

    function wrapScrollHandler () {
      subjectsBoxes.forEach((subjectBox) => {
        if (filterSubjectWrap.scrollTop >= subjectBox.offsetTop - 90 - 65) {
          const oldTab = filterSubjectWrap.querySelector('.all-courses__filter-tab.active')
          if (oldTab) oldTab.classList.remove('active')
          const index = subjectBox.getAttribute('data-index')
          const tab = filterSubjectWrap.querySelector('[data-index="' + index + '"]')
          if (tab) {
            tabsParent.scrollLeft = tab.offsetLeft - tabsParent.clientWidth/2 + tab.clientWidth/2
            tab.classList.add('active')
          }
        }
      })
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', changeTab)

      function changeTab (e) {
        e.stopPropagation()
        filterSubjectWrap.removeEventListener('scroll', wrapScrollHandler, { passive: true })
        const oldTab = filterSubjectWrap.querySelector('.all-courses__filter-tab.active')
        if (oldTab) oldTab.classList.remove('active')

        this.classList.add('active')

        subjectsBoxes.forEach((subjectsBox) => {
          subjectsBox.classList.add('hide')
        })

        const index = this.getAttribute('data-index')
        const activeSubjectsBox = list.querySelector('[data-index="' + index + '"]')
        activeSubjectsBox.classList.remove('hide')

        filterSubjectWrap.scrollTop = activeSubjectsBox.offsetTop - 90 - 60

        tabsParent.scrollLeft = this.offsetLeft - tabsParent.clientWidth/2 + this.clientWidth/2
        setTimeout(() => filterSubjectWrap.addEventListener('scroll', wrapScrollHandler, { passive: true }), 1000)
      }
    })

    tabs[0].click()
  }

  function updateFilter(opener, wrap) {
    opener.classList.remove('error-input')
    if (opener.getAttribute('data-ftype') === 'class_select') {
      const text = opener.querySelector('.all-courses__filter-top-text')
      text.style.color = '#000'
      text.innerHTML = wrap.querySelector('.all-courses__filter-input:checked').nextElementSibling.textContent
      closeFilter(opener, wrap)
    }
    if (opener.getAttribute('data-ftype') === 'class_subjects') {
      const headline = wrap.querySelector('.all-courses__filter-headline')
      headline.innerHTML = `Выбрано предметов: ${wrap.querySelectorAll('.all-courses__filter-input:checked').length}`
      const text = opener.querySelector('.all-courses__filter-top-text')
      text.style.color = '#000'
      text.innerHTML = `Выбрано предметов: ${wrap.querySelectorAll('.all-courses__filter-input:checked').length}`
    }
  }

  function openFilter (opener, e) {
    e.stopPropagation()
    if (opener.classList.contains('active')) {
      closeFilter(opener)
    } else {
      const oldOpen = predzapsThanks.querySelector(".all-courses__filter-top.active")
      if (oldOpen) oldOpen.classList.remove('active')
      opener.classList.add('active')

      const filter = opener.parentElement
      const oldFilter = predzapsThanks.querySelector(".all-courses__filter.open")
      if (oldFilter) oldFilter.classList.remove('open')
      if (filter) filter.classList.add('open')
    }
    hideHeader()
  }

  function closeFilter (opener) {
    opener.classList.remove('active')
    const filter = opener.parentElement
    if (filter) filter.classList.remove('open')
    showHeader()
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

  tgButton.addEventListener('click', () => {
    setTimeout(() => {
      tgSlide.classList.remove('active')
      lastSlide.classList.add('active')
    }, 10000)
  })

  form.addEventListener('submit', submitForm)

  function createSendData () {
    const names = []
    const nameInputs = form.querySelectorAll('.predzaps-thanks__form-input')
    nameInputs.forEach(nameInput => {
      names.push(nameInput.value)
    })
    const classes = []
    const classes_ids = []
    const classInputs = form.querySelectorAll('.all-courses__filter_class input:checked')
    classInputs.forEach(classInput => {
      classes.push(classInput.dataset.text)
      classes_ids.push(classInput.value)
    })
    const subjects = []
    const subjects_ids = []
    const inners = form.querySelectorAll('.predzaps-thanks__form-line-inner')

    inners.forEach(inner => {
      const subjectsOneChild = inner.querySelectorAll('.all-courses__filter_subject input:checked')
      const temp = []
      const temp_ids = []
      subjectsOneChild.forEach(subject => {
        temp.push(subject.dataset.text)
        temp_ids.push(subject.value)
      })
      subjects.push(temp)
      subjects_ids.push(temp_ids)
    })

    const summer_answers = []
    const checkboxes = form.querySelectorAll('.predzaps-thanks__summer-input')
    checkboxes.forEach(checkbox => {
      summer_answers.push(checkbox.checked ? 'да' : 'нет')
    })

    const formData = new FormData(form);
    const formObject = {};
    const childrenFieldNames = new Set();

    nameInputs.forEach(input => childrenFieldNames.add(input.name));
    classInputs.forEach(input => childrenFieldNames.add(input.name));
    inners.forEach(inner => {
      inner.querySelectorAll('.all-courses__filter_subject input').forEach(input => {
        childrenFieldNames.add(input.name);
      });
    });

    formData.forEach((value, key) => {
      if (!childrenFieldNames.has(key)) {
        if (key in formObject) {
          if (Array.isArray(formObject[key])) {
            formObject[key].push(value);
          } else {
            formObject[key] = [formObject[key], value];
          }
        } else {
          formObject[key] = value;
        }
      }
    });
    const children = [];
    const children_ids = [];
    const maxLen = Math.max(names.length, classes.length, subjects.length, summer_answers.length);

    for (let i = 0; i < maxLen; i++) {
      children.push({
        name: names[i] ?? null,
        class: classes[i] ?? null,
        subjects: subjects[i] ?? [],
        summer_answer: summer_answers[i] ?? null,
      });
      children_ids.push({
        name: names[i] ?? null,
        class: classes_ids[i] ?? null,
        subjects: subjects_ids[i] ?? [],
        summer_answer: summer_answers[i] ?? null,
      });
    }

    formObject.children = children;
    formObject.children_ids = children_ids;

    return formObject;
  }

  function submitForm (e) {
    e.preventDefault()
    e.stopPropagation()
    if (validate()) {
      btnSubmit.disabled = true
      btnSubmit.classList.add('loading')
      const data = createSendData()
      console.log(data)
      const dataRequest = form.getAttribute('data-request');
      $.request('MainFunctions::' + dataRequest, {
        data: data,
        success: function(response) {
          // console.log('Ответ:', response);
          let hasErrors = false;

          for (let key in response) {
            if (key.startsWith('.')) {
              const className = key.substring(1);
              const element = document.querySelector('.' + className);

              if (element) {
                element.innerHTML = response[key];
                hasErrors = true;
                btnSubmit.disabled = false
                btnSubmit.classList.remove('loading')
              }
            }
          }



          if (hasErrors) {
            //   isSubmitting = false;
            return;
          }
          removeParameterFromUrl('cemail')
          form.classList.remove('active')
          tgSlide.classList.add('active')
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        },
        error: function (error) {
          // console.error('❌ Ошибка отправки:', error);
        }
      });
    }
  }

  function removeParameterFromUrl (keyToRemove) {
    const url = new URL(window.location.href)
    const params = url.searchParams
    params.delete(keyToRemove)
    window.history.replaceState({}, document.title, url.toString())
  }


  addButton.addEventListener('click', addLine)

  function addLine () {
    if (validate()) {
      counter += 1
      lines.append(innerCleanCopy.cloneNode(true))
      const inners = predzapsThanks.querySelectorAll('.predzaps-thanks__form-line-inner')
      const inner = inners[inners.length - 1]
      removeInputNameError(inner)
      updateNames(inner)
      initTabs(inner)
      initOpeners(inner)
      initDeleteButton(inner)
      if (window.innerHeight - inner.getBoundingClientRect().bottom < 0) {
        inner.scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        })
      }
      if (counter >= 7) addButton.disabled = true
    }
  }

  function updateNames (inner) {
    const lineName = inner.querySelector('.predzaps-thanks__form-line-name')
    lineName.innerHTML = `Ребенок ${counter}`
    const inputs = inner.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].name = `${inputs[i].name}${counter}`
    }
    const deleteButton = inner.querySelector('.predzaps-thanks__form-delete')
    if (deleteButton) deleteButton.setAttribute('data-counter', counter)
  }

  function validate () {
    const inners = predzapsThanks.querySelectorAll('.predzaps-thanks__form-line-inner')
    for (let i = 0; i < inners.length; i++) {
      const isValid = checkInputs(inners[i])
      if (!isValid) return false
    }
    function checkInputs(inner) {
      const nameInput = inner.querySelector(".predzaps-thanks__form-input")
      if (!nameInput.value) {
        nameInput.classList.add('error-input')
        return false
      }
      const classInput = inner.querySelector(".all-courses__filter_class input:checked")
      if (!classInput) {
        const top = inner.querySelector(".all-courses__filter_class .all-courses__filter-top")
        top.classList.add('error-input')
        return false
      }
      const subjectInput = inner.querySelector(".all-courses__filter_subject input:checked")
      if (!subjectInput) {
        const top = inner.querySelector(".all-courses__filter_subject .all-courses__filter-top")
        top.classList.add('error-input')
        return false
      }
      return true
    }
    return true
  }
}
