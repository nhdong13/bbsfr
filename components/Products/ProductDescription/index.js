import ReadMore from "../../ReadMore";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./ProductDescription.module.scss";

function ProductDescription({ description }) {
  const readMoreSettings = {
    charLimit: 450,
    readMoreText: "Read more",
    readLessText: "Read less",
    className: styles.readMoreContent,
  };

  return (
    <Container className={styles.productDetailsDescription}>
      <div className={styles.title}>Product Details</div>
      <ReadMore settings={readMoreSettings}>{description}</ReadMore>
    </Container>
  );
}

export default ProductDescription;