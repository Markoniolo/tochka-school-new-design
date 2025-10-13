const quizNew = document.querySelector('[data-element="quiz-new"]')

if (quizNew) quizSoInit()

function quizSoInit () {
  let index = 0
  const slides = quizNew.querySelectorAll('[data-element="quiz-so-slide"]')
  const buttonsNext = quizNew.querySelectorAll('[data-element="quiz-so-slide-next"]')
  const buttonsBack = quizNew.querySelectorAll('[data-element="quiz-so-slide-back"]')
  const btnSubmit = quizNew.querySelector('.btn-warning')
  const input = quizNew.querySelector("[data-element='input-phone-intl']")
  const inputName = quizNew.querySelector(".quiz-so-slide__form-input_name")
  const inputHidden = quizNew.querySelector("[data-element='input-phone-hidden']")
  const policyCheckboxes = quizNew.querySelectorAll('.quiz-so-slide__checkbox-input')
  const linkTo = quizNew.getAttribute("data-docex")
  const utm_input = quizNew.querySelector('[name="utm"]')
  const inputsRadio = quizNew.querySelectorAll('.quiz-so-slide__input[type="radio"]')

  buttonsNext.forEach(button => {
    button.addEventListener('click', nextSlide)
  })

  window.addEventListener('resize', () => {
    quizNew.style.height = `${slides[index].clientHeight}px`
  }, { passive: true })

  function nextSlide () {
    if (slides[index].querySelector('.quiz-so-slide__input') && !slides[index].querySelector('.quiz-so-slide__input:checked')) {
      const inputs = slides[index].querySelectorAll('.quiz-so-slide__input')
      inputs.forEach(input => {
        input.classList.add('error')
        input.addEventListener('change', resetError, { once: true })
      })
      function resetError () {
        inputs.forEach(input => {
          input.classList.remove('error')
        })
      }
    } else if (index === slides.length - 1) {

    } else {
      slides[index].classList.remove('active')
      index += 1
      slides[index].classList.add('active')
      quizNew.style.height = `${slides[index].clientHeight}px`
    }
  }

  policyCheckboxes.forEach(policyCheckbox => {
    policyCheckbox.addEventListener('change', () => {
      policyCheckbox.parentNode.classList.remove('error')
    })
  })

  if (inputName) inputName.addEventListener('input', () => {
    inputName.classList.remove('error')
  })

  buttonsBack.forEach(button => {
    button.addEventListener('click', prevSlide)
  })

  function prevSlide () {
    if (index === 0) return
    slides[index].classList.remove('active')
    index -= 1
    slides[index].classList.add('active')
    quizNew.style.height = `${slides[index].clientHeight}px`
  }

  initLoaders()

  function initLoaders () {
    slides.forEach((slide, index) => {
      const quizSoSlideLoaderFill = slide.querySelector('.quiz-so-slide__loader-fill')
      if (quizSoSlideLoaderFill) quizSoSlideLoaderFill.style.width = `${100 * index / slides.length}%`
      const quizSoSlideLoaderMobValue = slide.querySelector('.quiz-so-slide__loader-mob-value')
      if (quizSoSlideLoaderMobValue) quizSoSlideLoaderMobValue.innerHTML = Math.round(`${100 * index / slides.length}`) + '%'
      const quizSoSlideLoaderMobProgress = slide.querySelector('.quiz-so-slide__loader-mob-progress')
      if (quizSoSlideLoaderMobProgress) quizSoSlideLoaderMobProgress.style.strokeDashoffset = 250 - (140 * `${index / slides.length}`)
    })
  }

  if (input && inputHidden) {
    iti = window.intlTelInput(input, {
      utilsScript: "../libs/intlTelInputWithUtils.min",
      initialCountry: 'ru',
      separateDialCode: true,
      strictMode: true
    })

    input.addEventListener('input', function () {
      input.classList.remove('error')
      let tempValue = input.value
      inputHidden.value = input.value
      const cleanNumber = tempValue.replace(/[^+\d]/g, '')
      if (iti.selectedCountryData.dialCode === "7" && cleanNumber.length > 10) {
        inputHidden.value = cleanNumber.substring(cleanNumber.length - 10)
      }
      inputHidden.value = iti.selectedCountryData.dialCode + ' ' + inputHidden.value
    })
  }
  quizNew.addEventListener('submit', async (e) => {
    e.preventDefault()
    let isValid = true
    if (input && !input?.value?.trim() || !iti?.isValidNumber()) {
      input.classList.add("error")
      isValid = false
    }
    if (!inputName.value) {
      inputName.classList.add("error")
      isValid = false
    }
    if (!policyCheckboxes[0].checked) {
      policyCheckboxes[0].parentNode.classList.add("error")
      isValid = false
    }
    if (!policyCheckboxes[1].checked) {
      policyCheckboxes[1].parentNode.classList.add("error")
      isValid = false
    }

    if (!isValid) {
      return false;
    }
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
    btnSubmit.disabled = true;
    //quizSo.submit()
    // var obData = {};
    // const whitelist = [
    //     'tel',
    //     'name',
    //     'policy',
    //     'news',
    //     'page_name',
    //     'utm',
    //     'class',
    //     'current-education-plan',
    //     'has-troubles',
    //     'school-position',
    //     'family-education-plan',
    //     'study-format',
    //     'need-help',
    //     'pay-format'];

    // inputsAll.forEach(input => {
    //   if (input.name && whitelist.includes(input.name)) {
    //       obData[input.name] = input.value;
    //   }
    // });

    // $.request('MainFunctions::onSendQuizSo', {
    //   data: obData,
    //     // success: function(data) {
    //     //     console.log(linkTo)
    //     //     //location.assign(linkTo)
    //     // },
    // })

    setTimeout(() => {
      location.assign(linkTo_)
    }, 100)

  })

  slides.forEach(slide => {
    const hidden = slide.querySelector('.quiz-so-slide__hidden-checkbox')
    if (!hidden) return
    const inputs = slide.querySelectorAll('.quiz-so-slide__input')
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', function () {
        if (inputs[i].hasAttribute('data-single-check')) {
          const checked = slide.querySelectorAll("input:checked")
          for (let j = 0; j < checked.length; j++) {
            checked[j].checked = false
          }
          inputs[i].checked = true
          hidden.value = inputs[i].value
        } else {
          const inputSingleCheck = slide.querySelector("[data-single-check]")
          if (inputSingleCheck) inputSingleCheck.checked = false
          const checked = slide.querySelectorAll("input:checked")
          let temp = ''
          for (let j = 0; j < checked.length; j++) {
            temp += checked[j].value
            if (j !== checked.length - 1) temp += ', '
          }
          hidden.value = temp
        }
      })
    }
  })

  inputsRadio.forEach(input => {
    const link = input.getAttribute('data-redirect-quiz')
    if (link) {
      input.addEventListener('click', function () {
        let link_tr = link;
        if (utm_input) {
          utm_paramsToInsert = utm_input.value
          if(utm_paramsToInsert != null && utm_paramsToInsert != '' && utm_paramsToInsert != undefined){
          }else{
            utm_paramsToInsert = ''
          }
          if (utm_paramsToInsert.length > 0) {
            const link_parts = link_tr.split('#')
            if (link_parts.length === 1) {
              link_tr += utm_paramsToInsert
            }else{
              link_tr = `${link_parts[0]}${utm_paramsToInsert}#${link_parts[1]}`;
            }
          }
        }

        location.replace(link_tr)
      })
    } else {
      input.addEventListener('change', nextSlide)
    }
  })
}
