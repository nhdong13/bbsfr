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
