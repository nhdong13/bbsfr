import { Col, Row } from "react-bootstrap"
import styles from "../../ProductDetails.module.scss"
const KlarnaCostComponent = ({ contextLeft, cost, calculate }) => (
  <Row className={styles.sectionCostText}>
    <Col className={styles.sectionCostTextRight}>{contextLeft}</Col>
    <Col className={styles.sectionCostTextLeft}>{cost}</Col>
  </Row>
)
export default KlarnaCostComponent
