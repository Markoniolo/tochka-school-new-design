const animationsOnScroll = document.querySelectorAll('[data-animate-on-scroll]')

if (animationsOnScroll.length) animationsOnScrollInit()

function animationsOnScrollInit () {
  gsap.registerPlugin(ScrollTrigger)

  for (let i = 0; i < animationsOnScroll.length; i++) {
   initGsapScrollTrigger(animationsOnScroll[i])
  }

  function initGsapScrollTrigger (node) {
    gsap.to(node, {
      scrollTrigger: {
        trigger: node,
        start: "top 95%",
        onEnter: () => node.classList.add("active")
      }
    })
  }
}
