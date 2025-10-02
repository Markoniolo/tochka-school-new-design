const quizSo = document.querySelector('.quiz-so')

if (quizSo) quizSoInit()

function quizSoInit () {
  let index = 0
  const slides = quizSo.querySelectorAll('[data-element="quiz-so-slide"]')
  const buttonsNext = quizSo.querySelectorAll('[data-element="quiz-so-slide-next"]')
  const buttonsBack = quizSo.querySelectorAll('[data-element="quiz-so-slide-back"]')
  const btnSubmit = quizSo.querySelector('.btn-warning')
  const input = quizSo.querySelector("[data-element='input-phone-intl']")
  const inputName = quizSo.querySelector(".quiz-so-slide__form-input_name")
  const inputHidden = quizSo.querySelector("[data-element='input-phone-hidden']")
  const inputsAll = quizSo.querySelectorAll('input');
  const policyCheckboxes = quizSo.querySelectorAll('.quiz-so-slide__checkbox-input')
  const linkTo = quizSo.getAttribute("data-docex")
  const utm_input = quizSo.querySelector('[name="utm"]')

  buttonsNext.forEach(button => {
    button.addEventListener('click', nextSlide)
  })

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
  quizSo.addEventListener('submit', async (e) => {
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
        const checked = slide.querySelectorAll("input:checked")
        let temp = ''
        for (let j = 0; j < checked.length; j++) {
          temp += checked[j].value
          if (j !== checked.length - 1) temp += ', '
        }
        hidden.value = temp
      })
    }
  })
}
