import { Col, Row, Container } from "react-bootstrap";
import styles from "../../BuyNowPayLater/BuyNowPayLater.module.scss";
import Image from "next/image";
import { LOGO_PRODUCT_MODULE } from "../../../../constant";
import clsx from "clsx";

const KlarnaCheckoutComponent = ({ title }) => {
  const context = [
    {
      text: "Add item(s) to your cart and select Klarna at checkout.",
    },
    {
      text: "Enter your debit or credit card information.",
    },
    {
      text:
        "Pay later over 4 instalments. The first payment is taken when the order is processed.",
    },
    {
      text: "The remaining 3 payments are automatically taken every two weeks.",
    },
  ];
  return (
    <div className={styles.containerKarnaCheckout}>
      <div className={styles.contextBodyTitle}>
        <p>{title}</p>
      </div>
      <div className={styles.paddingTop}>
        <div className={styles.left}>
          <div className={styles.BoxLeftBorder}>
            <Image
              width="48"
              height="12"
              loading="eager"
              src={LOGO_PRODUCT_MODULE.klarnaText}
              alt="Logo Klarna"
            />
          </div>
          <div className={styles.line} />
          <div className={styles.BoxLeftBorder}>
            <Image
              width="23"
              height="23"
              loading="eager"
              src={LOGO_PRODUCT_MODULE.creditLocked}
              alt="Logo Klarna"
            />
          </div>
          <div className={styles.line} />
          <div className={styles.BoxLeftBorder}>
            <Image
              width="23"
              height="23"
              loading="eager"
              src={LOGO_PRODUCT_MODULE.timeMachine}
              alt="Logo Klarna"
            />
          </div>
          <div className={styles.line} />
          <div className={styles.BoxLeftBorder}>
            <Image
              width="23"
              height="23"
              loading="eager"
              src={LOGO_PRODUCT_MODULE.openingTime}
              alt="Logo Klarna"
            />
          </div>
        </div>
        <div className={styles.right}>
          {context &&
            context.map((i, index) => {
              return (
                <div
                  key={index}
                  className={clsx(
                    styles.BoxRight,
                    index !== 0 ? styles.margin : ""
                  )}
                >
                  {i.text}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default KlarnaCheckoutComponent;
