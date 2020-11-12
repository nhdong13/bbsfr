import { useState } from "react"
import { Row, Button, Col } from "react-bootstrap"
import Image from "next/image"

import styles from "../Delivery.module.scss"
import { PAYMENT_METHODS } from "../constants"

export default function PaymentComponent() {
  const [paymentMethod, setPaymentMethod] = useState({})

  return (
    <Row className={styles.paymentBody}>
      <Col md="12">
        <h2 className="font-weight-bold">Payment</h2>
      </Col>
      <Col md="12" className={styles.groupMethod}>
        {PAYMENT_METHODS.map((method) => (
          <Button
            key={method.name}
            variant={paymentMethod.name === method.name ? "secondary" : "gray"}
            className={styles.btn}
            onClick={() => setPaymentMethod(method)}
          >
            <span className={styles.btnIcon}>
              <Image
                src={method.icon}
                alt={method.name}
                className="sss"
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
