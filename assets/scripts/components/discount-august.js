const discountAugust = document.querySelector('[data-element="discount-august"]')

if (discountAugust) discountAugustInit()

function discountAugustInit () {
  const stickyHeader = document.querySelector('.sticky-header')
  const close = document.querySelector('[data-element="discount-august__close"]')
  close.addEventListener('click', removeDiscount)

  function removeDiscount (e) {
    e.preventDefault()
    discountAugust.remove()
    window.removeEventListener('scroll', checkScroll)
    stickyHeader.classList.remove('predzaps-top-hide-no-transition')
    stickyHeader.classList.remove('predzaps-top-hide')
  }

  window.addEventListener('scroll', checkScroll, { passive: true })

  function checkScroll () {
    if (window.scrollY > 100) {
      stickyHeader.classList.add('predzaps-top-hide')
      setTimeout(() => stickyHeader.classList.add('predzaps-top-hide-no-transition'), 300)
    } else if (window.scrollY <= 20) {
      stickyHeader.classList.remove('predzaps-top-hide-no-transition')
      setTimeout(() => stickyHeader.classList.remove('predzaps-top-hide'), 100)
    }
  }
}
