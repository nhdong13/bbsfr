export const pad = (n) => {
  return n < 10 ? "0" + n : n
}

export const chunks = (arr, n) => {
  let groups = []
  groups = arr.reduce(
    (r, e, i) => (i % n ? r[r.length - 1].push(e) : r.push([e])) && r,
    []
  )
  return groups
}

export const checkID = (id, styles, length = 0) => {
  let classType

  switch (id) {
    case 0:
      classType = length == 1 ? "" : styles.border_right_bottom
      break
    case 1:
      classType =
        length == 2 ? styles.border_bottom : styles.border_right_bottom
      break
    case 2:
      classType = styles.border_bottom
      break
    case 3:
      classType = length == 4 ? (classType = "") : styles.border_right
      break
    case 4:
      classType = length == 5 ? (classType = "") : styles.border_right
      break
    default:
      classType = ""
      break
  }
  return classType
}