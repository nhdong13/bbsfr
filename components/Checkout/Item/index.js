import { Container, Row, Col, Form, Button } from "react-bootstrap"
import Image from "next/image"
import clsx from "clsx"

import styles from "./CheckoutItem.module.scss"

export default function ItemComponent({
  id,
  name,
  quantity,
  thumbnail,
  totalPrice,
  onRemove,
  attributes,
  viewOnly,
  onQuantityChange,
  quantityAvailable,
}) {
  const size = attributes ? attributes[0]?.values[0] : {}

  return (
    <Container className={styles.item}>
      <Row>
        <Col md="12">
          <Row>
            <Col xs="3" className="px-0">
              {thumbnail && (
                <Image
                  src={thumbnail.url}
                  alt={thumbnail.alt || ""}
                  width={96}
                  height={96}
                />
              )}
            </Col>
            <Col xs="9">
              <p className={styles.itemName}>{name}</p>
              <p className={styles.itemPrice}>{totalPrice}</p>
              <Form.Row>
                <Form.Group controlId="itemSize" as={Col} xs="4">
                  <Form.Label className={styles.formLabel}>Size</Form.Label>
                  {viewOnly ? ` ${size.value}` : <div>{size.value}</div>}
                </Form.Group>

                <Form.Group controlId="itemQty" as={Col} xs="4">
                  <Form.Label className={styles.formLabel}>Quantity</Form.Label>
                  {viewOnly ? (
                    ` ${quantity}`
                  ) : (
                    <Form.Control
                      as="select"
                      custom
                      onChange={(ev) =>
                        onQuantityChange(ev.currentTarget.value)
                      }
                    >
                      {Array(quantityAvailable)
                        .fill()
                        .map((_, i) => (
                          <option key={i}>{i + 1}</option>
                        ))}
                    </Form.Control>
                  )}
                </Form.Group>

                <Form.Group
                  controlId="itemQty"
                  as={Col}
                  xs="4"
                  className="align-self-end"
                >
                  {!viewOnly && (
                    <Button
                      variant="link"
                      className={clsx("secondary", styles.formLabel)}
                      onClick={() => onRemove()}
                    >
                      Delete
                    </Button>
                  )}
                </Form.Group>
              </Form.Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
