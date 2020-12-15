import styles from "../DepartmentPage.module.scss"
import { Container, Row, Col } from "react-bootstrap"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

const SessionBrowseByCategoryComponent = (props) => {
  const router = useRouter()
  const { collections } = props
  return (
    <>
      <Container className={styles.sessionTitleCategory}>
        <Row>
          <Col xs={9} sm={8} md={8} lg={8}>
            <p className={styles.sessionTitleCategoryTextRight}>
              BROWSE BY CATEGORY
            </p>
          </Col>
          <Col style={{ textAlign: "right" }} xs={3} sm={4} md={4} lg={4}>
            <Link href={`${router?.query?.id}/all`}>
              <a>
                <p className={styles.sessionTitleCategoryTextLeft}>VIEW ALL</p>
              </a>
            </Link>
          </Col>
        </Row>
      </Container>
      <div className={styles.sessionListCategory}>
        {collections &&
          collections.map((collection, index) => {
            return (
              <Link
                key={index}
                href={`${router?.query?.id}${collection.collection_slug}`}
              >
                <a>
                  <Container style={{ maxWidth: "unset" }}>
                    <div
                      className={
                        collections.length === index + 1
                          ? styles.containerItemCategoryLasted
                          : styles.containerItemCategory
                      }
                    >
                      <Row>
                        <Col
                          className={styles.categoryIndex}
                          xs={1}
                          sm={1}
                          md={1}
                          lg={1}
                          xl={1}
                        >
                          {index + 1 < 10 ? 0 : ""}
                          {index + 1}
                        </Col>
                        <Col
                          className={styles.categoryTitle}
                          xs={7}
                          sm={8}
                          md={9}
                          lg={9}
                          xl={9}
                        >
                          {collection.collection_title &&
                          collection.collection_title.length > 0
                            ? collection.collection_title[0].text
                            : "---"}
                        </Col>
                        <Col xs={3} sm={3} md={2} lg={2} xl={2}>
                          <div className={styles.categoryLeft}>
                            <div className={styles.categoryLeftImg}>
                              <Image
                                src={collection.collection_image.url}
                                alt={collection.collection_image.alt || ""}
                                width={57}
                                height={62}
                              />
                            </div>
                            <div className={styles.categoryLeftIcon}>{">"}</div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Container>
                </a>
              </Link>
            )
          })}
      </div>
    </>
  )
}
export default SessionBrowseByCategoryComponent
