import React from "react"
import { Row, Col, Button, Form, Container } from "react-bootstrap"
import clsx from "clsx"

import ErrorMessageWrapper from "../../ErrorMessageWrapper"
import styles from "../CheckoutEmailPassword.module.scss"

export default function CheckoutPassword({
  values,
  handleChange,
  existedEmailChecking,
  errors,
  touched,
  handleCheckoutAsGuest,
}) {
  return (
    <Row className={styles.emailBody}>
      <Container>
        <Row>
          <Col md="12">
            <h2 className="font-weight-bold">
              {existedEmailChecking
                ? "Looks like you’ve been here,"
                : "Looks like you’re new here,"}
            </h2>
            <p className={styles.content}>
              {existedEmailChecking
                ? "Please enter a password to login your account continue to delivery and payment"
                : "Please enter a password to create your account continue to delivery and payment"}
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
            <ErrorMessageWrapper
              errors={errors}
              touched={touched}
              fieldName="password"
            />
          </Form.Group>

          <Form.Group controlId="giftCardNumber" as={Col} xs="12">
            <Button
              variant="secondary"
              className={clsx(styles.btn, "w-100")}
              type="submit"
            >
              CONTINUE
            </Button>
          </Form.Group>
        </Form.Row>

        <Row>
          <Col sm="12" className="text-right">
            <Button
              variant="link"
              className={clsx(styles.btnLink, "px-0")}
              type="button"
              onClick={() => handleCheckoutAsGuest(values.email)}
            >
              Checkout as guest
            </Button>
          </Col>
        </Row>
      </Container>
    </Row>
  )
}
