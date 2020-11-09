import { Container, Row, Col, Form, Button } from "react-bootstrap"
import Image from "next/image"
import clsx from "clsx"
import styles from "./CheckoutItem.module.scss"

export default function ItemComponent({
  name,
  quantity,
  thumbnail,
  totalPrice,
  onRemove,
}) {
  return (
    <Container className={styles.item}>
      <Row>
        <Col md="12">
          <Row>
            <Col xs="3" className="px-0">
              <Image
                src={thumbnail.url}
                alt={thumbnail.alt}
                width={96}
                height={96}
              />
            </Col>
            <Col xs="9">
              <p className={styles.itemName}>{name}</p>
              <p className={styles.itemPrice}>{totalPrice}</p>
              <Form.Row>
                <Form.Group controlId="itemSize" as={Col} xs="4">
                  <Form.Label className={styles.formLabel}>Size</Form.Label>
                  <Form.Control as="select" custom>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="itemQty" as={Col} xs="4">
                  <Form.Label className={styles.formLabel}>Quantity</Form.Label>
                  <Form.Control as="select" custom>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group
                  controlId="itemQty"
                  as={Col}
                  xs="4"
                  className="align-self-end"
                >
                  <Button
                    variant="link"
                    className={clsx("secondary", styles.formLabel)}
                    onClick={() => onRemove()}
                  >
                    Delete
                  </Button>
                </Form.Group>
              </Form.Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
