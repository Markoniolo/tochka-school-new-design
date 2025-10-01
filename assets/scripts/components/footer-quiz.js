const footerQuizDocsSpan = document.querySelector('.footer-quiz__docs-span');

if (footerQuizDocsSpan) footerQuizDocsSpanInit()

function footerQuizDocsSpanInit () {
  footerQuizDocsSpan.addEventListener('click', () => {
    footerQuizDocsSpan.classList.toggle('footer-quiz__docs-span_active');
  })
}
