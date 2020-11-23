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
