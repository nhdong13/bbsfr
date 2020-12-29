import { useEffect, useState } from "react"
import { getDepartmentByUID } from "../../../../lib/prismic/api"
import SessionBrowseByCategoryComponent from "../../../DepartmentDetail/Sesstion/SessionBrowseByCategoryComponent"
import HeaderRightComponent from "../HeaderRight"

const RightElementNavComponent = ({ element }) => {
  const [collections, setCollections] = useState([])
  useEffect(async () => {
    const { collections } = await getDepartmentByUID(element.department_slug)
    setCollections(collections)
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
