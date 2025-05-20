const information = document.querySelector('.information')

if (information) informationInit()

function informationInit () {
  const togglers = document.querySelectorAll('[data-information-toggler]')
  const accordions = document.querySelectorAll('[data-information-accordion]')
  const sidebarOpenBtn = document.querySelector('.information__sidebar-open')
  const sidebarCloseBtn = document.querySelector('.information__sidebar-close')
  const sidebar = document.querySelector('.information__sidebar')
  const body = document.querySelector('body')

  for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', () => {
      const oldToggler = document.querySelector('.information__button.active')
      if (oldToggler && !accordions[i].classList.contains('active')) oldToggler.classList.remove('active')
      accordions[i].classList.toggle('active')
    })
  }

  for (let i = 0; i < togglers.length; i++) {
    togglers[i].addEventListener('click', toggleBox)
  }

  function toggleBox () {
    const id = this.getAttribute('data-information-button-id')
    const box = information.querySelector('[data-information-box-id="' + id + '"]')
    if (box) {
      const oldActive = document.querySelector('.information__box.active')
      if (oldActive) oldActive.classList.remove('active')
      const oldToggler = document.querySelector('.information__button.active')
      if (oldToggler && !this.classList.contains('information__btn')) oldToggler.classList.remove('active')
      box.classList.add('active')
      this.classList.add('active')
      closeSidebar()
      window.scrollTo(0, 0)
    }
  }

  sidebarOpenBtn.addEventListener('click', openSidebar)
  sidebarCloseBtn.addEventListener('click', closeSidebar)

  function openSidebar () {
    sidebar.classList.add('active')
    body.classList.add('no-scroll')
  }

  function closeSidebar () {
    sidebar.classList.remove('active')
    body.classList.remove('no-scroll')
  }
}
