const cards = document.querySelector("[data-element='cards']")

if (cards) cardsInit()

function cardsInit () {
  const cardsBoxes = cards.querySelectorAll("[data-element='cards-box']")

  cardsBoxes.forEach((box) => {
    box.addEventListener('click', toggleBox)
  })

  function toggleBox () {
    const oldActive = cards.querySelector('.active')
    if (oldActive) oldActive.classList.remove('active')
    this.classList.add('active')
  }
}
