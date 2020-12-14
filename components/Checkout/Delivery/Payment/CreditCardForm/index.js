import { Col, Form, Container } from "react-bootstrap"

import ErrorMessageWrapper from "../../../ErrorMessageWrapper"

export default function CreditCardFrom({
  creditCard,
  handleChange,
  errors,
  touched,
}) {
  return (
    <Container>
      <Form.Row>
        <Form.Group controlId="cardNumber" as={Col} xs="12">
          <Form.Label>Card Number</Form.Label>
          {/* <Form.Control
            type="text"
            placeholder="4111 1111 1111 1111"
            name="creditCard.cardNumber"
            value={creditCard.cardNumber}
            onChange={handleChange}
          /> */}
          <div id="card-number" className="hosted-field"></div>

          <ErrorMessageWrapper
            errors={errors}
            touched={touched}
            fieldName="creditCard.cardNumber"
          />
        </Form.Group>

        <Form.Group controlId="expirationDate" as={Col} xs="6">
          <Form.Label>Expiry Date</Form.Label>
          {/* <Form.Control
            type="text"
            placeholder="MM / YY"
            name="creditCard.expirationDate"
            value={creditCard.expirationDate}
            onChange={handleChange}
          /> */}
          <div id="expiration-date" className="hosted-field"></div>
          <ErrorMessageWrapper
            errors={errors}
            touched={touched}
            fieldName="creditCard.expirationDate"
          />
        </Form.Group>

        <Form.Group controlId="cvv" as={Col} xs="6">
          <Form.Label>CVV</Form.Label>
          {/* <Form.Control
            type="text"
            placeholder="123"
            name="creditCard.cvv"
            value={creditCard.cvv}
            onChange={handleChange}
          /> */}
          <div id="cvv" className="hosted-field"></div>
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
