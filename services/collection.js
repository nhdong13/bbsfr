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

export const mockupDataFilterCategory = (params) => {
  const arrCategory = [
    "Office & School Supplies",
    "Printer Ink & Toner",
    "Printer Ink",
    "Cameras & Camcorders",
    "Memory Cards",
    "All Memory Cards",
    "Cameras & Camcorders",
    "Memory Cards",
    "Micro SD (SD, SDHC, SDXC)",
    "Micro SDHC",
  ]
  const categoryId = params?.collection
  switch (categoryId) {
    case "road-jackets":
      return "Cameras & Camcorders"
    case "road-helmets":
      return "Printer Ink & Toner"
    case "road-boots":
      return "Office & School Supplies"
    case "road-clearance":
      return "Memory Cards"
    case "mx-goggles":
      return "Cameras & Camcorders"
    default:
      return arrCategory[Math.floor(Math.random() * arrCategory.length)]
  }
}