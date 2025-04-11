const teacherCostArray = document.querySelectorAll('.cost__area')

if (teacherCostArray) teacherCostArrayInit()

function teacherCostArrayInit () {
  for (let i = 0; i < teacherCostArray.length; i++) {
    teacherCostInit(teacherCostArray[i])
  }
}

function teacherCostInit(node) {
  const btn = node.querySelector('.cost__button')
  const checkbox = node.querySelector('.cost__teacher-checkbox')
  const price = node.querySelector('.cost__price-current')

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
