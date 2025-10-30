const timers = document.querySelectorAll('[data-element="timer"]')

for (let i = 0; i < timers.length; i++) {
  timersInit(timers[i])
}

function timersInit (timer) {
  const date = timer.getAttribute('date-end')
  const countDownDate = new Date(date).getTime()

  const nodes = timer.querySelectorAll('[data-element="timer-number"]')

  const interval = setInterval(updateTimer, 1000)

  function updateTimer () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    if (nodes.length < 4) {
      nodes[0].innerHTML = hours
      nodes[1].innerHTML = minutes
      nodes[2].innerHTML = seconds
    } else {
      nodes[0].innerHTML = days
      nodes[1].innerHTML = hours
      nodes[2].innerHTML = minutes
      nodes[3].innerHTML = seconds
    }

    if (distance < 0) {
      clearInterval(interval);
      nodes[0].innerHTML = "0"
      nodes[1].innerHTML = "0"
      nodes[2].innerHTML = "0"
      if (nodes[3]) nodes[3].innerHTML = "0"
    }
  }
}
