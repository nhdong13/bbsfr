function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const capitalizeString = (str) => {
  return str.split("-").map(capitalize).join(" ")
}
