import { Container } from "react-bootstrap";
import styles from "../../ProductDetails.module.scss";
const KlarnaTextComponent = ({ title, context }) => {
  return (
    <Container fluid>
      <div className={styles.contextBody}>
        <div className={styles.contextBodyTitle}>
          <p>{title}</p>
        </div>
        <div className={styles.contextBodyText}>
          <p>{context}</p>
        </div>
      </div>
    </Container>
  );
};

export default KlarnaTextComponent;
