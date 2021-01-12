import React from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import ListCategoriesComponent from "./ListCategoriesComponent"

const BackToPageBeforeDynamic = dynamic(() =>
  import("../../Common/BackPageComponent")
)
const TitleCategoryDynamic = dynamic(() => import("./TitleCategoryComponent"))
const CategoriesComponent = ({ categories = [], shopByCategoryText }) => {
  const router = useRouter()
  return (
    <>
      <TitleCategoryDynamic title={shopByCategoryText} />
      <ListCategoriesComponent categories={categories} type="collection" />
      <BackToPageBeforeDynamic page={router.query.id} type="collection" />
    </>
  )
}

export default CategoriesComponent
