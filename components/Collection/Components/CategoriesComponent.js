import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import styles from "../Collections.module.scss"
import Link from "next/link"
import { useRouter } from "next/router"
import { capitalizeString } from "../../../services/collection"

const CategoriesComponent = ({ categories = [], shopByCategoryText }) => {
  const [showItem, setItemToShow] = useState({
    itemToShow: 16,
    expanded: false,
  })
  const [isShowPreName, setShowPreName] = useState(false)
  const [preRoute, setPreRoute] = useState("")

  const expandCatefory = () => {
    setItemToShow({
      itemToShow: showItem.expanded ? 16 : categories.length,
      expanded: !showItem.expanded,
    })
  }
  const router = useRouter()

  return (
    <>
      <Container fluid className={styles.categories}>
        <div className={styles.header_category}>{shopByCategoryText}</div>
        <div className={styles.list_category}>
          {categories && categories.length && (
            <Row>
              {categories &&
                categories.slice(0, showItem.itemToShow).map((category, id) => (
                  <Col className="col-6 pb-1" key={id}>
                    <Link href={category.category_slug}>
                      <div className={styles.category}>
                        {category.category_title[0].text}
                        <div className={styles.count_category}>(65)</div>
                      </div>
                    </Link>
                  </Col>
                ))}
            </Row>
          )}
        </div>
        {categories.length >= 16 && (
          <div onClick={expandCatefory} className={styles.show_less_show_more}>
            {showItem.expanded ? "View Less" : "View More"}
          </div>
        )}
      </Container>
      <Container fluid className={styles.pre_page_button}>
        <div onClick={() => router.back()}>
          &#8249; {capitalizeString(router.query.id)}
        </div>
      </Container>
    </>
  )
}

export default CategoriesComponent
