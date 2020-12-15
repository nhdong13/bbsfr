import { Col, Container, Row } from "react-bootstrap"
import Image from "next/image"
import styles from "../DepartmentPage.module.scss"

const SessionQuickLinksComponent = () => {
  return (
    <Container className={styles.sessionQuickLinks}>
      <p className={styles.sessionQuickLinksTitle}>QUICK LINKS</p>
      {links &&
        links.map((item, index) => (
          <Container key={index} className={styles.sessionQuickLinksRows}>
            <Row>
              <Col
                className={styles.sessionQuickLinksIcon}
                xs={2}
                sm={1}
                md={1}
                lg={1}
              >
                <div className={styles.sessionQuickLinksIconItem}>
                  <Image
                    src={item.icon}
                    alt={item?.name ? `Image ${item.name}` : ""}
                    width={24}
                    height={24}
                  ></Image>
                </div>
              </Col>
              <Col
                className={styles.sessionQuickLinksText}
                xs={8}
                sm={9}
                md={9}
                lg={9}
              >
                {item.name || "---"}
              </Col>
              <Col xs={1} sm={1} md={1} lg={1}>
                <div className={styles.sessionQuickLinksPath}>
                  <div className={styles.sessionQuickLinksPathItem}>{">"}</div>
                </div>
              </Col>
            </Row>
          </Container>
        ))}
    </Container>
  )
}
export default SessionQuickLinksComponent
