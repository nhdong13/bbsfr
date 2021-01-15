import { Col, Container, Row } from "react-bootstrap"
import styles from "./../Collections.module.scss"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"
import { constants } from "../../../constant"

const ListCategoriesComponent = ({ categories, type, typeBrand }) => {
  const [showItem, setItemToShow] = useState({
    itemToShow: constants.ITEM_TO_SHOW,
    expanded: false,
  })
  const expandCategory = () => {
    setItemToShow({
      itemToShow: showItem.expanded
        ? constants.ITEM_TO_SHOW
        : categories.length,
      expanded: !showItem.expanded,
    })
  }
  const router = useRouter()

  const handlePath = (category) => {
    switch (type) {
      case "collection":
        return `/${router?.query?.id}/${router?.query?.collection}${category.category_slug}`
      case "brandCollection":
        if (typeBrand && typeBrand === "category") {
          return `/brands/${router?.query?.brandHome}/${router?.query?.brandCollection}/c/${category.category_slug}`
        }
        return `/brands/${router?.query?.brandHome}/${router?.query?.brandCollection}/r/${category.category_slug}`
      case "vehicle":
        return `/vehicles/${router?.query?.vehicle}${category.category_slug}`
      case "vehicleCollection":
        return `/vehicles/${router?.query?.vehicle}/${router?.query?.vehicleCollection}/${category.category_slug}`
      default:
        return `/`
    }
  }

  return (
    <Container fluid className={styles.categories}>
      {categories && categories.length != 0 && (
        <div className={styles.list_category}>
          <Row>
            {categories &&
              categories.slice(0, showItem.itemToShow).map((category, id) => (
                <Col className="col-6" key={id}>
                  <Link href={handlePath(category)}>
                    <a>
                      <div className={styles.category}>
                        {category &&
                        category.category_title &&
                        category.category_title.length > 0
                          ? category.category_title[0].text
                          : "---"}
                        {/*TODO: Fetching data from Sajari for COUNT CATEGORY*/}
                        <div className={styles.count_category}>(65)</div>
                      </div>
                    </a>
                  </Link>
                </Col>
              ))}
          </Row>
        </div>
      )}
      {categories?.length >= 16 && (
        <div onClick={expandCategory} className={styles.show_less_show_more}>
          {showItem.expanded ? "View Less" : "View More"}
        </div>
      )}
    </Container>
  )
}
export default ListCategoriesComponent
