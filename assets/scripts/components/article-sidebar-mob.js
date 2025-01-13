const articleSidebarMob = document.querySelector('.article__sidebar_mob')

if (articleSidebarMob) articleSidebarMobInit()

function articleSidebarMobInit () {
  const name = articleSidebarMob.querySelector('.article__name')
  const layer = articleSidebarMob.querySelector('.article__layer')

  window.addEventListener('scroll', togglePosition, {passive: true})
  let lastScrollTop = 0;
  function togglePosition () {
    let st = window.scrollY
    if (st > lastScrollTop) {
      articleSidebarMob.classList.remove('fixed')
    } else if (st < lastScrollTop) {
      articleSidebarMob.classList.add('fixed')
    }
    lastScrollTop = st <= 0 ? 0 : st
  }

  name.addEventListener('click', toggleSidebar)
  layer.addEventListener('click', closeSidebar)

  function toggleSidebar () {
    if (name.classList.contains('active')) {
      closeSidebar()
    } else {
      window.removeEventListener('scroll', togglePosition)
      name.classList.add('active')
    }
  }

  function closeSidebar () {
    name.classList.remove('active')
    window.addEventListener('scroll', togglePosition, {passive: true})
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
  }
}
