const marathonInformer = document.querySelector('[data-element="marathon-informer"]')

if (marathonInformer) marathonInformerInit()

function marathonInformerInit () {
  const close = document.querySelector('[data-element="marathon-informer__close"]')
  close.addEventListener('click', removeMarathon)

  function removeMarathon (e) {
    e.preventDefault()
    localStorage.setItem('isMarathonInformerShown', 'true')
    marathonInformer.remove()
  }

  const isShown = localStorage.getItem('isMarathonInformerShown')

  if (!isShown || marathonInformer.getAttribute('show-always')) {
    marathonInformer.style.display = 'block'
  }
}
