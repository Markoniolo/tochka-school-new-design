const faqItems = document.querySelectorAll("[data-element='faq-item']")

for (let i = 0; i < faqItems.length; i++) {
  faqItems[i].addEventListener("click", toggleFaqItem)

  function toggleFaqItem () {
    this.classList.toggle('active')
  }
}
