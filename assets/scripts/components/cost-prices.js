const costAreas = document.querySelectorAll('.cost__area')

if (costAreas.length) costAreasInit()

function costAreasInit () {
  for (let i = 0; i < costAreas.length; i++) {
    costAreaInit(costAreas[i])
  }

  function costAreaInit (area) {
    const checkbox = area.querySelector('.cost__checkbox')
    if (!checkbox) return

    checkbox.addEventListener('change', changePrice)
    checkbox.addEventListener('change', changeHref)

    const button = area.querySelector('.cost__button')
    const newHref = checkbox.getAttribute('new-href')
    const initialHref = button.getAttribute('href')

    function changeHref () {
      const href = button.getAttribute('href')
      if (href === newHref) {
        button.setAttribute('href', initialHref)
      } else {
        button.setAttribute('href', newHref)
      }
    }

    const price_full_old_checkbox_off = checkbox.getAttribute('data-price-full-old-checkbox-off')
    const price_full_old_checkbox_on = checkbox.getAttribute('data-price-full-old-checkbox-on')
    const price_full_current_checkbox_off = checkbox.getAttribute('data-price-full-current-checkbox-off')
    const price_full_current_checkbox_on = checkbox.getAttribute('data-price-full-current-checkbox-on')
    const price_plan_old_checkbox_off = checkbox.getAttribute('data-price-plan-old-checkbox-off')
    const price_plan_old_checkbox_on = checkbox.getAttribute('data-price-plan-old-checkbox-on')
    const price_plan_current_checkbox_off = checkbox.getAttribute('data-price-plan-current-checkbox-off')
    const price_plan_current_checkbox_on = checkbox.getAttribute('data-price-plan-current-checkbox-on')

    const priceFullCurrentNode = area.querySelector('[data-element="price-full-current"]')
    const priceFullOldNode = area.querySelector('[data-element="price-full-old"]')
    const pricePlanCurrentNode = area.querySelector('[data-element="price-plan-current"]')
    const pricePlanOldNode = area.querySelector('[data-element="price-plan-old"]')

    function changePrice () {
      if (this.checked) {
        if (priceFullCurrentNode) priceFullCurrentNode.innerHTML = price_full_current_checkbox_on
        if (priceFullOldNode) priceFullOldNode.innerHTML = price_full_old_checkbox_on
        if (pricePlanCurrentNode) pricePlanCurrentNode.innerHTML = price_plan_current_checkbox_on
        if (pricePlanOldNode) pricePlanOldNode.innerHTML = price_plan_old_checkbox_on
      }
      else {
        if (priceFullCurrentNode) priceFullCurrentNode.innerHTML = price_full_current_checkbox_off
        if (priceFullOldNode) priceFullOldNode.innerHTML = price_full_old_checkbox_off
        if (pricePlanCurrentNode) pricePlanCurrentNode.innerHTML = price_plan_current_checkbox_off
        if (pricePlanOldNode) pricePlanOldNode.innerHTML = price_plan_old_checkbox_off
      }
    }
  }
}
