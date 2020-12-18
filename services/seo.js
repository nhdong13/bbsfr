export const detectParagraph = (p, limit) => {
  let detect = { position: 0, substring: 0 }
  let count = 0
  for (let i = 0; i < p.length; i++) {
    let preCount = count + p[i].text.length
    if (preCount > limit) {
      detect.position = i
      detect.substring = limit - count
      break
    }
    count = preCount
  }
  return detect
}

export const updateParagraph = (p) => {
  let result = p.map((x) => {
    x.spans.length != 0 && upLink(x)
  })
  return result
}

const upLink = (p) => {
  let spans = p.spans
  let result = []
  for (let i in spans) {
    result[i] = p.text
      .substring(spans[i].start, spans[i].end)
      .link(spans[i].data.url)
  }
  return result
}

export const convertParagraph = (paragraph) => {
  var re = new RegExp(String.fromCharCode(160), "g")
  for (let i in paragraph) {
    paragraph[i].text = paragraph[i].text.replace(re, " ")
  }
  return paragraph
}

export const replaceNbsps = (str) => {
  var re = new RegExp(String.fromCharCode(160), "g")
  return str.replace(re, " ")
}

export const countParagrapp = (paragraph) => {
  let count = 0
  for (let i of paragraph) {
    count += i.text.length
  }
  return count
}
