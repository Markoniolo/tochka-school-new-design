const familyProgram = document.querySelector('.family-program')

if (familyProgram) familyProgramInit()

function familyProgramInit () {
  const wrap = document.querySelector('.family-program__wrap')
  const overlay = document.querySelector('.family-program__overlay')

  overlay.addEventListener('scroll', function () {
    wrap.classList.add('hide-hint')
  }, {once: true})

  if (overlay.scrollWidth <= overlay.clientWidth) {
    wrap.classList.add('hide-hint')
  }
}
