const promo = document.querySelector('.promo')

if (promo) promoInit()

function promoInit () {
  const closeBtn = promo.querySelector('.promo__close')
  const promoView = promo.querySelector('.promo__view')
  const cake = document.querySelector('.cake.cake_active')

  promoView.addEventListener('click', openPromo)
  closeBtn.addEventListener('click', closePromo)

  window.addEventListener('click', closePromo)

  function openPromo (e) {
    e.stopPropagation()
    promo.classList.add('active')
  }

  function closePromo () {
    promo.classList.remove('active')
  }

  if (cake) promo.classList.add('transition-with-cake')
}
