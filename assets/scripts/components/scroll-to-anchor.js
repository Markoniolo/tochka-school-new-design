if (document.querySelector('[data-role="scroll-to-anchor"]')) setTimeout(initScrollToAnchor, 0)

function initScrollToAnchor () {
  const anchorElements = document.querySelectorAll('[data-role="scroll-to-anchor"]')

  for (let i = 0, len = anchorElements.length; i < len; i++) _loopAddEventScrollToAnchor(anchorElements[i])

  function _loopAddEventScrollToAnchor (node) {
    node.addEventListener('click', clickOnTheScrollElement)
  }
}

function clickOnTheScrollElement (event) {
  event.preventDefault()
  let elementId
  if (this.dataset.link) elementId = this.dataset.link.substr(1)
  else elementId = this.hash.substr(1)
  const element = document.getElementById(elementId)
  if (element) animateScrollToAnchor(element)
}

function animateScrollToAnchor (theElement) {
  let offset
  if (window.innerWidth < 744) {
    offset = 84
  } else if (window.innerWidth < 1200) {
    offset = 102
  } else {
    offset = 65
  }
  const positionNow = window.pageYOffset
  const positionElement = theElement.getBoundingClientRect().top + pageYOffset - offset
  const duration = 200
  const step = positionElement - positionNow
  const start = performance.now()

  requestAnimationFrame(function animate (time) {
    const timePassed = time - start

    if (timePassed > duration) {
      window.scrollTo(0, positionElement)
    } else {
      window.scrollTo(0, positionNow + step * (timePassed / duration))
      requestAnimationFrame(animate)
    }
  })
}
