import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import SessionBrowseByCategoryComponent from "../../DepartmentDetail/Sesstion/SessionBrowseByCategoryComponent"
import { getDepartmentByUID } from "../../../lib/prismic/api"
import styles from "../Brand.module.scss"
import dynamic from "next/dynamic"

const ListProductsDynamic = dynamic(() =>
  import("../../Collection/Components/ListProductsComponent")
)

const BestSellersComponent = (props) => {
  const { products, brandHeading } = props
  return (
    <>
      <p className={styles.bestSellersHeading}>{brandHeading} BEST SELLERS</p>
      {/* {products && <ListProductsDynamic products={products} />} */}
    </>
  )
}
export default BestSellersComponent
