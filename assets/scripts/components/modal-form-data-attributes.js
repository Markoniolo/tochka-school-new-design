$("[data-fancybox]").fancybox({
  beforeShow: function(instance){
    try {
      const form = document.querySelector(this.src)
      const openButton = instance.current.opts.$orig
      if (form) {
        setDataFtitle(openButton, form)
        setBannerName(openButton, form)
      }
    } catch (e) {

    }
  },
  afterClose: function() {
    try {
      const form = document.querySelector(this.src)
      if (form) {
        setDefaultDataFtitle(form)
        setDefaultBannerName(form)
      }
    } catch (e) {

    }
  }
})

function setBannerName (button, form) {
  const input = form.querySelector('input[name="banner_v"]')
  const value = button.attr('data-banner')
  if (input && value) input.value = value
}

function setDefaultBannerName (form) {
  const input = form.querySelector('input[name="banner_v"]')
  if (input) input.value = ''
}

function setDataFtitle (button, form) {
  const title = button.attr('data-ftitle')
  const titleTag = form.querySelector('.modal-order-new__title')
  if (title && title?.length > 1 && titleTag) {
    titleTag.innerHTML = title
  }
}

function setDefaultDataFtitle (form) {
  const titleTag = form.querySelector('.modal-order-new__title')
  if (titleTag) {
    const defaultTitle = titleTag.getAttribute('data-default-title')
    if (defaultTitle) titleTag.innerHTML = defaultTitle
  }
}
