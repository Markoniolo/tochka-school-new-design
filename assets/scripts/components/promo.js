const promo = document.querySelector('.promo')

if (promo) promoInit()

function promoInit () {
  const closeBtn = promo.querySelector('.promo__close')
  const promoView = promo.querySelector('.promo__view')

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
}
