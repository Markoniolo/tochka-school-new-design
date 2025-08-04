const instructionVideoBox = document.querySelector('.instruction__video-box')

if (instructionVideoBox) instructionVideoBoxInit()

function instructionVideoBoxInit() {
  const video = instructionVideoBox.querySelector('video')
  instructionVideoBox.addEventListener('click', function () {
    this.classList.add('active')
    if (video) video.play()
  }, { once: true })
}
