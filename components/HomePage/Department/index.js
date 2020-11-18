import { Image, Row, Container, Col } from "react-bootstrap"
import styles from "../HomePage.module.scss"
import Link from 'next/link'
import { textCategory } from '../../../services/apartment'

export default function Department(props) {
  let text_category = textCategory(props.title)
  
  return (
    <Link href="/[slug]" as={`/${props.slug}`}>
    <Container className={styles.department}>
      <Row
        className={
          props.count % 2 != 0
            ? styles.main_group + " " + styles.style_second
            : styles.main_group
        }
      >
        <Col className={`col-4 ${styles.group_left}`}>
          <div className={styles.status_product}>{props.pre_header}</div>
          <div className={styles.text_header}>{props.title}</div>
          <div className={styles.shop_group}>
            <div className={styles.text_shop_now}>SHop Now</div>
            <div className={styles.triangle_right}></div>
          </div>
        </Col>
        <div
          className={
            props.count % 2 != 0
              ? styles.text_category_second + " " + styles.text_category
              : styles.text_category
          }
        >
          {text_category}
        </div>
        <div className={styles.department_image}>
          <Image
            src={props.image.url}
            alt=""
            width={270}
            height={216}
          />
        </div>
      </Row>
    </Container>
    </Link>
  )
}