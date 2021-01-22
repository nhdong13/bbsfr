import { Col, Row } from "react-bootstrap";
import Money from "../../../Money";
import styles from "../../BuyNowPayLater/BuyNowPayLater.module.scss";

const KlarnaCostComponent = ({ contextLeft, cost, calculate }) => (
  <Row className={styles.sectionCostText}>
    <Col className={styles.sectionCostTextRight}>{contextLeft}</Col>
    <Col className={styles.sectionCostTextLeft}>
      {calculate ? (
        <div>
          4 X <Money money={{ amount: cost }} supStyle={true} />
        </div>
      ) : (
        <div>
          $<Money money={{ amount: cost }} supStyle={true} />
        </div>
      )}
    </Col>
  </Row>
);
export default KlarnaCostComponent;
