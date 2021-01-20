import { useState } from "react";
import { Container, Row, Button, Collapse } from "react-bootstrap";
import Image from "next/image";
import clsx from "clsx";
import styles from "./OrderSumary.module.scss";
import { useCart } from "@sdk/react";

import { generateCart } from "../helpers";

export default function OrderSumaryComponent() {
  const [open, setOpen] = useState(false);
  const { items, removeItem, updateItem } = useCart();
  const viewOnly = true;
  const carts = items && generateCart(items, removeItem, updateItem, viewOnly);

  return (
    <Row className={styles.orderSumary}>
      <Container className={styles.orderSumaryContainer}>
        <Button
          variant="gray"
          onClick={() => setOpen(!open)}
          aria-controls="order-list"
          aria-expanded={open}
          className={clsx(styles.toggleButton)}
        >
          Order Summary
          <div className={styles.icon}>
            <Image
              src={open ? "/icons/arrow-up2.svg" : "/icons/arrow-down2.svg"}
              alt="arrow"
              layout="fill"
            />
          </div>
        </Button>
        <Collapse in={open}>
          <div id="order-list" className={styles.orderList}>
            {carts}
          </div>
        </Collapse>
      </Container>
    </Row>
  );
}
