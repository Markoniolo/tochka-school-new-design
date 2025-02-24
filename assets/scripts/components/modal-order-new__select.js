const modalOrderNewSelect = document.querySelector('.modal-order-new__select')

if (modalOrderNewSelect) modalOrderNewSelectInit()

function modalOrderNewSelectInit () {
  modalOrderNewSelect.addEventListener('change', function () {
    const parent = this.closest('.custom-select-container')
    if (parent) {
      const span = parent.querySelector('.custom-select-opener span')
      span.style.color = '#000'
    }
  })
}
