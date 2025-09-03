const egeCapTabsArray = document.querySelectorAll('.ege-cap__tabs')

for (let i = 0; i < egeCapTabsArray.length; i++) {
  egeCapTabsInit(egeCapTabsArray[i])
}

function egeCapTabsInit (tabs) {
  const tab = tabs.querySelector('a.ege-cap__tab')
  if (tab) tab.addEventListener('click', () => tabs.classList.add('active'))
}
