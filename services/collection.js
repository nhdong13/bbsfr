function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeString = (str) => {
  return str.split("-").map(capitalize).join(" ")
}

export const countBooleanSortFilter = (arr) => {
  let countBoolean = 0
  arr.map((x) => x.open && countBoolean++)
  return countBoolean
}

export const listUpdate = (arr, id, bol) => {
  return arr.map((item, index) =>
    index == id ? { name: item.name, open: bol } : item
  )
}
