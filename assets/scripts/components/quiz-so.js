const quizSo = document.querySelector('.quiz-so')

if (quizSo) quizSoInit()

function quizSoInit () {
  let index = 0
  const slides = quizSo.querySelectorAll('[data-element="quiz-so-slide"]')
  const buttonsNext = quizSo.querySelectorAll('[data-element="quiz-so-slide-next"]')
  const buttonsBack = quizSo.querySelectorAll('[data-element="quiz-so-slide-back"]')
  const input = quizSo.querySelector("[data-element='input-phone-intl']")
  const inputName = quizSo.querySelector(".quiz-so-slide__form-input_name")
  const inputHidden = quizSo.querySelector("[data-element='input-phone-hidden']")
  const policyCheckboxes = quizSo.querySelectorAll('.quiz-so-slide__checkbox-input')

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
    } else if (index === slides.length - 2) {
      if (input && !input?.value?.trim() || !iti?.isValidNumber()) {
        input.classList.add("error")
        return
      }
      if (!inputName.value) {
        inputName.classList.add("error")
        return
      }
      if (!policyCheckboxes[0].checked) {
        policyCheckboxes[0].parentNode.classList.add("error")
        return
      }
      if (!policyCheckboxes[1].checked) {
        policyCheckboxes[1].parentNode.classList.add("error")
        return
      }
      console.log('send form')
      slides[index].classList.remove('active')
      index += 1
      slides[index].classList.add('active')
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
}
