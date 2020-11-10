import React from "react"
import { Row, Col, Button, Form, Container } from "react-bootstrap"
import clsx from "clsx"

import styles from "../CheckoutEmailPassword.module.scss"

export default function CheckoutPassword({ values, handleChange }) {
  return (
    <Row className={styles.emailBody}>
      <Container>
        <Row>
          <Col md="12">
            <h2 className="font-weight-bold">Looks like you’re new here,</h2>
            <p>
              Please enter a password to create your account continue to
              delivery and payment
            </p>
          </Col>
        </Row>

        <Form.Row>
          <Form.Group controlId="password" as={Col} xs="12">
            <Form.Label className={styles.formLabel}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your Password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="giftCardNumber" as={Col} xs="12">
            <Button
              variant="secondary"
              className={clsx(styles.btn, "w-100")}
              type="submit"
            >
              Continue
            </Button>
          </Form.Group>
        </Form.Row>
      </Container>
    </Row>
  )
}
