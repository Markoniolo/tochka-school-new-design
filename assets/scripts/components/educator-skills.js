const educatorSkillsItems = document.querySelectorAll('.educator-skills__item')

if (educatorSkillsItems.length) educatorSkillsItemsInit()

function educatorSkillsItemsInit () {
  const line = document.querySelector('.educator-skills__line')

  function resizeHandler () {
    if (window.innerWidth < 1440) {
      line.style.bottom = `${educatorSkillsItems[educatorSkillsItems.length - 1].clientHeight - 4}px`
    } else {
      line.style.bottom = '20px'
    }
  }

  resizeHandler()

  window.addEventListener('resize', resizeHandler)
}
