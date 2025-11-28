const faqAllSidebarDesc = document.querySelector('.faq-all__sidebar_desc')

if (faqAllSidebarDesc) faqAllSidebarDescInit()

function faqAllSidebarDescInit () {
  const faqAllLinkArray = faqAllSidebarDesc.querySelectorAll('.faq-all__link')
  const faqAllTitleArray = document.querySelectorAll('.faq-all__title')

  window.addEventListener('scroll', checkScroll, { passive: true })

  function checkScroll () {
    for (let i = faqAllTitleArray.length - 1; i > -1; i--) {
      if (faqAllTitleArray[i].getBoundingClientRect().top < 300) {
        removeOldLinkActive()
        faqAllLinkArray[i].classList.add('active')
        break
      } else {
        faqAllLinkArray[i].classList.remove('active')
      }
    }
  }

  function removeOldLinkActive () {
    const oldActive = faqAllSidebarDesc.querySelector('.faq-all__link.active')
    if (oldActive) oldActive.classList.remove('active')
  }
}
