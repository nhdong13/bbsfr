import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { getDepartmentByUID } from "../../../../lib/prismic/api"

const HeaderRightDynamic = dynamic(() => import("../HeaderRight"))
const SessionBrowseByCategoryDynamic = dynamic(() =>
  import("../../../DepartmentDetail/Sesstion/SessionBrowseByCategoryComponent")
)
const RightElementNavComponent = ({ element }) => {
  const [collections, setCollections] = useState([])
  useEffect(async () => {
    const { collections } = await getDepartmentByUID(element.department_slug)
    setCollections(collections)
  }, [element])

  return (
    <>
      <div>
        <HeaderRightDynamic title={element.name} />
        <SessionBrowseByCategoryDynamic
          departmentSlug={element.department_slug}
          collections={collections}
          disableTitleContainer={true} //flag to switch component title - flag required when using form Nav
        />
      </div>
    </>
  )
}
export default RightElementNavComponent
