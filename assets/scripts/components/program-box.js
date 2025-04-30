const programBoxes = document.querySelectorAll('.program__box')

if (programBoxes.length) programBoxesInit()

function programBoxesInit () {
  for (let i = 0; i < programBoxes.length; i++) {
    programBoxInit(programBoxes[i])
  }

  function programBoxInit (box) {
    const items = box.querySelectorAll('.program__item')
    let span

    if (window.innerWidth >= 1440 && items.length > 12 || window.innerWidth >= 744  && items.length > 10 || window.innerWidth < 744 && items.length > 6) {
      box.classList.add('hide')
      const btn = box.querySelector('.program__more')
      btn.addEventListener('click', toogleBox)
      span = btn.querySelector('span')
    }

    function toogleBox () {
      if (box.classList.contains('active')) {
        box.classList.remove('active')
        span.innerHTML = 'Показать полностью'
        box.scrollIntoView()
      } else {
        box.classList.add('active')
        span.innerHTML = 'Скрыть список'
      }
    }
  }
}
