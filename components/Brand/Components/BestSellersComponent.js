import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import SessionBrowseByCategoryComponent from "../../DepartmentDetail/Sesstion/SessionBrowseByCategoryComponent"
import { getDepartmentByUID } from "../../../lib/prismic/api"
import styles from "../Brand.module.scss"

const BrandHomeComponent = ({ element }) => {
  const [collections, setCollections] = useState([])
  useEffect(async () => {
    const { collections } = await getDepartmentByUID(element.department_slug)
    setCollections(collections)
  }, [element])
  return (
    <>
      <Container
        fluid
        className={styles.imagedHeader}
        style={{
          backgroundImage:
            "url('https://news.itu.int/wp-content/uploads/2018/07/citymobility-min-e1530886118305.jpg')",
        }}
      >
        <p className={styles.header}>ALPINESTARS</p>
      </Container>
      <SessionBrowseByCategoryComponent
        departmentSlug={element.department_slug}
        collections={collections}
        disableTitleContainer={true}
      />
    </>
  )
}
export default BrandHomeComponent
