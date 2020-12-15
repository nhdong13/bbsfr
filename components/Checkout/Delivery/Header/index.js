import { Row, Col, Form } from "react-bootstrap"

import styles from "../Delivery.module.scss"

export default function DeliveryHeader({ currentUser }) {
  return (
    <>
      <Row className={styles.emailBody}>
        <Col md="12">
          <h2 className="font-weight-bold">Delivery</h2>
        </Col>

        <Form.Group controlId="email" as={Col} xs="12">
          <Form.Label className={styles.formLabel}>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            value={currentUser?.email}
            readOnly={true}
          />
        </Form.Group>
      </Row>
    </>
  )
}
