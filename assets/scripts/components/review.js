const review = document.querySelector('.review')

if (review) reviewInit()

function reviewInit() {
  const selectTops = review.querySelectorAll('.review__select-top')
  const body = document.querySelector('body')
  const copy = review.querySelector('.review__thanks-copy')
  const textarea = review.querySelector('.review__textarea')
  const buttonNext = review.querySelector('.review__button')
  const buttonBack = review.querySelector('.review__back')
  const buttonMobBack = review.querySelector('.review__mob-back')
  const slides = review.querySelectorAll('.review__slide')
  const steps = review.querySelectorAll('.review__step')
  const form = review.querySelector('.review__form')
  const inputRate = review.querySelector('.review__rate-hidden')
  const inputRateDesktop = review.querySelectorAll('.review__rate-desktop-input')
  const selectSearch = review.querySelector('.review__select-search')
  const searchLabels = selectSearch.closest('.review__select').querySelectorAll('.review__select-item')
  const simpleBars = review.querySelectorAll('[data-role="review-simplebar"]')
  const inputRange = review.querySelector('.review__rate-range')
  const inputRangeValue = review.querySelector('.review__rate-range-value')
  const inputRangeBar = review.querySelector('.review__rate-range-bar')
  const btnSubmit = form.querySelector('.review__submit')
  const role = review.querySelector('.review__role')
  const roleInputs = review.querySelectorAll('.review__role-input')
  const nameInput = review.querySelector("[name='st_name']")
  const surnameInput = review.querySelector("[name='st_surname']")
  const emailInput = review.querySelector("[name='email']")
  const selectClass = review.querySelector(".review__select_class")
  const selectClassInputs = selectClass.querySelectorAll(".review__select-input")
  const rateDesktop = review.querySelector(".review__rate-desktop")
  const rateMobile = review.querySelector(".review__rate-mobile")
  const selectsOnSecondSlide = slides[1].querySelectorAll('.review__select')

  for (let i = 0; i < selectsOnSecondSlide.length; i++) {
    const inputs = selectsOnSecondSlide[i].querySelectorAll('.review__select-input')
    for (let j = 0; j < inputs.length; j++) {
      inputs[j].addEventListener('change', () => {
        selectsOnSecondSlide[i].classList.remove('review-error')
      })
    }
  }

  for (let i = 0; i < selectClassInputs.length; i++) {
    selectClassInputs[i].addEventListener('change', () => selectClass.classList.remove('review-error'))
  }

  for (let i = 0; i < roleInputs.length; i++) {
    roleInputs[i].addEventListener('change', () => role.classList.remove('review-error'))
  }

  nameInput.addEventListener('input', () => nameInput.classList.remove('review-error'))
  surnameInput.addEventListener('input', () => surnameInput.classList.remove('review-error'))
  emailInput.addEventListener('input', () => emailInput.classList.remove('review-error'))

  function validateEmail (email) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
      email.classList.remove('review-error')
      return true
    } else {
      email.classList.add('review-error')
      return false
    }
  }

  inputRange.addEventListener('change', inputRangeChange)

  function inputRangeChange () {
    inputRangeValue.innerHTML = inputRange.value
    calcInputRange(inputRange.value)
    inputRate.value = inputRange.value
    rateDesktop.classList.remove('review-error')
    rateMobile.classList.remove('review-error')
  }

  function calcInputRange (value) {
    const left = `${100 * value / 10}%`
    inputRangeBar.style.width = left
    inputRangeValue.style.left = left
  }

  for (let i = 0; i < simpleBars.length; i++) {
    new SimpleBar(simpleBars[i])
  }

  selectSearch.addEventListener('input', selectSort)
  selectSearch.addEventListener('input', () => openSelect(selectSearch.closest('.review__select-top')))

  function selectSort () {
    const searchString = selectSearch.value.toLowerCase()
    for (let i = 0; i < searchLabels.length; i++) {
      const text = searchLabels[i].querySelector('.review__select-input').getAttribute('data-text').toLowerCase()
      const words = text.split(' ')
      if (words[0].startsWith(searchString) || words[1].startsWith(searchString) || text === searchString) {
        searchLabels[i].style.display = 'block'
      } else {
        searchLabels[i].style.display = 'none'
      }
    }
  }

  copy.addEventListener('click', copyReview)

  function copyReview () {
    steps[2].classList.add('done')
    navigator.clipboard.writeText(textarea.value)
    copy.textContent = 'Скопировано'
    copy.classList.add('done')
    setTimeout(() => {
      copy.textContent = 'Скопировать отзыв'
      copy.classList.remove('done')
    }, 2000)
  }

  for (let i = 0; i < inputRateDesktop.length; i++) {
    inputRateDesktop[i].addEventListener('change', setRateInputValue)
  }

  function setRateInputValue () {
    inputRate.value = review.querySelector('.review__rate-desktop-input:checked').value
    rateDesktop.classList.remove('review-error')
    rateMobile.classList.remove('review-error')
  }

  buttonNext.addEventListener('click', nextSlide)
  buttonBack.addEventListener('click', prevSlide)
  buttonMobBack.addEventListener('click', prevSlide)
  form.addEventListener('submit', submitForm)

  function afterSuccessSubmit () {
    const oldSlide = review.querySelector('.review__slide.active')
    if (oldSlide) oldSlide.classList.remove('active')
    if (inputRate.value > 8) {
      slides[2].classList.add('active')
      review.classList.add('review_thanks-1')
    } else {
      slides[3].classList.add('active')
      steps[2].classList.add('done')
      review.classList.add('review_thanks-2')
    }
    steps[1].classList.add('done')
    steps[2].classList.add('active')
    window.scrollTo(0, 0)
  }

  async function submitForm (e) {
    e.preventDefault()
    if (!validateSecondSlide()) return
    const email = form.querySelector('[name="email"]')
    if (email) {
      email_value = email.value;
    }

    btnSubmit.disabled = true;

    if (checkHoneypot()) return

    try {
      e.stopPropagation();
      console.log('isSubmitting:', isSubmitting);
      if (isSubmitting) return false;

      if (!captchaPassed) {
        // console.log('🔄 Вызов execute...');
        captchaToken = null;
        window.smartCaptcha.execute(window.captchaWidget);

        await new Promise((resolve, reject) => {
          const checkToken = setInterval(() => {
            if (captchaToken) {
              clearInterval(checkToken);
              resolve();
            }
          }, 100);

          setTimeout(() => {
            clearInterval(checkToken);
            reject(new Error('Таймаут капчи'));
          }, 100000);
        });

        // console.log('✅ Токен получен:', captchaToken);
      } else {
        // console.log('✅ Капча уже пройдена, пропускаем проверку');
      }


      if (captchaToken) {
        // console.log(globalForm);
        isSubmitting = true;
        //   console.log('Отправка формы:', review);

        const dataRequest = form.getAttribute('data-request');
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });
        formObject['smart-token'] = captchaToken;

        //formObject.captcha_token = captchaToken;

        $.request('MainFunctions::' + dataRequest, {
          data: formObject,
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
                  btnSubmit.disabled = false;
                }
              }
            }

            if (hasErrors) {
              isSubmitting = false;
              return;
            }

            afterSuccessSubmit()
          },
          error: function(error) {
            // console.error('❌ Ошибка отправки:', error);
            isSubmitting = false;
          }
        });

        return false;
      }else{
        return false;
      }

    } catch (error) {
      // console.error('❌ Ошибка:', error);
      // alert('Ошибка проверки капчи');
      return false;
    }

    function checkHoneypot() {
      const honeypots = form.querySelector('.review__exter-input')
      return honeypots && honeypots?.value
    }
  }

  function validateFirstSlide () {
    let valid = true
    const roleInputActive = slides[0].querySelector('.review__role-input:checked')
    if (!roleInputActive) {
      valid = false
      role.classList.add('review-error')
    }
    if (!nameInput.value) {
      nameInput.classList.add('review-error')
      valid = false
    }
    if (!surnameInput.value) {
      surnameInput.classList.add('review-error')
      valid = false
    }
    if (!validateEmail(emailInput)) {
      valid = false
    }
    const selectClassValue = slides[0].querySelector('.review__select-input:checked')
    if (!selectClassValue) {
      valid = false
      selectClass.classList.add('review-error')
    }
    return valid
  }

  function validateSecondSlide () {
    let valid = true
    if (!inputRate.value) {
      valid = false
      rateDesktop.classList.add('review-error')
      rateMobile.classList.add('review-error')
    }
    for (let i = 0; i < selectsOnSecondSlide.length; i++) {
      const input = selectsOnSecondSlide[i].querySelector('.review__select-input:checked')
      if (!input) {
        valid = false
        selectsOnSecondSlide[i].classList.add('review-error')
      }
    }
    return valid
  }

  function nextSlide () {
    if (!validateFirstSlide()) return
    steps[1].classList.add('active')
    steps[0].classList.add('done')
    const oldSlide = review.querySelector('.review__slide.active')
    if (oldSlide) oldSlide.classList.remove('active')
    slides[1].classList.add('active')
    window.scrollTo(0, 0)
  }

  function prevSlide () {
    steps[1].classList.remove('active')
    steps[0].classList.remove('done')
    const oldSlide = review.querySelector('.review__slide.active')
    if (oldSlide) oldSlide.classList.remove('active')
    slides[0].classList.add('active')
    window.scrollTo(0, 0)
  }

  for (let i = 0; i < selectTops.length; i += 1) {
    selectTops[i].addEventListener('click', () => openSelect(selectTops[i]))
    const inputs = selectTops[i].parentElement.querySelectorAll('.review__select-input')
    inputs.forEach(input => {
      input.addEventListener('change', () => setSelectValue(selectTops[i]))
    })
    const selectClose = selectTops[i].parentElement.querySelector('.review__select-close')
    selectClose.addEventListener('click', () => closeSelect(selectTops[i]))
  }

  window.addEventListener('click', function (e) {
    if (e.target.closest('.review__select')) return
    const activeSelect = review.querySelector('.review__select.active')
    if (activeSelect) activeSelect.classList.remove('active')
    const activeSelectTop = review.querySelector('.review__select-top.active')
    if (activeSelectTop) activeSelectTop.classList.remove('active')
    body.classList.remove('no-scroll-mob')
  })

  function openSelect(that) {
    if (!that.classList.contains('active')) {
      const activeSelect = review.querySelector('.review__select.active')
      if (activeSelect) activeSelect.classList.remove('active')
      const activeSelectTop = review.querySelector('.review__select-top.active')
      if (activeSelectTop) activeSelectTop.classList.remove('active')
    }

    if (that.parentElement.classList.contains('review__select_tutor') || that.parentElement.classList.contains('review__select_teacher')) {
      that.classList.add('active')
      that.parentElement.classList.add('active')
    } else {
      that.classList.toggle('active')
      that.parentElement.classList.toggle('active')
    }
    body.classList.add('no-scroll-mob')
  }

  function closeSelect(selectTop) {
    selectTop.classList.remove('active')
    selectTop.parentElement.classList.remove('active')
    body.classList.remove('no-scroll-mob')
  }

  function setSelectValue (selectTop) {
    setTimeout(() => closeSelect(selectTop), 100)
    const selectText = selectTop.querySelector('.review__select-top-text')
    const text = selectTop.parentElement.querySelector('input:checked').getAttribute('data-text')
    if (selectText) selectText.innerHTML = text
    const selectSearch = selectTop.querySelector('.review__select-search')
    if (selectSearch) {
      selectSearch.value = text
      selectSort()
    }
    if (selectTop.parentElement.classList.contains('review__select_teacher')) {
      const name = review.querySelector('.review__sidebar-teacher-name')
      if (name) name.innerHTML = text
      const image = review.querySelector('.review__sidebar-teacher-image')
      const imageSrc = selectTop.parentElement.querySelector('input:checked').getAttribute('data-image')
      if (image && imageSrc) image.src = imageSrc
      const sidebarTeacher = review.querySelector('.review__sidebar-teacher')
      if (sidebarTeacher) {
        const sidebar = sidebarTeacher.parentElement.querySelector('.review__sidebar')
        if (sidebar) {
          sidebar.classList.add('hide')
          sidebarTeacher.classList.add('active')
        }
      }
    }
  }
}
