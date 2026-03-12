const targetEl = document.getElementById('cardTarget')
const catEl = document.getElementById('cat')
const linkGroupEl = document.getElementById('linkGroup')

let found = false
let startTime = null

function setupLinks() {
  document.querySelectorAll('.link-btn').forEach((el) => {
    el.addEventListener('click', () => {
      const url = el.dataset.url
      if (url) window.open(url, '_blank')
    })
  })
}

function showLinksSequentially() {
  if (!linkGroupEl) return
  linkGroupEl.setAttribute('visible', true)

  const buttons = [...linkGroupEl.querySelectorAll('.link-btn')]
  buttons.forEach((btn) => btn.setAttribute('visible', false))

  buttons.forEach((btn, i) => {
    setTimeout(() => {
      btn.setAttribute('visible', true)
    }, 120 * i)
  })
}

function onFound() {
  if (found) return
  found = true
  showLinksSequentially()
}

function onLost() {
  found = false
  if (linkGroupEl) linkGroupEl.setAttribute('visible', false)
}

function animate(ts) {
  if (!startTime) startTime = ts
  const t = (ts - startTime) / 1000

  if (catEl) {
    const y = 0.035 + Math.sin(t * 2.0) * 0.004
    catEl.setAttribute('position', `0 ${y.toFixed(3)} 0`)
  }

  requestAnimationFrame(animate)
}

setupLinks()

if (targetEl) {
  targetEl.addEventListener('xrimagefound', onFound)
  targetEl.addEventListener('xrimagelost', onLost)
}

requestAnimationFrame(animate)