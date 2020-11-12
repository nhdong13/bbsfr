import { Container, InputGroup, Row, Col, Form, Button } from "react-bootstrap"
import clsx from "clsx"
import styles from "../MyCart.module.scss"

export default function PromotionComponent() {
  return (
    <Row className={clsx(styles.promotionSection, "secondary-bg")}>
      <Container>
        <Row>
          <Col md="12">
            <Form.Row>
              <Form.Group controlId="promotionCode" as={Col} xs="12">
                <Form.Label className={styles.formLabel}>Promo Code</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter promo code number"
                  />
                  <InputGroup.Append>
                    <Button variant="primary" className={styles.btn}>
                      Apply
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group controlId="giftCardNumber" as={Col} xs="12">
                <Form.Label className={styles.formLabel}>
                  Gift card Number
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter gift card number"
                />
              </Form.Group>

              <Form.Group controlId="giftCardNumber" as={Col} xs="12">
                <Button variant="primary" className={clsx(styles.btn, "w-100")}>
                  Apply gift card
                </Button>
              </Form.Group>
            </Form.Row>
          </Col>
        </Row>
      </Container>
    </Row>
  )
}
