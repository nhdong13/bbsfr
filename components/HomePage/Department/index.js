import { Row, Container, Col } from "react-bootstrap";
import CustomLink from "./custom_link";
import styles from "../HomePage.module.scss";

export default function Department(props) {
  return (
    <CustomLink slug={props.slug}>
      <Container
        fluid
        className={styles.department}
        style={{ overflow: "hidden" }}
      >
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
          <div
            className={styles.department_image}
            style={{
              backgroundImage: `url(${props.image.url || ""})`,
              backgroundPosition: "revert",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </Row>
      </Container>
    </CustomLink>
  );
}
