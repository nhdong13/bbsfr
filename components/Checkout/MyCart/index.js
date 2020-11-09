import { Container, Col, Row, Button } from "react-bootstrap"
import clsx from "clsx"

import ListItemsComponent from "./ListItems"
import PromotionComponent from "./Promotion"
import Money from "../../Money"

import styles from "./MyCart.module.scss"

export default function MyCartComponent({
  carts,
  nextStep,
  subtotalPrice,
  totalPrice,
  itemsCount,
}) {
  return (
    <Container fluid className={styles.myCartContainer}>
      <Row className={clsx(styles.headerSection, "secondary-bg")}>
        <Container>
          <Row>
            <Col md="12" className="text-center">
              <h2 className="font-weight-bold">YOUR CART</h2>
              <span className="font-weight-bold">
                <span className="secondary mr-1">{itemsCount} Items</span>{" "}
                <Money money={totalPrice.gross} />
              </span>
            </Col>
          </Row>
        </Container>
      </Row>

      <ListItemsComponent carts={carts} />

      <PromotionComponent />

      <Row className={styles.footerSection}>
        <Container>
          <Row>
            <Col xs="6">
              <p>Sub Total</p>
              <p>Delivery</p>
              <p className="font-weight-bold">TOTAL</p>
            </Col>

            <Col xs="6" className="text-right">
              <p>
                <Money money={subtotalPrice.gross} />
              </p>
              <p>FREE</p>
              <p className="font-weight-bold">
                <Money money={totalPrice.gross} />
              </p>
            </Col>

            <Col xs="12" className={styles.fixedButton}>
              <Button
                variant="secondary"
                className={clsx(styles.btn, "w-100")}
                fixed="bottom"
                onClick={() => nextStep()}
              >
                Continue to Checkout
              </Button>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  )
}
