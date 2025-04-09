const teacherCost = document.querySelector('.teacher-cost')

if (teacherCost) teacherCostInit()

function teacherCostInit() {
  const btn = teacherCost.querySelector('.cost__button')
  const checkbox = teacherCost.querySelector('.cost__teacher-checkbox')
  const price = teacherCost.querySelector('.cost__price-current')

  checkbox.addEventListener('change', checkboxChangeHandler)

  function checkboxChangeHandler () {
    const newPrice = checkbox.getAttribute('new-price')
    const oldPrice = btn.getAttribute('old-price')

    const newHref = checkbox.getAttribute('new-href')
    const oldHref = btn.getAttribute('old-href')

    if (checkbox.checked) {
      price.textContent = newPrice
      btn.href = newHref
    } else {
      price.textContent = oldPrice
      btn.href = oldHref
    }
  }
}
