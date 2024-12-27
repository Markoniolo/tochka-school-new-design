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

  name.addEventListener('click', toggleSidebar)
  layer.addEventListener('click', closeSidebar)

  function toggleSidebar () {
    name.classList.toggle('active')
  }

  function closeSidebar () {
    name.classList.remove('active')
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

const selectArray = document.querySelectorAll('[data-role="custom-select"]')

for (let i = 0; i < selectArray.length; i++) {
  customSelect(selectArray[i])
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

const newsletterForm = document.querySelector("[data-element='newsletter']")
if (newsletterForm) globalFormInit(newsletterForm, 'onSendSubscribeMessage', 'newsletterFormData')

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
    'class_name': globalForm.querySelector("[name='class_name']").options[globalForm.querySelector("[name='class_name']").selectedIndex].value,
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

  const news = form.querySelector('[name="news"]')
  const policy = form.querySelector('[name="policy"]')
  const classSelect = globalForm.querySelector('.modal-order__select')

  if (news) news.addEventListener('change', () => news.closest('label').classList.remove('error-text'))
  if (policy) policy.addEventListener('change',() => policy.closest('label').classList.remove('error-text'))
  if (classSelect) classSelect.addEventListener('change',() => classSelect.closest('.custom-select-container').querySelector('.custom-select-opener').classList.remove('error'))

  let iti

  if (input) {
    iti = window.intlTelInput(input, {
      utilsScript: "../libs/intlTelInputWithUtils.min",
      initialCountry: 'ru',
      separateDialCode: true
    })

    input.addEventListener('input', function () {
      this.value = this.value.replace(/\D+/g, '')
      inputHidden.value = input.value
      if (iti.selectedCountryData.dialCode === "7" && input.value.length > 10) {
        inputHidden.value = input.value.substring(input.value.length - 10)
      }
      inputHidden.value = iti.selectedCountryData.dialCode + inputHidden.value
    })
  }

  function resetError () {
    if (input) input.classList.remove("error")
  }

  globalForm.addEventListener('submit', async (e) => {
    resetError()
    e.preventDefault()
    if (input && !input?.value?.trim()) {
      input.classList.add("error")
    } else if (iti?.isValidNumber() || !input) {

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
      if (classSelect) {
        if (!classSelect.value) {
          const opener = classSelect.closest('.custom-select-container').querySelector('.custom-select-opener')
          opener.classList.add('error')
          isValid = false
        }
      }

      if (isValid) {
        globalForm.submit()
        btnSubmit.disabled = true
        setTimeout(() => {
          clearForm()
          location.assign(linkTo)
        }, 100)
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

const header = document.querySelector('[data-element="header"]')

if (header) headerInit()

function headerInit () {
  const body = document.querySelector('body')

  window.addEventListener('scroll', checkHeader, { passive: true })

  checkHeader()

  function checkHeader () {
    if (window.scrollY > 10) {
      header.classList.add('header_white')
    } else {
      header.classList.remove('header_white')
    }
  }

  const menuBtn = document.querySelector('.header__nav-item_menu')
  const layer = document.querySelector('.header__layer')

  menuBtn.addEventListener('click', toggleMenu)
  layer.addEventListener('click', closeMenu)

  function toggleMenu () {
    header.classList.toggle('open')
    body.classList.toggle('no-scroll')
  }

  function closeMenu () {
    header.classList.remove('open')
    body.classList.remove('no-scroll')
  }
}

if (document.querySelector('[data-role="scroll-to-anchor"]')) setTimeout(initScrollToAnchor, 0)

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
  if (this.dataset.link) elementId = this.dataset.link.substr(1)
  else elementId = this.hash.substr(1)
  const element = document.getElementById(elementId)
  if (element) animateScrollToAnchor(element)
}

function animateScrollToAnchor (theElement) {
  const positionNow = window.pageYOffset
  const positionElement = theElement.getBoundingClientRect().top + pageYOffset - 180
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
