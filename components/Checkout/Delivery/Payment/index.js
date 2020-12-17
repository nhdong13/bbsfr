import { Row, Button, Col } from "react-bootstrap"
import Image from "next/image"
import clsx from "clsx"

import CreditCardForm from "./CreditCardForm"
import ErrorMessageWrapper from "../../ErrorMessageWrapper"
import styles from "../Delivery.module.scss"
import {
  PAYMENT_METHODS_ICON,
  BRAINTREE_SUPPORTED_METHODS,
  NUMBER_DUMP_CONTENT_FLEXBOX,
} from "../constants"

export default function PaymentComponent({
  availablePaymentGateways,
  paymentMethod,
  setFieldValue,
  errors,
  touched,
  googlePayInstance,
}) {
  return (
    <Row className={styles.paymentBody}>
      <Col md="12">
        <h2 className="font-weight-bold">Payment</h2>
      </Col>
      <Col md="12" className={styles.groupMethod}>
        {availablePaymentGateways.map((method) => {
          if (PAYMENT_METHODS_ICON[method.id]) {
            return (
              <Button
                key={method.id}
                variant={paymentMethod?.id === method.id ? "secondary" : "gray"}
                className={styles.btn}
                onClick={() => setFieldValue("paymentMethod", method)}
              >
                <span className={styles.btnIcon}>
                  <Image
                    src={PAYMENT_METHODS_ICON[method.id]}
                    alt={method.name || ""}
                    width={48}
                    height={16}
                  />
                </span>
              </Button>
            )
          } else if (method.id === "mirumee.payments.braintree") {
            return BRAINTREE_SUPPORTED_METHODS.map((methodId) => (
              <Button
                key={methodId}
                variant={
                  paymentMethod?.subId === methodId ? "secondary" : "gray"
                }
                className={clsx(
                  styles.btn,
                  methodId === "bikebiz.payments.googlepay" &&
                    !googlePayInstance
                    ? "d-none"
                    : ""
                )}
                onClick={() =>
                  setFieldValue("paymentMethod", {
                    ...method,
                    subId: methodId,
                  })
                }
              >
                <span className={styles.btnIcon}>
                  <Image
                    src={PAYMENT_METHODS_ICON[methodId]}
                    alt={method.name || ""}
                    width={48}
                    height={16}
                  />
                </span>
              </Button>
            ))
          }
        })}

        {Array(NUMBER_DUMP_CONTENT_FLEXBOX)
          .fill()
          .map((_, index) => (
            <div key={index} className={styles.dumbContent}></div>
          ))}
      </Col>
      <Col md="12">
        <ErrorMessageWrapper
          errors={errors}
          touched={touched}
          fieldName="paymentMethod"
        />
      </Col>

      <CreditCardForm
        errors={errors}
        touched={touched}
        show={
          paymentMethod?.id === "mirumee.payments.braintree" &&
          paymentMethod?.subId === "bikebiz.payments.creditCard"
        }
      />
    </Row>
  )
}
