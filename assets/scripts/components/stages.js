const stageToggles = document.querySelectorAll('.header__stages-button')

if (stageToggles.length) stageTogglesInit()

function stageTogglesInit () {
  for (let i = 0; i < stageToggles.length; i++) {
    stageToggles[i].addEventListener('click', toggleStage)
  }

  function toggleStage () {
    const id = this.getAttribute('data-stage-id')
    const blocks = document.querySelectorAll("[data-stage-number='" + id + "']")

    for (let i = 0; i < blocks.length; i++) {
      blocks[i].classList.remove('stage-block-hide')
    }

    const oldToggle = document.querySelector('.header__stages-button.active')
    const oldId = oldToggle.getAttribute('data-stage-id')
    const oldBlocks = document.querySelectorAll("[data-stage-number='" + oldId + "']")

    for (let i = 0; i < oldBlocks.length; i++) {
      oldBlocks[i].classList.add('stage-block-hide')
    }

    this.classList.add('active')
    oldToggle.classList.remove('active')
  }
}
