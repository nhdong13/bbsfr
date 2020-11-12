import React from "react"
import { Row, Col, Button, Form, Container } from "react-bootstrap"
import clsx from "clsx"

import styles from "../CheckoutEmailPassword.module.scss"

export default function CheckoutEmail({
  handleNextStep,
  values,
  handleChange,
}) {
  return (
    <Row className={styles.emailBody}>
      <Container>
        <Row>
          <Col md="12">
            <h2 className="font-weight-bold">Hi there,</h2>
            <p>Please enter your email to proceed to payment and delivery.</p>
          </Col>
        </Row>
        <Form.Row>
          <Form.Group controlId="email" as={Col} xs="12">
            <Form.Label className={styles.formLabel}>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email address"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="giftCardNumber" as={Col} xs="12">
            <Button
              variant="secondary"
              className={clsx(styles.btn, "w-100")}
              onClick={handleNextStep}
            >
              Continue
            </Button>
          </Form.Group>
        </Form.Row>
      </Container>
    </Row>
  )
}