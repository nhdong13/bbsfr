import { useState } from "react"
import { Row, Col, Button, Form, Container } from "react-bootstrap"
import clsx from "clsx"

import styles from "../Delivery.module.scss"

export default function ShippingAddress({ values, handleChange }) {
  const [useFullform, setUseFullform] = useState(false)
  return (
    <Row className={styles.shippingAddress}>
      <Container>
        <Form.Row>
          <Form.Group controlId="firstName" as={Col} xs="12">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="lastName" as={Col} xs="12">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="country" as={Col} xs="12">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Country"
              name="country"
              value={values.country}
              onChange={handleChange}
            />
          </Form.Group>
          {!useFullform && (
            <>
              <Form.Group controlId="address" as={Col} xs="12">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g 30 Hazelwood st, Alexandria, 2020"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                controlId="fullform"
                as={Col}
                xs="12"
                className={styles.fullformBtn}
              >
                No match?
                <Button
                  variant="link"
                  className={clsx("primary", styles.btnLink)}
                  onClick={() => setUseFullform(true)}
                >
                  Use the full form
                </Button>
              </Form.Group>
            </>
          )}

          {useFullform && (
            <>
              <Form.Group controlId="streetAddress1" as={Col} xs="12">
                <Form.Label>Line 1</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g 30 Beaconsfield St"
                  name="streetAddress1"
                  value={values.streetAddress1}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="streetAddress2" as={Col} xs="12">
                <Form.Label>Line 2 (optional)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Line 2"
                  name="streetAddress2"
                  value={values.streetAddress2}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="city" as={Col} xs="12">
                <Form.Label>City/Town</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g Alexandria"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="state" as={Col} xs="12">
                <Form.Label>State/Province/Region (optional)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g NSW"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="postalCode" as={Col} xs="12">
                <Form.Label>ZIP/Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g 2015"
                  name="postalCode"
                  value={values.postalCode}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group
                controlId="shortform"
                as={Col}
                xs="12"
                className={styles.fullformBtn}
              >
                Back to
                <Button
                  variant="link"
                  className={clsx("primary", styles.btnLink)}
                  onClick={() => setUseFullform(false)}
                >
                  Address lookup
                </Button>
              </Form.Group>
            </>
          )}

          <Form.Group controlId="bussinessName" as={Col} xs="12">
            <Form.Label>Bussiness Name (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Bussiness Name"
              name="bussinessName"
              value={values.bussinessName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="phoneNumber" as={Col} xs="12">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
            />
          </Form.Group>
        </Form.Row>
      </Container>
    </Row>
  )
}
