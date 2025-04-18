const scheduleFamily = document.querySelector('[data-element="family-schedule"]')

if (scheduleFamily) scheduleFamilyInit()

function scheduleFamilyInit () {
  let offsetHeader = window.innerWidth >= 744 ? 102 : 84

  const toggleBottom = scheduleFamily.querySelector('[data-element="family-schedule__toggle-bottom"]')
  const toggleTop = document.querySelector('[data-element="family-schedule__toggle-top"]')
  const table = scheduleFamily.querySelector('[data-element="family-schedule__box"]')
  const row = scheduleFamily.querySelector('[data-element="family-schedule__row"]')
  const cells = scheduleFamily.querySelectorAll('[data-element="family-schedule__cell"]')
  const cellTime = scheduleFamily.querySelector('[data-element="family-schedule__time"]')

  const isSummer = toggleTop.classList.contains('summer')

  function tableFixedCalculate() {
    offsetHeader = window.innerWidth > 574 ? 68 : 60
    if (window.innerWidth < 1440) {
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.height = cells[i].parentNode.offsetHeight + 'px'
      }
    } else {
      for (let i = 0; i < cells.length; i++) {
        cells[i].style.height = 'auto'
      }
    }
  }

  window.addEventListener('scroll', rowFixedCalculate)
  window.addEventListener('resize', tableFixedCalculate)

  rowFixedCalculate()

  function rowFixedCalculate () {
    if (window.innerWidth >= 1440) {
      row.style.transform = 'none'
      cellTime.style.transform = 'none'
    } else {
      const topCoord = table.getBoundingClientRect().top
      const bottomCoord = table.getBoundingClientRect().bottom
      if (topCoord < offsetHeader && bottomCoord > 100) {
        row.style.transform = row.style.transform.slice(0, row.style.transform.length - 2) - 400 + 'px'
        cellTime.style.transform = cellTime.style.transform.slice(0, cellTime.style.transform.length - 2) - 400 + 'px'
        window.requestAnimationFrame(updateRowFixedTop)
      } else {
        row.style.transform = ''
        cellTime.style.transform = ''
      }
    }
  }

  function updateRowFixedTop () {
    row.style.transform = 'translateY(' + (offsetHeader - table.getBoundingClientRect().top) + 'px' + ')'
    cellTime.style.transform = 'translateY(' + (offsetHeader - table.getBoundingClientRect().top) + 'px' + ')'
  }

  toggleBottom.addEventListener('click', toggleTable)
  toggleTop.addEventListener('click', toggleTable)
  toggleBottom.addEventListener('click', scrollToTable)

  function toggleTable () {
    if (table.classList.contains('hide')) {
      showTable()
    } else {
      hideTable()
    }
  }

  function scrollToTable () {
    const y = scheduleFamily.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({top: y, behavior: 'smooth'})
  }

  function hideTable () {
    table.classList.add('hide')
    toggleBottom.classList.add('reverse')
    toggleTop.classList.add('reverse')
    if (!isSummer) {
      toggleBottom.innerHTML = "Развернуть расписание"
      toggleTop.innerHTML = "Развернуть расписание"
    } else {
      toggleBottom.innerHTML = "Расписание на апрель и май"
      toggleTop.innerHTML = "Расписание на апрель и май"
    }
    toggleBottom.classList.add('hide')
  }

  function showTable () {
    table.classList.remove('hide')
    toggleBottom.classList.remove('reverse')
    toggleTop.classList.remove('reverse')
    toggleBottom.innerHTML = "Свернуть расписание"
    toggleTop.innerHTML = "Свернуть расписание"
    toggleBottom.classList.remove('hide')
    row.style.transform = 'none'
    cellTime.style.transform = 'none'
    setTimeout(() => tableFixedCalculate(), 100)
  }
}
