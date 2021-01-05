import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import SessionBrowseByCategoryComponent from "../../DepartmentDetail/Sesstion/SessionBrowseByCategoryComponent"
import { getBrandByUid, getDepartmentByUID } from "../../../lib/prismic/api"
import styles from "../Brand.module.scss"
import dynamic from "next/dynamic"
import ImagedHeaderComponent from "./ImagedHeaderComponent"
import {
  useSearchContext,
  useFilter,
  SearchProvider,
} from "@sajari/react-hooks"
const SEODynamic = dynamic(() => import("../../HomePage/SEO"))

const BrandHomeComponent = ({ element, heading }) => {
  const [collections, setCollections] = useState([])
  useEffect(async () => {
    const { collections } = await getDepartmentByUID(element.department_slug)
    setCollections(collections)
    const { brand } = await getBrandByUid("alpinestars-mx")
    setBrand
  }, [element])

  console.log(brand)

  return (
    <>
      <ImagedHeaderComponent
        header={heading}
        productsCount="20"
        imgUrl="https://news.itu.int/wp-content/uploads/2018/07/citymobility-min-e1530886118305.jpg"
      />
      <SessionBrowseByCategoryComponent
        departmentSlug={element.department_slug}
        collections={collections}
        disableTitleContainer={true}
      />

      <SEODynamic heading1={"ALPINESTARS"} pageParagraph={[]} />
    </>
  )
}
export default BrandHomeComponent
