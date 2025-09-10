const animateCounters = document.querySelectorAll('.animate-counter')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target, 0, entry.target.getAttribute('data-animate-counter-end'), 1000)
      observer.unobserve(entry.target)
    }
  })
}, {
  root: null,
  scrollMargin : "0px 0px -150px 0px",
  threshold: 1
})

for (let i = 0; i < animateCounters.length; i++) {
  animateCounterInit(animateCounters[i])
}

function animateCounterInit (counter) {
  observer.observe(counter)
}

function animateCounter(element, startValue, endValue, duration) {
  let currentValue = startValue
  const increment = (endValue - startValue) / (duration / 10)
  const toFixed = element.getAttribute('data-to-fixed')
  const counterInterval = setInterval(() => {
    currentValue += increment;
    if ((increment > 0 && currentValue >= endValue) || (increment < 0 && currentValue <= endValue)) {
      currentValue = endValue
      clearInterval(counterInterval)
    }
    element.textContent = (+currentValue).toFixed(toFixed).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }, 10)
}
