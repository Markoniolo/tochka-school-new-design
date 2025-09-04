const egeCapTabsArray = document.querySelectorAll('.ege-cap__tabs')

for (let i = 0; i < egeCapTabsArray.length; i++) {
  egeCapTabsInit(egeCapTabsArray[i])
}

function egeCapTabsInit (tabs) {
  const tab = tabs.querySelector('a.ege-cap__tab')
  if (tab) tab.addEventListener('click', () => tabs.classList.add('active'))
}

const egeTileToggle = document.querySelectorAll('.ege-tile__toggle')

for (let i = 0; i < egeTileToggle.length; i++) {
  egeTileToggleInit(egeTileToggle[i])
}

function egeTileToggleInit (tabs) {
  const tab = tabs.querySelector('a.ege-tile__toggle-item')
  if (tab) tab.addEventListener('click', () => tabs.classList.add('active'))
}
