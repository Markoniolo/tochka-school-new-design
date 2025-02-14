const discount = document.querySelector('[data-element="discount"]')

if (discount) discountInit()

function discountInit () {
  const close = document.querySelector('[data-element="discount__close"]')
  close.addEventListener('click', removeDiscount)

  function removeDiscount (e) {
    e.preventDefault()
    discount.remove()
  }
}
