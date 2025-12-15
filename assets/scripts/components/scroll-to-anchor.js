if (document.querySelector('[data-role="scroll-to-anchor"]')) initScrollToAnchor()

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
  if (this.hash) elementId = this.hash.substr(1)
  else elementId = this.getAttribute('scroll-to-anchor-id')?.substr(1)
  const element = document.getElementById(elementId)
  const offset = this.getAttribute('scroll-offset')
  const duration = this.getAttribute('scroll-duration')
  if (element) animateScrollToAnchor(element, offset, duration)
}

function animateScrollToAnchor (theElement, offset, duration) {
  if (!offset) {
    const banner = document.querySelector('.discount')
    const bannerHeight = banner ? banner.clientHeight : 0
    if (window.innerWidth < 744) {
      offset = 84 + bannerHeight
    } else if (window.innerWidth < 1200) {
      offset = 102 + bannerHeight
    } else {
      offset = 120 + bannerHeight
    }
  }
  const positionNow = window.pageYOffset
  const positionElement = theElement.getBoundingClientRect().top + scrollY - offset
  if (duration === 'instant') {
    window.scrollTo({left: 0, top: positionElement, behavior: 'instant'})
  } else {
    duration = 200
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
}
