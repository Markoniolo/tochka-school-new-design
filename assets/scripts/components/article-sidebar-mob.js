const articleSidebarMob = document.querySelector('.article__sidebar_mob')

if (articleSidebarMob) articleSidebarMobInit()

function articleSidebarMobInit () {
  const name = articleSidebarMob.querySelector('.article__name')
  const layer = articleSidebarMob.querySelector('.article__layer')

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
      articleSidebarMob.classList.remove('fixed')
    } else {
      articleSidebarMob.classList.add('fixed')
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

  const articleLinkArray = articleSidebarMob.querySelectorAll('.article__link')

  for (let i = 0; i < articleLinkArray.length; i++) {
    articleLinkArray[i].addEventListener('click', toggleLinkActive)
  }

  function toggleLinkActive () {
    const oldActive = articleSidebarMob.querySelector('.article__link.active')
    if (oldActive) oldActive.classList.remove('active')
    this.classList.add('active')
    name.classList.remove('active')
    window.addEventListener('scroll', checkScrollDirection, {passive: true})
  }
}
