const predzapsNewWaysInners = document.querySelectorAll('.predzaps-new-ways__inner')

for (let i = 0; i < predzapsNewWaysInners.length; i++) {
  predzapsNewWaysInnerInit(predzapsNewWaysInners[i])
}

function predzapsNewWaysInnerInit (inner) {
  const tags = inner.querySelectorAll('.predzaps-new-ways__tag')

  const toggle = inner.querySelector('.predzaps-new-ways__toggle')
  if (toggle) toggle.addEventListener('click', toggleTags)

  if (getCountOfHiddenTags() === 0) {
    toggle.style.display = 'none'
  } else {
    toggle.innerHTML = `Показать ещё +${getCountOfHiddenTags()}`
  }

  function toggleTags () {
    if (inner.classList.contains('active')) {
      inner.classList.remove('active')
      toggle.innerHTML = `Показать ещё +${getCountOfHiddenTags()}`
    } else {
      inner.classList.add('active')
      toggle.innerHTML = 'Свернуть'
    }
  }

  function getCountOfHiddenTags () {
    let counter = 0
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].getBoundingClientRect().top - inner.getBoundingClientRect().top >= 135) {
        counter += 1
      }
    }
    return counter
  }
}
