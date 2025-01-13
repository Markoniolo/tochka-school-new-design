const preReviewsVideoWraps = document.querySelectorAll("[data-element='pre-reviews-video-wrap']")

if (preReviewsVideoWraps.length) preReviewsVideoWrapsInit()

function preReviewsVideoWrapsInit () {
  for (let i = 0; i < preReviewsVideoWraps.length; i++) {
    videoInit(preReviewsVideoWraps[i])
  }

  function videoInit (wrap) {
    const video = wrap.querySelector("[data-element='pre-reviews-video']")
    wrap.addEventListener('click', playVideo, {once: true})

    function playVideo () {
      wrap.classList.add('active')
      video.controls = true
      setTimeout(() => video.play(), 100)
    }
  }
}
