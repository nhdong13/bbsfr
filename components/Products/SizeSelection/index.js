import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Image from "next/image";
import styles from "./SizeSelection.module.scss";

function SizeSelection({ variants }) {
  const sortedvariants = () => {
    const order = ["S", "M", "L", "XL", "XXL"];
    return variants.sort((prev, next) => {
      let prevName = prev.name.toUpperCase();
      let nextName = next.name.toUpperCase();

      let nrPrev = parseInt(prevName);
      let nrNext = parseInt(nextName);

      if (nrPrev || nrNext) {
        return (nrPrev || 0) - (nrNext || 0);
      }

      return order.indexOf(prevName) - order.indexOf(nextName);
    });
  };

  const [selectedVariant, setSelectedVariant] = useState(null);
  console.log(variants);
  return (
    <Container className={styles.sizeSelectionContainer}>
      <Row>
        <Col xs={6} className={styles.sizeTitle}>
          Select Size
        </Col>
        <Col xs={6} className={styles.sizeGroup}>
          <div className={styles.sizeRuler}>
            <Image
              src="/ruler.svg"
              alt="rule-icon"
              width={16}
              height={16}
            ></Image>
          </div>
          <span className={styles.sizeChart}>Size Chart</span>
        </Col>
      </Row>
      <Row>
        {sortedvariants().map((variant) => {
          let itemClassName = variant.isAvailable
            ? styles.sizeItem
            : `${styles.sizeItem} ${styles.sizeDisabled}`;

          if (selectedVariant === variant.id) {
            itemClassName = `${itemClassName} ${styles.sizeActived}`;
          }

          return (
            <div className={styles.sizeCol} key={variant.id}>
              <div
                className={itemClassName}
                onClick={() => setSelectedVariant(variant.id)}
              >
                {variant.name}
              </div>
            </div>
          );
        })}
      </Row>
    </Container>
  );
}

export default SizeSelection;
