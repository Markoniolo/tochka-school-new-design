const courseAboutVideoWraps = document.querySelectorAll("[data-element='course-about-video-wrap']")

for (let i = 0; i < courseAboutVideoWraps.length; i++) {
  courseAboutVideoWrapInit(courseAboutVideoWraps[i])
}

function courseAboutVideoWrapInit (videoWrap) {
  const courseAboutVideo = videoWrap.querySelector("[data-element='course-about-video']")
  const soundBtn = videoWrap.querySelector(".course-about__sound")
  let startPlayTime = courseAboutVideo.getAttribute('data-play-start')
  if (!startPlayTime) startPlayTime = 0

  try {
    courseAboutVideo.currentTime = startPlayTime
  } catch (e) {
    console.log(e)
  }

  courseAboutVideo.addEventListener('loadeddata', videoLoaded)

  function videoLoaded () {
    videoWrap.classList.add('loaded')
  }

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
