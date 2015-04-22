# Smooth scroll animation
smoothScroll = (elementID) ->
  `var i`

  elmYPosition = (elm) ->
    y = elm.offsetTop
    node = elm
    while node.offsetParent and node.offsetParent != document.body
      node = node.offsetParent
      y += node.offsetTop
    return y

  el = document.getElementById(elementID)
  startY = window.pageYOffset
  stopY = elmYPosition(el)
  distance = if stopY > startY then stopY - startY else startY - stopY

  # if distance is less than 100 execute without smooth
  if distance < 100
    return scrollTo 0, stopY

  speed = Math.round(distance / 100)

  if speed >= 20
    speed = 20

  step = Math.round(distance / 25)
  leapY = if stopY > startY then startY + step else startY - step
  timer = 0

  if stopY > startY
    i = startY
    while i < stopY
      setTimeout 'window.scrollTo(0, ' + leapY + ')', timer * speed
      leapY += step
      if leapY > stopY
        leapY = stopY
      timer++
      i += step
    return
  i = startY
  while i > stopY
    setTimeout 'window.scrollTo(0, ' + leapY + ')', timer * speed
    leapY -= step
    if leapY < stopY
      leapY = stopY
    timer++
    i -= step
  return

# Application
App = ->

  self = @

  @.setListeners = ->
    ourWorkBtn = document.getElementById('ourWorkBtn')
    burgerLink = document.getElementById 'burgerLink'
    mobileNav = document.getElementById 'mobileNav'
    mobileNavClose = document.getElementById 'mobileNavClose'

    ourWorkBtnAction = (e)->
        e.preventDefault()
        smoothScroll 'ourWork'

    burgerLinkAction = (e)->
      e.preventDefault()
      mobileNav.classList.remove('is-sm-hidden')

    mobileNavCloseAction = (e)->
      e.preventDefault()
      mobileNav.classList.add('is-sm-hidden')

    if window.ontouchstart
      if ourWorkBtn then ourWorkBtn.ontouchstart = ourWorkBtnAction
      if burgerLink then burgerLink.ontouchstart = burgerLinkAction
      if mobileNavClose then mobileNavClose.ontouchstart = mobileNavCloseAction
    else
      if ourWorkBtn then ourWorkBtn.onclick = ourWorkBtnAction
      if burgerLink then burgerLink.onclick = burgerLinkAction
      if mobileNavClose then mobileNavClose.onclick = mobileNavCloseAction

  @.start = ->
    self.setListeners()

  return @

# Initializing application
app = new App()

# on DOM ready start application
document.addEventListener 'DOMContentLoaded', app.start
