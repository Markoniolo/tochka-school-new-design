const reasons = document.querySelector('.reasons')

if (reasons) reasonsInit()

function reasonsInit () {
  const area = reasons.querySelector('.reasons__area')
  const circles = reasons.querySelectorAll('.reasons__circle')

  const step = 300
  let index = 0
  let interval

  setTimeout(
    ()=> interval = setInterval(animate, 3500),
    4500
  )

  setTimeout(() => reasons.style.backgroundPositionY = `${step * (index+1)}px`, 8100)

  function animate () {
    index += 1
    if (index < 26) {
      circles[index].classList.add('animate')
      setTimeout(() => reasons.style.backgroundPositionY = `${step * (index+1)}px`, 3750)
    } else if (index === 26) {
      circles[index].classList.add('animate-end')
      if (area) area.classList.add('end')
    } else {
      clearInterval(interval)
    }
  }
}
