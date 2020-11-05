import React, { useState } from "react"
import { Container, Col, Row, Button, Collapse, Form } from "react-bootstrap"
import clsx from "clsx"

import CheckoutItem from "../Item"
import styles from "./CheckoutEmail.module.scss"

export default function CheckoutEmailComponent({ items, nextStep }) {
  const [open, setOpen] = useState(false)

  return (
    <Container fluid className={styles.checkoutEmailContainer}>
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

      <Row className={styles.emailBody}>
        <Container>
          <Row>
            <Col md="12">
              <h2 className="font-weight-bold">Hi there,</h2>
              <p>Please enter your email to proceed to payment and delivery.</p>
            </Col>
          </Row>

          <Form.Row>
            <Form.Group controlId="giftCardNumber" as={Col} xs="12">
              <Form.Label className={styles.formLabel}>
                Email Address
              </Form.Label>
              <Form.Control type="text" placeholder="Your email address" />
            </Form.Group>

            <Form.Group controlId="giftCardNumber" as={Col} xs="12">
              <Button
                variant="secondary"
                className={clsx(styles.btn, "w-100")}
                onClick={() => nextStep()}
              >
                Continue
              </Button>
            </Form.Group>
          </Form.Row>
        </Container>
      </Row>
    </Container>
  )
}
