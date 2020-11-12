import React from "react"
import { Row, Col, Button } from "react-bootstrap"
import Image from "next/image"
import clsx from "clsx"

import Money from "../../../Money"
import { SHIPPING_METHODS_ICON } from "../constants"
import styles from "../Delivery.module.scss"

export default function ShippingMethods({
  shippingMethods,
  setShippingMethods,
}) {
  const selectMethod = (id) => {
    const newShippingMethods = shippingMethods.map((method) => {
      method.active = method.id === id
      return method
    })
    setShippingMethods(newShippingMethods)
  }

  return (
    <Row className={styles.shippingMethods}>
      <Col md="12">
        {shippingMethods.map((method) => (
          <Button
            key={method.id}
            variant={method.active ? "secondary" : "white"}
            className={clsx(styles.btn, "w-100")}
            onClick={() => selectMethod(method.id)}
          >
            <span className={styles.btnIcon}>
              <Image
                src={SHIPPING_METHODS_ICON[method.name]}
                alt={method.name}
                width={16}
                height={16}
              />
            </span>

            {method.name}

            <Money
              money={method.price?.amount ? method.price : null}
              defaultValue="FREE"
              className={styles.methodPrice}
            />
          </Button>
        ))}
      </Col>
    </Row>
  )
}
