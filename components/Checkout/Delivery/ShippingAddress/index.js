import { useEffect } from "react"
import { Row, Col, Button, Form, Container } from "react-bootstrap"
import clsx from "clsx"

import LoadingSpinner from "components/LoadingSpinner"
import { COUNTRIES_RESTRICTION } from "../../constants"
import ErrorMessageWrapper from "../../ErrorMessageWrapper"
import styles from "../Delivery.module.scss"

export default function ShippingAddress({
  handleSubmit,
  isSubmitting,
  values,
  handleChange,
  errors,
  touched,
  setFieldValue,
}) {
  useEffect(() => {
    let autocomplete

    function initAutocomplete() {
      if (!document.getElementById("address")) return

      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("address"),
        {
          types: ["geocode"],
          componentRestrictions: {
            country: ["au"],
          },
        }
      )

      autocomplete.setFields(["address_component", "formatted_address"])
      autocomplete.addListener("place_changed", fillInAddress)
    }

    function fillInAddress() {
      const place = autocomplete.getPlace()
      let streetAddress1 = ""

      place.address_components.forEach((address) => {
        const type = address.types[0]
        switch (type) {
          case "street_number":
            streetAddress1 += address.short_name
            break
          case "route":
            streetAddress1 += ` ${address.short_name}`
            break
          case "locality":
            setFieldValue("shippingAddress.city", address.short_name)
            break
          case "administrative_area_level_1":
            setFieldValue("shippingAddress.countryArea", address.short_name)
            break
          case "postal_code":
            setFieldValue("shippingAddress.postalCode", address.short_name)
            break
          default:
            break
        }
      })

      setFieldValue("shippingAddress.streetAddress1", streetAddress1)
      setFieldValue("shippingAddress.address", place.formatted_address)
    }

    initAutocomplete()
  }, [values.useFullForm])

  const handleChangeCountry = (ev) => {
    const selectedCountry = COUNTRIES_RESTRICTION.find(
      (country) => country.code === ev.target.value
    )
    setFieldValue("shippingAddress.country", selectedCountry)
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row>
        <LoadingSpinner show={isSubmitting} />
      </Row>
      <Row className={styles.shippingAddress}>
        <Container>
          <Form.Row>
            <Form.Group controlId="firstName" as={Col} xs="12">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="shippingAddress.firstName"
                value={values.firstName}
                onChange={handleChange}
              />
              <ErrorMessageWrapper
                errors={errors}
                touched={touched}
                fieldName="shippingAddress.firstName"
              />
            </Form.Group>

            <Form.Group controlId="lastName" as={Col} xs="12">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="shippingAddress.lastName"
                value={values.lastName}
                onChange={handleChange}
              />
              <ErrorMessageWrapper
                errors={errors}
                touched={touched}
                fieldName="shippingAddress.lastName"
              />
            </Form.Group>

            <Form.Group controlId="bussinessName" as={Col} xs="12">
              <Form.Label>Bussiness Name (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Bussiness Name"
                name="shippingAddress.bussinessName"
                value={values.bussinessName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="phone" as={Col} xs="12">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="shippingAddress.phone"
                value={values.phone}
                onChange={handleChange}
              />

              <ErrorMessageWrapper
                errors={errors}
                touched={touched}
                fieldName="shippingAddress.phone"
              />
            </Form.Group>

            <Form.Group controlId="country" as={Col} xs="12">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="shippingAddress.country"
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
              <ErrorMessageWrapper
                errors={errors}
                touched={touched}
                fieldName="shippingAddress.country.country"
              />
            </Form.Group>
            {!values.useFullForm && (
              <>
                <Form.Group controlId="address" as={Col} xs="12">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g 30 Hazelwood st, Alexandria, 2020"
                    name="shippingAddress.address"
                    value={values.address}
                    onChange={handleChange}
                  />
                  <ErrorMessageWrapper
                    errors={errors}
                    touched={touched}
                    fieldName="shippingAddress.address"
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
                    onClick={() =>
                      setFieldValue("shippingAddress.useFullForm", true)
                    }
                  >
                    Use the full form
                  </Button>
                </Form.Group>
              </>
            )}

            {values.useFullForm && (
              <>
                <Form.Group controlId="streetAddress1" as={Col} xs="12">
                  <Form.Label>Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g 30 Beaconsfield St"
                    name="shippingAddress.streetAddress1"
                    value={values.streetAddress1}
                    onChange={handleChange}
                  />
                  <ErrorMessageWrapper
                    errors={errors}
                    touched={touched}
                    fieldName="shippingAddress.streetAddress1"
                  />
                </Form.Group>

                <Form.Group controlId="streetAddress2" as={Col} xs="12">
                  <Form.Label>Line 2 (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Line 2"
                    name="shippingAddress.streetAddress2"
                    value={values.streetAddress2}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="city" as={Col} xs="12">
                  <Form.Label>City/Town</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g Alexandria"
                    name="shippingAddress.city"
                    value={values.city}
                    onChange={handleChange}
                  />
                  <ErrorMessageWrapper
                    errors={errors}
                    touched={touched}
                    fieldName="shippingAddress.city"
                  />
                </Form.Group>

                <Form.Group controlId="countryArea" as={Col} xs="12">
                  <Form.Label>State/Province/Region</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g NSW"
                    name="shippingAddress.countryArea"
                    value={values.countryArea}
                    onChange={handleChange}
                  />
                  <ErrorMessageWrapper
                    errors={errors}
                    touched={touched}
                    fieldName="shippingAddress.countryArea"
                  />
                </Form.Group>

                <Form.Group controlId="postalCode" as={Col} xs="12">
                  <Form.Label>ZIP/Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g 2015"
                    name="shippingAddress.postalCode"
                    value={values.postalCode}
                    onChange={handleChange}
                  />
                  <ErrorMessageWrapper
                    errors={errors}
                    touched={touched}
                    fieldName="shippingAddress.postalCode"
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
                    onClick={() =>
                      setFieldValue("shippingAddress.useFullForm", false)
                    }
                  >
                    Address lookup
                  </Button>
                </Form.Group>
              </>
            )}
          </Form.Row>
        </Container>
      </Row>
      <Row>
        <Form.Group controlId="btnPlaceOrder" as={Col} xs="12">
          <Button
            variant="primary"
            className={clsx(styles.btnPlaceOrder, "w-100")}
            type="submit"
            disabled={isSubmitting}
          >
            Update Address
          </Button>
        </Form.Group>
      </Row>
    </Form>
  )
}
