import { Row, Button, Col } from "react-bootstrap"
import Image from "next/image"

import styles from "../Delivery.module.scss"
import { PAYMENT_METHODS_ICON } from "../constants"

export default function PaymentComponent({
  availablePaymentGateways,
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <Row className={styles.paymentBody}>
      <Col md="12">
        <h2 className="font-weight-bold">Payment</h2>
      </Col>
      <Col md="12" className={styles.groupMethod}>
        {availablePaymentGateways.map((method) => (
          <Button
            key={method.id}
            variant={paymentMethod?.id === method.id ? "secondary" : "gray"}
            className={styles.btn}
            onClick={() => setPaymentMethod(method)}
          >
            <span className={styles.btnIcon}>
              <Image
                src={PAYMENT_METHODS_ICON[method.id]}
                alt={method.name}
                width={48}
                height={16}
              />
            </span>
          </Button>
        ))}
        <div className={styles.dumbContent}></div>
        <div className={styles.dumbContent}></div>
        <div className={styles.dumbContent}></div>
      </Col>
    </Row>
  )
}
