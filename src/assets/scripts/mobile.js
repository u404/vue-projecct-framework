const designWidth = 750
const maxPageWidth = 500

function responsive () {
  let clientWidth = document.documentElement.clientWidth > maxPageWidth ? maxPageWidth : document.documentElement.clientWidth
  document.documentElement.style.fontSize = clientWidth * 100 / designWidth * 2 + 'px'
}

responsive()
window.onresize = responsive
