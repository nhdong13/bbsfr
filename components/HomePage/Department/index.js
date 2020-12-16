import React from "react"
import { Row, Container, Col } from "react-bootstrap"
import styles from "../HomePage.module.scss"
import Link from "next/link"
import Image from "next/image"
export default function Department(props) {
  return (
    <Link href={`${props.slug}`}>
      <a>
        <Container fluid className={styles.department}>
          <Row
            className={
              props.count % 2 != 0
                ? styles.main_group + " " + styles.style_second
                : styles.main_group
            }
          >
            <Col className={`col-6 ${styles.group_left}`}>
              <div className={styles.status_product}>{props.preHeader}</div>
              <div className={styles.text_header}>{props.title}</div>
              <div className={styles.shop_group}>
                <div className={styles.text_shop_now}>{props.callAction}</div>
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
              {props.title}
            </div>
            <div className={styles.department_image}>
              <Image
                width={215}
                height={207}
                className={styles.max_width_image}
                src={props.image.url || ""}
                alt="Image"
              />
            </div>
          </Row>
        </Container>
      </a>
    </Link>
  )
}
