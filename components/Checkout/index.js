import React, { useEffect } from "react"
import { Container, Col, Row, Button } from "react-bootstrap"
import { useRouter } from "next/router"
import clsx from "clsx"
import _ from "lodash"
// import { useCart } from "@saleor/sdk"
import { useCart, useProductDetails } from "@sdk/react"

import { generateCart, buildCartItem } from "./helpers"
import Money from "../Money"
import styles from "./Checkout.module.scss"

export default function CheckoutComponent() {
  const { items, removeItem, updateItem, subtotalPrice } = useCart()
  // For dump data, remove on future
  localStorage.removeItem("token")
  const { data: product1, loading: product1Loading } = useProductDetails({
    id: "UHJvZHVjdDoxMTg=",
  })
  const { data: product2, loading } = useProductDetails({
    id: "UHJvZHVjdDo4OA==",
  })
  const router = useRouter()

  useEffect(() => {
    if (product1Loading || loading) {
      return
    }

    const data = {
      lines: [product1, product2].map((data) => buildCartItem(data)),
    }

    window.localStorage.setItem("data_checkout", JSON.stringify(data))

    if (!items?.length) {
      router.reload()
    }
  }, [product1Loading, loading])

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
                <span className="secondary mr-1">
                  {items?.length > 0 && _.sumBy(items, (item) => item.quantity)}{" "}
                  Items
                </span>{" "}
                <Money money={subtotalPrice?.gross} />
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
          <Row>
            <Col xs="12" className={styles.continueButton}>
              <Button
                variant="secondary"
                className={clsx(styles.btn, "w-100")}
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
