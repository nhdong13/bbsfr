import { useEffect, useState } from "react"
import { Formik } from "formik"
import { Row, Col, Button, Form, Container } from "react-bootstrap"
import { useCheckout } from "@sdk/react"
import Input from "react-phone-number-input/input"
import clsx from "clsx"

import LoadingSpinner from "components/LoadingSpinner"
import ErrorMessageWrapper from "../../ErrorMessageWrapper"
import SelectAddressModal from "../SelectAddressModal"
import { COUNTRIES_RESTRICTION, INITIAL_ADDRESS } from "../../constants"
import { ShippingSchema } from "../validate"
import {
  mappingDataAddress,
  selectAccountAddress,
  createCheckout,
} from "../helpers"

import styles from "../Delivery.module.scss"

export default function ShippingAddress({
  shippingFormRef,
  deliveryFormRef,
  handleSubmitError,
  currentUser,
}) {
  const {
    checkout,
    setShippingMethod,
    setShippingAddress,
    addPromoCode,
    loaded,
  } = useCheckout()
  const [oldValues, setOldValues] = useState(INITIAL_ADDRESS)
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    async function initShippingData() {
      if (
        !currentUser?.id ||
        oldValues?.address ||
        !currentUser.defaultShippingAddress
      ) {
        return
      }

      const data = mappingDataAddress(currentUser.defaultShippingAddress)
      const shippingForm = shippingFormRef.current
      await shippingForm.setValues(data)
      setOldValues(data)
      shippingForm.handleSubmit()
    }

    initShippingData()
  }, [currentUser?.id])

  useEffect(() => {
    if (!loaded || !checkout.shippingAddress) {
      return
    }
    const data = mappingDataAddress(checkout.shippingAddress)
    shippingFormRef.current.setValues(data)
    setOldValues(data)
  }, [loaded])

  useEffect(() => {
    const shippingForm = shippingFormRef.current

    function initAutocomplete() {
      const input = document.getElementById("address")
      if (!input) return

      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["geocode"],
        componentRestrictions: {
          country: ["au"],
        },
      })

      autocomplete.setFields(["address_component", "formatted_address"])
      google.maps.event.addDomListener(input, "focus", (e) =>
        e.target.setAttribute("autocomplete", "new-password")
      )

      disableAutofill()
      autocomplete.addListener("place_changed", () =>
        fillInAddress(autocomplete, shippingForm)
      )
    }

    function fillInAddress(autocomplete, shippingForm) {
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
            shippingForm.setFieldValue("city", address.short_name)
            break
          case "administrative_area_level_1":
            shippingForm.setFieldValue("countryArea", address.short_name)
            break
          case "postal_code":
            shippingForm.setFieldValue("postalCode", address.short_name)
            break
          default:
            break
        }
      })

      shippingForm.setFieldValue("streetAddress1", streetAddress1)
      shippingForm.setFieldValue("address", place.formatted_address)
      shippingForm.handleSubmit()
    }

    function disableAutofill() {
      // Autofill workaround adapted from https://stackoverflow.com/questions/29931712/chrome-autofill-covers-autocomplete-for-google-maps-api-v3/49161445#49161445
      if (window.MutationObserver) {
        const observerHack = new MutationObserver(() => {
          observerHack.disconnect()
          document.getElementById("address").autocomplete = "new-password"
        })
        observerHack.observe(document.getElementById("address"), {
          attributes: true,
          attributeFilter: ["autocomplete"],
        })
      }
    }

    initAutocomplete()
  }, [])

  const handleChangeCountry = (ev) => {
    const selectedCountry = COUNTRIES_RESTRICTION.find(
      (country) => country.code === ev.target.value
    )
    shippingFormRef.current.setFieldValue("country", selectedCountry)
  }

  const handleSubmitShipping = async (values, bag) => {
    const deliveryForm = deliveryFormRef.current
    // Set Shipping Address and create Checkout
    const { checkoutData } = await createCheckout(
      setShippingAddress,
      values,
      currentUser.email,
      bag,
      handleSubmitError,
      addPromoCode,
      checkout.voucherifies
    )
    if (!checkoutData) return
    await setShippingMethod("")
    deliveryForm.setFieldValue("shippingMethod", "")
  }

  const handleBlur = (e) => {
    if (
      e.currentTarget.name === "address" ||
      e.currentTarget.value === oldValues[e.currentTarget.name]
    ) {
      return
    }
    const shippingForm = shippingFormRef.current
    setOldValues(shippingForm.values)
    shippingForm.handleSubmit()
  }

  return (
    <>
      {currentUser?.addresses?.length > 0 && (
        <Row>
          <Form.Group controlId="btnPlaceOrder" as={Col} xs="12">
            <Button
              variant="link"
              className="px-0"
              type="button"
              onClick={() => setModalShow(true)}
            >
              Select account {">"}
            </Button>
          </Form.Group>
        </Row>
      )}
      <SelectAddressModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSelectAddress={(id) =>
          selectAccountAddress(currentUser, id, shippingFormRef)
        }
        addresses={currentUser?.addresses}
        defaultShippingAddress={currentUser?.defaultShippingAddress}
        shippingFormRef={shippingFormRef}
      />

      <Formik
        innerRef={shippingFormRef}
        validationSchema={ShippingSchema}
        onSubmit={handleSubmitShipping}
        initialValues={INITIAL_ADDRESS}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          isSubmitting,
          values,
          touched,
          errors,
        }) => (
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
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessageWrapper
                      errors={errors}
                      touched={touched}
                      fieldName="firstName"
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
                      onBlur={handleBlur}
                    />
                    <ErrorMessageWrapper
                      errors={errors}
                      touched={touched}
                      fieldName="lastName"
                    />
                  </Form.Group>

                  <Form.Group controlId="bussinessName" as={Col} xs="12">
                    <Form.Label>Bussiness Name (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Bussiness Name"
                      name="bussinessName"
                      value={values.bussinessName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>

                  <Form.Group controlId="phone" as={Col} xs="12">
                    <Form.Label>Phone Number</Form.Label>
                    <Input
                      className="form-control"
                      placeholder="+61 4 33 232 793"
                      name="phone"
                      value={values.phone}
                      onChange={(phoneNumber) => {
                        setFieldValue("phone", phoneNumber)
                      }}
                      onBlur={handleBlur}
                    />

                    <ErrorMessageWrapper
                      errors={errors}
                      touched={touched}
                      fieldName="phone"
                    />
                  </Form.Group>

                  <Form.Group controlId="country" as={Col} xs="12">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      as="select"
                      name="country"
                      onChange={handleChangeCountry}
                      onBlur={handleBlur}
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
                      fieldName="country.country"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="address"
                    as={Col}
                    xs="12"
                    className={values.useFullForm ? "d-none" : ""}
                  >
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g 30 Hazelwood st, Alexandria, 2020"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="new-password"
                    />
                    <ErrorMessageWrapper
                      errors={errors}
                      touched={touched}
                      fieldName="address"
                    />
                  </Form.Group>
                  {!values.useFullForm && (
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
                        onClick={() => setFieldValue("useFullForm", true)}
                      >
                        Use the full form
                      </Button>
                    </Form.Group>
                  )}

                  {values.useFullForm && (
                    <>
                      <Form.Group controlId="streetAddress1" as={Col} xs="12">
                        <Form.Label>Line 1</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g 30 Beaconsfield St"
                          name="streetAddress1"
                          value={values.streetAddress1}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessageWrapper
                          errors={errors}
                          touched={touched}
                          fieldName="streetAddress1"
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
                          onBlur={handleBlur}
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
                          onBlur={handleBlur}
                        />
                        <ErrorMessageWrapper
                          errors={errors}
                          touched={touched}
                          fieldName="city"
                        />
                      </Form.Group>

                      <Form.Group controlId="countryArea" as={Col} xs="12">
                        <Form.Label>State/Province/Region</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="e.g NSW"
                          name="countryArea"
                          value={values.countryArea}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessageWrapper
                          errors={errors}
                          touched={touched}
                          fieldName="countryArea"
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
                          onBlur={handleBlur}
                        />
                        <ErrorMessageWrapper
                          errors={errors}
                          touched={touched}
                          fieldName="postalCode"
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
                          onClick={() => setFieldValue("useFullForm", false)}
                        >
                          Address lookup
                        </Button>
                      </Form.Group>
                    </>
                  )}
                </Form.Row>
              </Container>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  )
}
