const faqAllBg = document.querySelectorAll('.faq-all__bg')

if (faqAllBg.length) {
  setFaqAllBgWidth()

  window.addEventListener('resize', setFaqAllBgWidth, { passive: true })

  function setFaqAllBgWidth() {
    for (let i = 0; i < faqAllBg.length; i++) {
      faqAllBg[i].style.width = `${document.documentElement.clientWidth - 1}px`
    }
  }
}
