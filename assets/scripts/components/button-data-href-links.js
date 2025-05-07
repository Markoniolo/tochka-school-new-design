const buttonDataHrefLinks = document.querySelectorAll('button[data-href-link]')

for (let i = 0; i < buttonDataHrefLinks.length; i++) {
  buttonDataHrefLinks[i].addEventListener('click', function (e) {
    e.preventDefault()
    window.open(this.getAttribute('data-href-link'), '_blank')
  })
}
