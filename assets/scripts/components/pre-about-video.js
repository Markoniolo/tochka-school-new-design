const preAboutVideo = document.querySelector("[data-element='pre-about-video']")

if (preAboutVideo) preAboutVideoInit()

function preAboutVideoInit () {
  const videoWrap = document.querySelector("[data-element='pre-about-video-wrap']")
  const timeNode = document.querySelector("[data-element='pre-about-time']")

  preAboutVideo.addEventListener("timeupdate", timeupdateHandler)

  function timeupdateHandler () {
    const date = new Date(null)
    date.setSeconds(Math.round(preAboutVideo.currentTime))
    timeNode.innerHTML = date.toISOString().slice(14, 19)
  }

  videoWrap.addEventListener('click', playVideo)

  function playVideo (e) {
    e.stopPropagation()
    if (preAboutVideo.muted) {
      preAboutVideo.muted = false
      preAboutVideo.currentTime = 0
      preAboutVideo.play()
    } else {
      muteVideo()
    }
  }

  window.addEventListener('scroll', checkVideoInView, {passive: true})
  window.addEventListener('click', muteVideo, {passive: true})

  function muteVideo () {
    preAboutVideo.muted = true
  }

  function checkVideoInView () {
    if (preAboutVideo.getBoundingClientRect().top < window.innerHeight/2) {
      preAboutVideo.play()
    }
  }
}
