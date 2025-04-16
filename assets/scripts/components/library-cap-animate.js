const animateItems = document.querySelectorAll('.library-cap__animate')

if (animateItems.length) animateItemsInit()

function animateItemsInit () {
  let itemsIndex = 0

  createString(animateItems[itemsIndex])

  function createString (item) {
    item.classList.add('active')
    const string = item.querySelector('.library-cap__animate-string')
    const text = [...string.innerHTML]
    let stringWithSpans = ''
    text.forEach((char, i) => {
      stringWithSpans += `<span>${char}</span>`
    })
    string.innerHTML = stringWithSpans
    animateString(string)
  }

  function animateString (string) {
    const spans = string.querySelectorAll('span')
    const length = spans.length
    let index = 0
    animateSpan()

    function animateSpan () {
      spans[index].classList.add('active')
      index += 1
      if (index < length) {
        setTimeout(animateSpan, 100)
      } else {
        const oldActive = document.querySelector('.library-cap__animate.active')
        setTimeout(function () {
          oldActive.classList.remove('active')
        }, 1000)
        setTimeout(function () {
          const oldString = oldActive.querySelector('.library-cap__animate-string')
          oldString.innerHTML = oldString.getAttribute('data-text')
          itemsIndex += 1
          if (itemsIndex >= animateItems.length) itemsIndex = 0
          createString(animateItems[itemsIndex])
        }, 2000)
      }
    }
  }
}
