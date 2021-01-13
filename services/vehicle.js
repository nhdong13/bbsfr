export const groupBy = (listObj, key) => {
  return listObj.reduce((obj, item) => {
    ;(obj[item[key]] = obj[item[key]] || []).push(item)
    return obj
  }, {})
}

export const getMotorcyclesData = (data) => {
  return data.map((i) => i.node)
}

export const generateMotorcyclesGroup = (data) => {
  let motorcycleDataArr = getMotorcyclesData(data)
  //Group by motorcycle_make
  let res = groupBy(motorcycleDataArr, "motorcycle_make")

  //Group by motorcycle_year
  Object.keys(res).forEach((key) => {
    let resYearGrouped = groupBy(res[key], "motorcycle_year")
    res[key] = Object.keys(resYearGrouped)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map((key) => {
        let obj = {}
        obj[key] = resYearGrouped[key]
        return obj
      })
  })
  return res
}
