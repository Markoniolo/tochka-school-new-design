const quizSo = document.querySelector('.quiz-so')

if (quizSo) quizSoInit()

function quizSoInit () {
  let index = 0
  const slides = quizSo.querySelectorAll('[data-element="quiz-so-slide"]')
  const buttonsNext = quizSo.querySelectorAll('[data-element="quiz-so-slide-next"]')
  const buttonsBack = quizSo.querySelectorAll('[data-element="quiz-so-slide-back"]')

  buttonsNext.forEach(button => {
    button.addEventListener('click', nextSlide)
  })

  function nextSlide () {
    if (index === slides.length) return
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
    } else {
      slides[index].classList.remove('active')
      index += 1
      slides[index].classList.add('active')
    }
  }

  buttonsBack.forEach(button => {
    button.addEventListener('click', prevSlide)
  })

  function prevSlide () {
    if (index === 0) return
    slides[index].classList.remove('active')
    index -= 1
    slides[index].classList.add('active')
  }
}
