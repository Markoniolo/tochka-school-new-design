const preAboutVideo = document.querySelector("[data-element='pre-about-video']")

if (preAboutVideo) preAboutVideoInit()

function preAboutVideoInit () {
  const videoWrap = document.querySelector("[data-element='pre-about-video-wrap']")
  const timeNode = document.querySelector("[data-element='pre-about-time']")
  const soundBtn = document.querySelector(".pre-about__sound")
  let firstPlay = false

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
      firstPlay = true
      preAboutVideo.muted = false
      preAboutVideo.loop = false
      preAboutVideo.currentTime = 0
      preAboutVideo.play()
      soundBtn.classList.add('active')
    } else {
      preAboutVideo.muted = true
      soundBtn.classList.remove('active')
    }
  }

  window.addEventListener('scroll', checkVideoInView, {passive: true})

  function checkVideoInView () {
    if (preAboutVideo.getBoundingClientRect().top < window.innerHeight/2) {
      if (!firstPlay) preAboutVideo.play()
    }
  }
}
