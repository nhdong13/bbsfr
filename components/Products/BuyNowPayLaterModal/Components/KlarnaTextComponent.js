import { Container } from "react-bootstrap";
import styles from "../../BuyNowPayLater/BuyNowPayLater.module.scss";
const KlarnaTextComponent = ({ title, context, type }) => {
  return (
    <Container fluid>
      <div className={styles.contextBody}>
        <div className={styles.contextBodyTitle}>
          <p>{title}</p>
        </div>
        {type === "normal" ? (
          <div className={styles.contextBodyText}>
            <p>{context}</p>
          </div>
        ) : (
          <div
            className={styles.contextBodyText}
            dangerouslySetInnerHTML={{ __html: context }}
          ></div>
        )}
      </div>
    </Container>
  );
};

export default KlarnaTextComponent;
