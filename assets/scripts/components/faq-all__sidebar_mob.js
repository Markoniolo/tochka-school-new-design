const faqAllSidebarMob = document.querySelector('.faq-all__sidebar_mob')

if (faqAllSidebarMob) faqAllSidebarMobInit()

function faqAllSidebarMobInit () {
  const name = faqAllSidebarMob.querySelector('.faq-all__name')
  const layer = faqAllSidebarMob.querySelector('.faq-all__layer')

  let scrollDown = true
  let lastScrollTop = 0

  window.addEventListener('scroll', checkScrollDirection, { passive: true })

  function checkScrollDirection () {
    const st = window.scrollY
    if (st - lastScrollTop > 7) {
      scrollDown = true
    } else if (st - lastScrollTop < -7) {
      scrollDown = false
    }
    lastScrollTop = st <= 0 ? 0 : st
    if (scrollDown) {
      faqAllSidebarMob.classList.remove('fixed')
    } else {
      faqAllSidebarMob.classList.add('fixed')
    }
  }

  name.addEventListener('click', toggleSidebar)
  layer.addEventListener('click', closeSidebar)

  function toggleSidebar () {
    if (name.classList.contains('active')) {
      closeSidebar()
    } else {
      window.removeEventListener('scroll', checkScrollDirection)
      name.classList.add('active')
    }
  }

  function closeSidebar () {
    name.classList.remove('active')
    window.addEventListener('scroll', checkScrollDirection, {passive: true})
  }

  const articleLinkArray = faqAllSidebarMob.querySelectorAll('.faq-all__link')

  for (let i = 0; i < articleLinkArray.length; i++) {
    articleLinkArray[i].addEventListener('click', toggleLinkActive)
  }

  function toggleLinkActive () {
    const oldActive = faqAllSidebarMob.querySelector('.faq-all__link.active')
    if (oldActive) oldActive.classList.remove('active')
    this.classList.add('active')
    name.classList.remove('active')
    window.addEventListener('scroll', checkScrollDirection, {passive: true})
  }
}
