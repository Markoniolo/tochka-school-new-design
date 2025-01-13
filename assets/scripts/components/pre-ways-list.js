const preWaysSlideArray = document.querySelectorAll('[data-element="pre-ways-slide"]')

if (preWaysSlideArray.length) preWaysSlideArrayInit()

function preWaysSlideArrayInit () {
  for (let i = 0; i < preWaysSlideArray.length; i++) {
    preWaysSlideInit(preWaysSlideArray[i])
  }

  function preWaysSlideInit (slide) {
    const list = slide.querySelector('[data-element="pre-ways-list"]')
    const btn = slide.querySelector('[data-element="pre-ways-more"]')

    if (list.clientHeight > 140) {
      btn.classList.add('show')
      btn.addEventListener('click', toggleList)
      slide.classList.add('hide')
    }

    function toggleList () {
      if (slide.classList.contains('hide')) {
        slide.classList.remove('hide')
        btn.textContent = 'Свернуть'
      } else {
        slide.classList.add('hide')
        btn.textContent = 'Показать все предметы'
      }
    }
  }
}
