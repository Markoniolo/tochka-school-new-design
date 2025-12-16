const predzapsNewWaysInners = document.querySelectorAll('.predzaps-new-ways__inner')
let predzapsNewWaysInnerTimer
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
      if (predzapsNewWaysInnerTimer) clearInterval(predzapsNewWaysInnerTimer)
    } else {
      const oldActiveInner = document.querySelector('.predzaps-new-ways__inner.active')
      if (oldActiveInner) {
        oldActiveInner.classList.remove('active')
        const oldToggle = oldActiveInner.querySelector('.predzaps-new-ways__toggle')
        oldToggle.innerHTML = `Показать ещё +${getCountOfHiddenTags()}`
      }
      inner.classList.add('active')
      toggle.innerHTML = 'Свернуть'
      toggleTimer()
    }
  }

  function toggleTimer () {
    if (predzapsNewWaysInnerTimer) clearInterval(predzapsNewWaysInnerTimer)

    predzapsNewWaysInnerTimer = setInterval(() => {
      const oldActiveInner = document.querySelector('.predzaps-new-ways__inner.active')
      if (oldActiveInner) {
        oldActiveInner.classList.remove('active')
        const oldToggle = oldActiveInner.querySelector('.predzaps-new-ways__toggle')
        oldToggle.innerHTML = `Показать ещё +${getCountOfHiddenTags()}`
      }
    }, 10000)
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
