import { Container, Row, Col } from "react-bootstrap";
import styles from "./Availability.module.scss";

function Availability() {
  return (
    <Container className={styles.container}>
      <Row>
        <Col xs={6}>
          <div className={styles.icon}>
            <img src="/ships-within.svg" alt="ships-wihin"></img>
          </div>
          <span className={styles.text}>Ships Within</span>
        </Col>
        <Col xs={6} className="text-right text-uppercase">
          <span className={styles.dayDuration}>3 Business Day</span>
        </Col>
      </Row>
      <div className={styles.availableOnline}>
        <div className={styles.icon}>
          <img src="/box-3.svg" alt="availeble-online"></img>
        </div>
        <span className={styles.text}>Available online</span>
      </div>
    </Container>
  );
}

export default Availability;
