const trialFamilyStart = document.querySelector('#trial-family-start')

if (trialFamilyStart) trialFamilyStartInit()

function trialFamilyStartInit () {
  const opener = trialFamilyStart.querySelector("[data-element='trial-family-start-filter-opener']")
  const inputs = trialFamilyStart.querySelectorAll("[data-element='trial-family-start-filter-input']")
  const text = trialFamilyStart.querySelector(".trial-family-start__filter-top-text")
  const number = trialFamilyStart.querySelector(".trial-family-start__number")
  const button = trialFamilyStart.querySelector(".trial-family-start__button")

  opener.addEventListener('click', toggleSelect)

  function toggleSelect() {
    if (opener.classList.contains('active')) {
      opener.classList.remove('active')
    } else {
      const oldOpen = trialFamilyStart.querySelector(".trial-family-start__filter-top.active")
      if (oldOpen) oldOpen.classList.remove('active')
      opener.classList.add('active')
    }
  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', setValue)
  }

  function setValue () {
    opener.classList.remove('active')
    text.innerHTML = this.getAttribute('data-number')
    number.innerHTML = this.getAttribute('data-number')
    button.href = this.value
  }
}
