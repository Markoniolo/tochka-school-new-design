const footerNewDoc = document.querySelector('[data-element="footer-new-doc"]')

if (footerNewDoc) footerNewDocInit()

function footerNewDocInit () {
  footerNewDoc.addEventListener('click', () => footerNewDoc.classList.toggle('active'))
}
