const lottieAnimations = document.querySelectorAll('[data-path]')

for (let i = 0; i < lottieAnimations.length; i++) {
  lottie.loadAnimation({
    container: lottieAnimations[i],
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: lottieAnimations[i].getAttribute('data-path')
  })
}
