const nav = document.querySelector('.header .nav')

if (nav) navInit()

function navInit () {
  const buttons = nav.querySelectorAll('button.nav__box-link')
  const headerArea = document.querySelector('.header__area')
  const navBackButtons = nav.querySelectorAll('.nav__back')
  let timeout

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', toggleArea)
    buttons[i].addEventListener('mouseenter', toggleArea)
  }

  for (let i = 0; i < navBackButtons.length; i++) {
    navBackButtons[i].addEventListener('click', backArea)
  }

  function backArea () {
    const activeArea = nav.querySelector('.nav__area.active-mob')
    if (activeArea) activeArea.classList.remove('active-mob')
    headerArea.classList.remove('hide')
  }

  function toggleArea (e) {
    clearTimeout(timeout)
    timeout = setTimeout(() => toggle(this),50)

    function toggle (that) {
      if (!that.closest('.nav__left').querySelector('.nav__box-link:hover')) return
      const id = that.getAttribute('data-nav-id')
      const oldArea = nav.querySelector('.nav__area.active')
      if (oldArea) oldArea.classList.remove('active')
      if (oldArea) oldArea.classList.remove('active-mob')
      const oldButton = nav.querySelector('button.nav__box-link.active')
      if (oldButton) oldButton.classList.remove('active')
      const area = nav.querySelector("[data-nav-area='" + id + "']")
      if (area) area.classList.add('active')
      if (area) area.classList.add('active-mob')
      headerArea.classList.add('hide')
      that.classList.add('active')
    }
  }
}
