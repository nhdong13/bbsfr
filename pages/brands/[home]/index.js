import { route } from "next/dist/next-server/server/router"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import BrandHomeComponent from "../../../components/Brand/Components/BrandHomeComponent"
import { getDepartmentByUID } from "../../../lib/prismic/api"

const BrandHomePage = () => {
  const [element] = useState({
    name: "Road Gear",
    active: true,
    department_slug: "road-gear",
  })
  const router = useRouter()
  return <BrandHomeComponent element={element} heading={router?.query?.home} />
}
export default BrandHomePage
