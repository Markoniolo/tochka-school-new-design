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
