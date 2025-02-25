const how = document.querySelector("[data-element='how']")

if (how) howInit()

function howInit () {
  const btn = document.querySelector("[data-element='how-button']")
  btn.addEventListener('click', function () {
    this.style.display = "none"
    how.classList.add('active')
  })
}
