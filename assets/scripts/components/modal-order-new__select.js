const modalOrderNewSelect = document.querySelector(".modal-order-new__select")

if (modalOrderNewSelect) modalOrderNewSelectInit()

function modalOrderNewSelectInit () {
  const top = modalOrderNewSelect.querySelector('.modal-order-new__select-top')
  const placeholder = modalOrderNewSelect.querySelector('.modal-order-new__select-placeholder')
  const inputs = modalOrderNewSelect.querySelectorAll('.modal-order-new__select-input')

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', setValue)
  }

  top.addEventListener('click', openSelect)
  window.addEventListener('click', closeSelect)

  function openSelect (e) {
    e.stopPropagation()
    top.classList.toggle('active')
  }

  function closeSelect () {
    top.classList.remove('active')
  }

  function setValue () {
    placeholder.innerHTML = this.parentElement.querySelector('.modal-order-new__select-view').innerHTML
  }
}


