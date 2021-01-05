import { useEffect, useState } from "react"
import SessionBrowseByCategoryComponent from "../../../DepartmentDetail/Sesstion/SessionBrowseByCategoryComponent"
import HeaderRightComponent from "../HeaderRight"

const RightElementNavComponent = ({ element, dataNav }) => {
  const [collections, setCollections] = useState([])
  useEffect(async () => {
    const index =
      dataNav &&
      dataNav.length > 0 &&
      dataNav.findIndex((i) => i.department === element.department_slug)
    if (index !== undefined && index !== -1) {
      setCollections(dataNav[index].collections)
    } else {
      setCollections([])
    }
  }, [element])

  return (
    <>
      <div>
        <HeaderRightComponent title={element.name} />
        <SessionBrowseByCategoryComponent
          departmentSlug={element.department_slug}
          collections={collections}
          disableTitleContainer={true} //flag to switch component title - flag required when using form Nav
        />
      </div>
    </>
  )
}
export default RightElementNavComponent
