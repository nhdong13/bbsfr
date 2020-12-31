import { getAllDepartments, getDepartmentByUID } from "../lib/prismic/api"

export const getDataForMainNav = async () => {
  const departmentRes = await getAllDepartments()
  const list_department = departmentRes[0].node.department_link
  const departments = list_department.map((i) => {
    if (i?.department_slug) {
      return i.department_slug
    }
  })
  const arr = []
  for (const department of departments) {
    const { collections } = await getDepartmentByUID(department.substr(1))
    if (collections) {
      arr.push({
        department,
        collections,
      })
    }
  }
  return arr
}
