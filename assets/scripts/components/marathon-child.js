const marathonChildThemes = document.querySelector('[data-element="marathon-child__themes"]')

if (marathonChildThemes) marathonChildThemesInit()

function marathonChildThemesInit () {
  const navItems = document.querySelectorAll('[data-element="marathon-child__nav-item"]')
  const boxes = document.querySelectorAll('[data-element="marathon-child__box"]')

  for (let i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', toggleBox)
  }

  function toggleBox () {
    const oldNav = marathonChildThemes.querySelector('.marathon-child__nav-item_active')
    oldNav.classList.remove('marathon-child__nav-item_active')
    this.classList.add('marathon-child__nav-item_active')
    const oldBox = marathonChildThemes.querySelector('.marathon-child__box_active')
    oldBox.classList.remove('marathon-child__box_active')
    const index = this.getAttribute('data-index')
    boxes[index].classList.add('marathon-child__box_active')
  }

  const marathonChildClose = document.querySelector('[data-element="marathon-child__close"]')

  marathonChildThemes.addEventListener('click', openModal)
  marathonChildClose.addEventListener('click', closeModal)
  window.addEventListener('click', windowCloseModal)

  function openModal () {
    marathonChildThemes.classList.add('marathon-child__themes_active')
  }

  function closeModal (e) {
    e.stopPropagation()
    marathonChildThemes.classList.remove('marathon-child__themes_active')
  }

  function windowCloseModal (e) {
    if (!e.target.classList.contains('marathon-child__themes') && !e.target.closest('.marathon-child__themes')) {
      marathonChildThemes.classList.remove('marathon-child__themes_active')
    }
  }
}
