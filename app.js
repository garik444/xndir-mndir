

  drawBackground()
  for(const r of rects) r.draw()
  for(const c of circles) c.draw()

  requestAnimationFrame(loop)
}

loop()
