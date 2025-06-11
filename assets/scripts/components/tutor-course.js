const tutorCourseAnimation = document.querySelector('.tutor-course__animation')

if (tutorCourseAnimation) tutorCourseAnimationInit()

function tutorCourseAnimationInit () {
  lottie.loadAnimation({
    container: tutorCourseAnimation,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: tutorCourseAnimation.getAttribute('data-path')
  });
}
