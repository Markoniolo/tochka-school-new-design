const header = document.querySelector('[data-element="header"]')

if (header) headerInit()

function headerInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const body = document.querySelector('body')
  const headerStages = document.querySelector('.header__stages')
  let lastScrollTop = 0
  let scrollDown = true
  const headerArea = header.querySelector('.header__area')
  const reviewsTileSidebar = document.querySelector('.reviews-tile__sidebar')
  const nav = header.querySelector('.nav')

  window.addEventListener('scroll', checkHeader, { passive: true })
  window.addEventListener('scroll', checkScrollDirection, { passive: true })
  window.addEventListener('resize', checkHeader, { passive: true })

  checkHeader()

  function checkHeader () {
    if (window.scrollY > 10) {
      header.classList.add('header_white')
      stickyHeader.classList.add('white')
    } else {
      header.classList.remove('header_white')
      stickyHeader.classList.remove('white')
    }
  }

  function checkScrollDirection () {
    const st = window.scrollY
    if (st - lastScrollTop > 7) {
      scrollDown = true
    } else if (st - lastScrollTop < -7) {
      scrollDown = false
    }
    lastScrollTop = st <= 0 ? 0 : st
    if (scrollDown) {
      if (headerStages) header.classList.add('stages-hide')
      header.classList.add('thin')
      if (reviewsTileSidebar) reviewsTileSidebar.classList.add('space')
    } else {
      if (headerStages) header.classList.remove('stages-hide')
      header.classList.remove('thin')
      if (reviewsTileSidebar) reviewsTileSidebar.classList.remove('space')
    }
  }

  const menuBtn = document.querySelector('.header__nav-item_menu')
  const layer = document.querySelector('.header__layer')
  const stretch = document.querySelector('.trial-stretch')

  const navCloseBtns = header.querySelectorAll('.nav__close')
  for (let i = 0; i < navCloseBtns.length; i++) {
    navCloseBtns[i].addEventListener('click', closeMenu)
  }

  menuBtn.addEventListener('click', toggleMenu)
  layer.addEventListener('click', closeMenu)

  function toggleMenu () {
    header.classList.toggle('open')
    fixHeaderTop()
    fixMenuHeight()
    stickyHeader.classList.toggle('open')
    body.classList.toggle('no-scroll')
  }

  function fixHeaderTop () {
    if (header.classList.contains('open') && stretch && stretch?.getBoundingClientRect().top === 0) {
      header.style.top = stretch.clientHeight + 'px'
    }
    if (!header.classList.contains('open') && stretch) {
      header.style.top = '0'
    }
  }

  function fixMenuHeight () {
    if (header.classList.contains('open') && stretch && stretch?.getBoundingClientRect().top === 0 && window.innerWidth < 744) {
      const vh = document.documentElement.style.getPropertyValue('--vh')
      nav.style.height = `${(vh.slice(0, -2) * 100) - 80 - stretch.clientHeight}px`
    } else {
      nav.removeAttribute('style')
    }
  }

  function closeMenu () {
    header.classList.remove('open')
    if (stretch) {
      header.style.top = '0'
      nav.removeAttribute('style')
    }
    stickyHeader.classList.remove('open')
    body.classList.remove('no-scroll')
    headerArea.classList.remove('hide')
    const activeArea = document.querySelector('.nav__area.active-mob')
    if (activeArea) activeArea.classList.remove('active-mob')
  }
}
