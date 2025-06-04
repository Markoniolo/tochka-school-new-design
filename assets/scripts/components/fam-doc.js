const famDoc = document.querySelector('.fam-doc')

if (famDoc) famDocInit()

function famDocInit () {
  const toggle = famDoc.querySelector('.fam-doc__button')
  toggle.addEventListener('click', () => famDoc.classList.toggle('open'))
}
