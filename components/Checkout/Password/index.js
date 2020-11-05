import React, { useState } from "react"
import { Container, Col, Row, Button, Collapse, Form } from "react-bootstrap"
import clsx from "clsx"

import CheckoutItem from "../Item"
import styles from "./CheckoutPassword.module.scss"

export default function CheckoutPasswordComponent({ items }) {
  const [open, setOpen] = useState(false)

  return (
    <Container fluid className={styles.checkoutPasswordContainer}>
      <Row className={styles.orderSumary}>
        <Container>
          <Button
            variant="gray"
            onClick={() => setOpen(!open)}
            aria-controls="order-list"
            aria-expanded={open}
            className={clsx(styles.toggleButton, "dropdown-toggle")}
          >
            Order Summary
          </Button>
          <Collapse in={open}>
            <div id="order-list" className={styles.orderList}>
              <CheckoutItem />
              <CheckoutItem />
            </div>
          </Collapse>
        </Container>
      </Row>

      <Row className={styles.passwordBody}>
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
            <Form.Group controlId="giftCardNumber" as={Col} xs="12">
              <Form.Label className={styles.formLabel}>Password</Form.Label>
              <Form.Control type="text" placeholder="Your Password" />
            </Form.Group>

            <Form.Group controlId="giftCardNumber" as={Col} xs="12">
              <Button variant="secondary" className={clsx(styles.btn, "w-100")}>
                Continue
              </Button>
            </Form.Group>
          </Form.Row>
        </Container>
      </Row>
    </Container>
  )
}
