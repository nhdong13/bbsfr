import { useState } from "react"
import { Collapse, Container } from "react-bootstrap"
import styles from "../Brand.module.scss"
import Image from "next/image"
import { convertDataShopByCollectionBrand } from "../../../services/brand"
import dynamic from "next/dynamic"
const ListCategoryDynamic = dynamic(() =>
  import("../../Collection/Components/ListCategoriesComponent")
)

const ShopByBrandCollectionComponent = ({ type, arrData }) => {
  const [open, setOpen] = useState(false)
  const dataShopBy =
    type && type === "category"
      ? arrData
      : convertDataShopByCollectionBrand(arrData)
  return (
    <>
      <Container
        fluid
        className={styles.titleCollapse}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.collapseLeft}>
          {type && type === "category" ? "Shop By Category" : "Shop By Range"}
        </div>
        <div className={styles.collapseRight}>
          <div className={styles.collapseRightPosition}>
            <div className={styles.collapseRightImg}>
              <Image
                src={
                  open
                    ? "/icons/subtractForBrandCollection.svg"
                    : "/icons/plusForBrandCollection.svg"
                }
                alt={open ? "Icon subtract" : "Icon plus"}
                loading="lazy"
                layout="fill"
              ></Image>
            </div>
          </div>
        </div>
      </Container>
      <Collapse in={open}>
        <div>
          <div className={styles.section}>
            <ListCategoryDynamic
              categories={dataShopBy}
              typeBrand={type && type === "category" ? "category" : "range"}
              type="brandCollection"
            />
          </div>
        </div>
      </Collapse>
    </>
  )
}
export default ShopByBrandCollectionComponent
