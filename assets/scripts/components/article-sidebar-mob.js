const articleSidebarMob = document.querySelector('.article__sidebar_mob')

if (articleSidebarMob) articleSidebarMobInit()

function articleSidebarMobInit () {
  const name = articleSidebarMob.querySelector('.article__name')
  const layer = articleSidebarMob.querySelector('.article__layer')

  name.addEventListener('click', toggleSidebar)
  layer.addEventListener('click', closeSidebar)

  function toggleSidebar () {
    name.classList.toggle('active')
  }

  function closeSidebar () {
    name.classList.remove('active')
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
