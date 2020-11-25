export const detectParagraph = (p, limit) => {
  let detect = { position: 0, substring: 0 }
  let count = 0
  for (let i = 0; i < p.length; i++) {
    let preCount = count + p[i].text.length
    if (preCount > 480) {
      detect.position = i
      detect.substring = 480 - count
      break
    }
    count = preCount
  }
  return detect
}

export const upLink = (str) => {}
