const animateItems = document.querySelectorAll('.library-cap__animate')

if (animateItems.length) animateItemsInit()

function animateItemsInit () {
  const speed = 50
  let itemsIndex = 0
  const text = document.querySelector('.library-cap__text')
  const cursor = text.querySelector('.library-cap__cursor')

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
      calculateCoords(spans[index])
      index += 1
      if (index < length) {
        setTimeout(animateSpan, speed)
      } else {
        setTimeout(animateHide, 1000)
      }
    }

    function animateHide () {
      const spans = string.querySelectorAll('span')
      let index = spans.length - 1
      animateSpanHide()

      function animateSpanHide () {
        spans[index].classList.remove('active')
        index -= 1
        calculateCoords(spans[index])
        if (index < 0) {
          cursor.style.left = `${cursor.style.left.slice(0, -2) - 22}px`
          const oldActive = document.querySelector('.library-cap__animate.active')
          setTimeout(function () {
            oldActive.classList.remove('active')
          }, 50)
          setTimeout(function () {
            const oldString = oldActive.querySelector('.library-cap__animate-string')
            oldString.innerHTML = oldString.getAttribute('data-text')
            itemsIndex += 1
            if (itemsIndex >= animateItems.length) itemsIndex = 0
            createString(animateItems[itemsIndex])
          }, 100)
        } else {
          setTimeout(animateSpanHide, speed*0.7)
        }
      }
    }
  }

  function calculateCoords (span) {
    if (!span) return
    const top = span.getBoundingClientRect().top - text.getBoundingClientRect().top
    const left = span.getBoundingClientRect().left - text.getBoundingClientRect().left
    cursor.style.top = `${top}px`
    cursor.style.left = `${left}px`
  }
}
