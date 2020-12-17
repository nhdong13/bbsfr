import { Col, Form, Container } from "react-bootstrap"

import ErrorMessageWrapper from "../../../ErrorMessageWrapper"
import styles from "../../Delivery.module.scss"

export default function CreditCardFrom({ show, errors, touched }) {
  return (
    <Container className={show ? "" : "d-none"}>
      <Form.Row>
        <Form.Group controlId="number" as={Col} xs="12">
          <Form.Label>Card Number</Form.Label>
          <div id="card-number" className={styles.hostedField}></div>
          <ErrorMessageWrapper
            errors={errors}
            touched={touched}
            fieldName="creditCard.number"
          />
        </Form.Group>

        <Form.Group controlId="expirationDate" as={Col} xs="6">
          <Form.Label>Expiry Date</Form.Label>
          <div id="expiration-date" className={styles.hostedField}></div>
          <ErrorMessageWrapper
            errors={errors}
            touched={touched}
            fieldName="creditCard.expirationDate"
          />
        </Form.Group>

        <Form.Group controlId="cvv" as={Col} xs="6">
          <Form.Label>CVV</Form.Label>
          <div id="cvv" className={styles.hostedField}></div>
          <ErrorMessageWrapper
            errors={errors}
            touched={touched}
            fieldName="creditCard.cvv"
          />
        </Form.Group>
      </Form.Row>
    </Container>
  )
}
