const courseAboutVideo = document.querySelector("[data-element='course-about-video']")

if (courseAboutVideo) courseAboutVideoInit()

function courseAboutVideoInit () {
  const videoWrap = document.querySelector("[data-element='course-about-video-wrap']")
  const soundBtn = document.querySelector(".course-about__sound")

  videoWrap.addEventListener('click', playVideo)

  function playVideo (e) {
    e.stopPropagation()
    if (courseAboutVideo.muted) {
      courseAboutVideo.muted = false
      courseAboutVideo.loop = false
      courseAboutVideo.currentTime = 0
      courseAboutVideo.controls = true
      soundBtn.classList.add('hide')
      setTimeout(() => courseAboutVideo.play(), 100)
    } else {
      courseAboutVideo.muted = true
      courseAboutVideo.controls = false
      soundBtn.classList.remove('hide')
    }
  }
}
