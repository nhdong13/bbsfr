import { Row, Col, Form, Container } from "react-bootstrap"

import ErrorMessageWrapper from "../../ErrorMessageWrapper"
import styles from "../Delivery.module.scss"

export default function BillingAddress({
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
}) {
  const handleChangeCountry = (ev) => {
    const selectedCountry = COUNTRIES_RESTRICTION.find(
      (country) => country.code === ev.target.value
    )
    setFieldValue("billingAddress.country", selectedCountry)
  }

  return (
    <Row className={styles.shippingAddress}>
      <Container>
        <Form.Row>
          <Form.Group controlId="firstName" as={Col} xs="12">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="billingAddress.firstName"
              value={values.firstName}
              onChange={handleChange}
            />
            <ErrorMessageWrapper
              errors={errors}
              touched={touched}
              fieldName="billingAddress.firstName"
            />
          </Form.Group>

          <Form.Group controlId="lastName" as={Col} xs="12">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              name="billingAddress.lastName"
              value={values.lastName}
              onChange={handleChange}
            />
            <ErrorMessageWrapper
              errors={errors}
              touched={touched}
              fieldName="billingAddress.lastName"
            />
          </Form.Group>

          <Form.Group controlId="country" as={Col} xs="12">
            <Form.Label>Country</Form.Label>
            <Form.Control
              as="select"
              name="billingAddress.country"
              onChange={handleChangeCountry}
              value={values.country.code}
              readOnly={true}
            >
              {COUNTRIES_RESTRICTION.map(({ country, code }) => (
                <option key={code} value={code}>
                  {country}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="streetAddress1" as={Col} xs="12">
            <Form.Label>Line 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g 30 Beaconsfield St"
              name="billingAddress.streetAddress1"
              value={values.streetAddress1}
              onChange={handleChange}
            />
            <ErrorMessageWrapper
              errors={errors}
              touched={touched}
              fieldName="billingAddress.streetAddress1"
            />
          </Form.Group>

          <Form.Group controlId="streetAddress2" as={Col} xs="12">
            <Form.Label>Line 2 (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Line 2"
              name="billingAddress.streetAddress2"
              value={values.streetAddress2}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="city" as={Col} xs="12">
            <Form.Label>City/Town</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g Alexandria"
              name="billingAddress.city"
              value={values.city}
              onChange={handleChange}
            />
            <ErrorMessageWrapper
              errors={errors}
              touched={touched}
              fieldName="billingAddress.city"
            />
          </Form.Group>

          <Form.Group controlId="state" as={Col} xs="12">
            <Form.Label>State/Province/Region (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g NSW"
              name="billingAddress.state"
              value={values.state}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="postalCode" as={Col} xs="12">
            <Form.Label>ZIP/Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g 2015"
              name="billingAddress.postalCode"
              value={values.postalCode}
              onChange={handleChange}
            />
            <ErrorMessageWrapper
              errors={errors}
              touched={touched}
              fieldName="billingAddress.postalCode"
            />
          </Form.Group>

          <Form.Group controlId="bussinessName" as={Col} xs="12">
            <Form.Label>Bussiness Name (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Bussiness Name"
              name="billingAddress.bussinessName"
              value={values.bussinessName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="phoneNumber" as={Col} xs="12">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              name="billingAddress.phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
            />
            <ErrorMessageWrapper
              errors={errors}
              touched={touched}
              fieldName="billingAddress.phoneNumber"
            />
          </Form.Group>
        </Form.Row>
      </Container>
    </Row>
  )
}
