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

export const updateParagraph = (p) => {
  let result = p.map((x) => {
    upLink(x)
  })
  return result
}

//substring(0,detect.substring - 1)

const upLink = (p) => {
  let spans = p.spans
  let result = []
  for (let i in spans) {
    result[i] = p.text
      .substring(spans[i].start, spans[i].end)
      .link(spans[i].data.url)
  }
  console.log(result)
  // debugger
}

export const replaceNbsps = (str) => {
  var re = new RegExp(String.fromCharCode(160), "g")
  return str.replace(re, " ")
}
