import React, { useEffect } from "react"
import { Container, Col, Row, Button } from "react-bootstrap"
import { useRouter } from "next/router"
import clsx from "clsx"

// import { useCart } from "@saleor/sdk"
import { useCart, useProductDetails } from "@sdk/react"

import { generateCart, buildCartItem } from "./helpers"
import Money from "../Money"
import OrderTotalCost from "./OrderTotalCost"
import styles from "./Checkout.module.scss"

export default function CheckoutComponent() {
  const {
    items,
    removeItem,
    updateItem,
    totalPrice,
    subtotalPrice,
    shippingPrice,
  } = useCart()

  // For dump data, remove on future
  const { data: product1, loading: product1Loading } = useProductDetails({
    id: "UHJvZHVjdDoxMTg=",
  })
  const { data: product2, loading } = useProductDetails({
    id: "UHJvZHVjdDo4OA==",
  })

  useEffect(() => {
    if (product1Loading || loading) {
      return
    }
    const data = {
      lines: [product1, product2].map((data) => buildCartItem(data)),
    }

    window.localStorage.setItem("data_checkout", JSON.stringify(data))
  }, [product1Loading, loading])

  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push("/checkout/signup")
  }

  return (
    <Container fluid className={styles.myCartContainer}>
      <Row className={clsx(styles.headerSection, "secondary-bg")}>
        <Container>
          <Row>
            <Col md="12" className="text-center">
              <h2 className={styles.headerTitle}>YOUR CART</h2>
              <span className="font-weight-bold">
                <span className="secondary mr-1">{items?.length} Items</span>{" "}
                <Money money={totalPrice?.gross} />
              </span>
            </Col>
          </Row>
        </Container>
      </Row>

      <Row className={styles.listItemSection}>
        {generateCart(items, removeItem, updateItem, false)}
      </Row>

      <Row className={styles.footerSection}>
        <Container>
          <OrderTotalCost
            totalPrice={totalPrice}
            subtotalPrice={subtotalPrice}
            shippingPrice={shippingPrice}
          />
          <Row>
            <Col xs="12" className={styles.fixedButton}>
              <Button
                variant="secondary"
                className={clsx(styles.btn, "w-100")}
                fixed="bottom"
                onClick={handleClick}
              >
                CONTINUE TO CHECKOUT
              </Button>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  )
}
