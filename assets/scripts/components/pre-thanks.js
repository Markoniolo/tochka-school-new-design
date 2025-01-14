const preThanks = document.querySelector('.pre-thanks')

if (preThanks) preThanksInit()

function preThanksInit () {
  const url = new URL(window.location.href)
  url.searchParams.delete('email')
  history.replaceState(null, "", url.toString())
}
