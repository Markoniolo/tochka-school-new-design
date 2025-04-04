const offerTimers = document.querySelectorAll('.offer-timer')

if (offerTimers.length) offerTimersInit()

function offerTimersInit () {
  for (let i = 0; i < offerTimers.length; i++) {
    offerTimerInit(offerTimers[i])
  }
}

function offerTimerInit (timer) {
  const date = timer.getAttribute('date-end')
  const countDownDate = new Date(date).getTime()

  const nodes = timer.querySelectorAll('.offer-timer__number')

  const interval = setInterval(updateTimer, 1000)

  function updateTimer () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    nodes[0].innerHTML = days
    nodes[1].innerHTML = hours
    nodes[2].innerHTML = minutes
    nodes[3].innerHTML = seconds

    if (distance < 0) {
      clearInterval(interval);
      nodes[0].innerHTML = "0"
      nodes[1].innerHTML = "0"
      nodes[2].innerHTML = "0"
      nodes[3].innerHTML = "0"
    }
  }
}
