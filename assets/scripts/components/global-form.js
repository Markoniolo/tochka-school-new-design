const externalFormArray = document.querySelectorAll("[data-element='external-form']")

for (let i = 0; i < externalFormArray.length; i++) {
  globalFormInit(externalFormArray[i], 'onSendMessageTb', 'externalFormData');
}


const phoneFormArray = document.querySelectorAll("[data-element='phone-form']")

for (let i = 0; i < phoneFormArray.length; i++) {
  globalFormInit(phoneFormArray[i], 'onSendNOrderWGMessagePh', 'phoneFormData');
}

const reviewFormArray = document.querySelectorAll("[data-element='review-form']")

for (let i = 0; i < reviewFormArray.length; i++) {
  globalFormInit(reviewFormArray[i], 'onSendNOrderWGMessage', 'reviewFormData');
}

const familyOrderForm = document.querySelector("[data-element='family-order-form']")
if (familyOrderForm) globalFormInit(familyOrderForm, 'onSendConsultMessage', 'consultFormData')

const orderForm = document.querySelector("[data-element='order-form']")
if (orderForm) globalFormInit(orderForm, 'onSendOrderMessage', 'orderFormData')

const orderFormEmail = document.querySelector("[data-element='order-form-email']")
if (orderFormEmail) globalFormInit(orderFormEmail, 'onSendOrderMessage', 'orderFormEmailData')

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
function orderFormEmailData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'email': globalForm.querySelector("[name='email']").value,
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
function reviewFormData (globalForm) {
  return {
    'name': globalForm.querySelector("[name='name']").value,
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
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
function phoneFormData (globalForm) {
  return {
    'utm': globalForm.querySelector("[name='utm']").value,
    'tel': globalForm.querySelector("[name='tel']").value,
    'policy': globalForm.querySelector("[name='policy']").checked,
    'news': globalForm.querySelector("[name='news']").checked,
    'page_name': globalForm.querySelector("[name='page_name']").value,
  };
}

window.captchaWidget = null;



let captchaPassed = false;

console.log('📍 Инициализация капчи...');
window.captchaWidget = window.smartCaptcha.render('captcha-container', {
  sitekey: 'ysc1_y2y3Y8WvF9G06BcBNlGlgx4nfWsr2ms4kPjqJ0ite8d30716', // <- проверьте ключ!
  invisible: true,
  callback: (token) => {
    console.log('✅ Callback капчи вызван с токеном:', token);
    captchaToken = token;
    captchaPassed = true;
  }
});
console.log('📍 Виджет создан:', window.captchaWidget);





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

  let inputSms
  let isSubmitting = false;

  globalForm.addEventListener('submit', async (e) => {
    resetError()
    e.preventDefault()

    if (globalForm.classList.contains('form-enter-sms-code') && !globalForm.querySelector('input[name="sms_code"]'?.value)) return

    console.log(input && !input?.value?.trim())
    console.log(iti?.isValidNumber())
    if (input && !input?.value?.trim()) {
      input.classList.add("error")
    } else if (iti?.isValidNumber() || !input || type == 'libraryPopupFormData' || type == 'blogPhoneFormData' || type == 'blogPhoneEmailFormData' || data_phone_pattern_exists) {

      if (type == 'externalFormData') {
        var form_data = externalFormData(globalForm);
      } else if (type == 'phoneFormData') {
        var form_data = phoneFormData(globalForm);
      } else if (type == 'reviewFormData') {
        var form_data = reviewFormData(globalForm);
      } else if (type == 'orderFormData') {
        inputSms = `<input class="modal-order-new__input modal-order-new__input_sms" name="sms_code" type="text" placeholder="Код подтверждения">`
        var form_data = orderFormData(globalForm);
      } else if (type == 'orderFormEmailData') {
        var form_data = orderFormEmailData(globalForm);
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
          //   news.closest('label').classList.add('error-text')
          //   news.classList.add('error')
          isValid = false
        }
      }
      if (policy) {
        if (!policy.checked) {
          //   policy.closest('label').classList.add('error-text')
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

        let linkTo_ = linkTo;
        let linkTo_base = linkTo_;
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
        if (isTargetLink(linkTo_base)) {
          if (cookieParams) {
            linkTo_ += (linkTo_.includes("?") ? "&" : "?") + cookieParams;
          }
        }

        if (checkHoneypot()) return

        // console.log("urlParams: " + urlParams)
        // console.log("utm_f: " + utm_f)

        //console.log("bf globalForm.submit")


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
            //   console.log('Отправка формы:', globalForm);

            const dataRequest = globalForm.getAttribute('data-request');
            const formData = new FormData(globalForm);
            const formObject = {};
            formData.forEach((value, key) => {
              formObject[key] = value;
            });
            formObject['smart-token'] = captchaToken;
            const sms_code = globalForm.querySelector('input[name="sms_code"]')?.value
            if (sms_code) formObject['sms_code'] = sms_code

            const callPhoneButton = globalForm.querySelector('[data-role="global-form-call-phone"]')
            if (callPhoneButton) formObject['already_call'] = true

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

                if (response['requires_verification']) {
                  showSmsInput(response['message'])
                } else if (response['requires_phonecall_verification']) {
                  showFormPhoneCall(response)
                } else {
                  clearForm();
                  if (type === 'preFormData') {
                    location.assign(linkTo + `?cemail=${email_value}`);
                  } else {
                    location.assign(linkTo_);
                  }
                }
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
      }

    } else {
      input.classList.add("error")
    }

  })

  function showFormPhoneCall (response) {
    globalForm.classList.add('form-enter-sms-code')
    const submitButton = globalForm.querySelector('.modal-order-new__button')
    if (submitButton) submitButton.innerHTML = 'Уже позвонил'
    const title = globalForm.querySelector('.modal-order-new__title')
    if (title) {
      title.innerHTML = response['message'] + ' ' +  response['call_phone_pretty']
      title.insertAdjacentHTML('afterend', `<a href="callto:${response['call_phone']}" class="modal-order-new__button btn-warning" data-role="global-form-call-phone" type="button">Позвонить</a>`)
    }
  }

  function showSmsInput (message) {
    const title = globalForm.querySelector('.modal-order-new__title')
    if (title) {
      title.innerHTML = message
      if (inputSms) title.insertAdjacentHTML('afterend', inputSms)
    }
    globalForm.classList.add('form-enter-sms-code')
  }

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
  function checkHoneypot() {
    const honeypots = form.querySelector('.modal-exter__input')
    return honeypots && honeypots?.value
  }
}

// Проверка, начинается ли ссылка с одного из целевых URL
function isTargetLink(href) {
  const targets = [
    "https://salebot.site/",
    "https://sbsite.pro/",
    "https://vk.com/app7062840"
  ];
  return targets.some(prefix => href.startsWith(prefix));
}

// Собираем значения из нужных cookie
const cookies = ['_fbc', '_fbp', '_ga', '_ym_uid', 'roistat_visit'];
let cookieParams = '';

cookies.forEach(name => {
  const value = getCookie(name);
  if (value) {
    if (cookieParams) cookieParams += '&';
    cookieParams += `${name}='${encodeURIComponent(value)}'`;
  }
});

// Функция для получения значения cookie по имени
function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

const urlParams = location.search.slice(1); // убираем '?'
