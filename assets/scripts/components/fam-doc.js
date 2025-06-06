const famDoc = document.querySelector('.fam-doc')

if (famDoc) famDocInit()

function famDocInit () {
  const toggle = famDoc.querySelector('.fam-doc__button')
  toggle.addEventListener('click', toggleDoc)

  function toggleDoc () {
    if (famDoc.classList.contains('open')) {
      famDoc.classList.remove('open')
      toggle.innerHTML = 'Открыть расписание аттестации'
    } else {
      famDoc.classList.add('open')
      toggle.innerHTML = 'Скрыть расписание аттестации'
    }
  }
}
