import { useState } from "react"
import { Container, Row, Button, Collapse } from "react-bootstrap"
import clsx from "clsx"
import styles from "./OrderSumary.module.scss"

export default function OrderSumaryComponent({ carts }) {
  const [open, setOpen] = useState(false)

  return (
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
            {carts}
          </div>
        </Collapse>
      </Container>
    </Row>
  )
}
