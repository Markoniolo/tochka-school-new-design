const btnScrollToTop = document.querySelector('.btn-scroll-to-top')

if (btnScrollToTop) btnScrollToTopInit()

function btnScrollToTopInit () {
  const promo = document.querySelector('.promo')

  if (btnScrollToTop) {
    btnScrollToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
    if (promo) btnScrollToTop.classList.add('active-promo')
    window.addEventListener('scroll', toggleAllCoursesTop, { passive: true })

    function toggleAllCoursesTop () {
      if (window.scrollY > 0) {
        btnScrollToTop.classList.add('active')
      } else {
        btnScrollToTop.classList.remove('active')
      }
    }
  }
}
