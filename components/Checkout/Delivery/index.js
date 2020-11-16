import { useState } from "react"
import { Container, Form, Row, Col, Button } from "react-bootstrap"
import { Formik } from "formik"
// import { useCheckout } from "@saleor/sdk"
import { useCheckout } from "@sdk/react"
import clsx from "clsx"

import OrderSumaryComponent from "../OrderSumary"
import ShippingMethods from "./ShippingMethods"
import ShippingAddress from "./ShippingAddress"
import BillingAddress from "./BillingAddress"
import PaymentComponent from "./Payment"
import { AddressSchema } from "./validate"

import styles from "./Delivery.module.scss"

const ADDRESS = {
  bussinessName: "thupx",
  city: "Westmead",
  country: { code: "AU", country: "Australia" },
  firstName: "Thu",
  lastName: "Pham",
  phoneNumber: "0123456789",
  postalCode: "2145",
  state: "NSW",
  streetAddress1: "83/85 Amos St",
  streetAddress2: "",
  address: "",
}

export default function DeliveryComponent({ carts, userForm }) {
  const {
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
    availableShippingMethods,
    setShippingMethod,
  } = useCheckout()
  const initDeliveryData = {
    shippingAddress: ADDRESS,
    billingAddress: ADDRESS,
    billingDifferentAddress: false,
  }

  const [shippingMethods, setShippingMethods] = useState([
    {
      id: "U2hpcHBpbmdNZXRob2Q6MQ==",
      name: "Post",
      price: { currency: "USD", amount: 0, __typename: "Money" },
      __typename: "ShippingMethod",
    },
    {
      id: "U2hpcHBpbmdNZXRob2Q6NA==",
      name: "Click & Collect",
      price: { currency: "USD", amount: 0, __typename: "Money" },
      __typename: "ShippingMethod",
    },
    {
      id: "U2hpcHBpbmdNZXRob2Q6Mg==",
      name: "Courier",
      price: { currency: "USD", amount: 15, __typename: "Money" },
      __typename: "ShippingMethod",
    },
  ])

  const handleSubmitShipping = async (values) => {
    const { shippingAddress, billingAddress } = { ...values }
    shippingAddress.countryArea = shippingAddress.state
    delete shippingAddress.address

    const { dataError } = await setShippingAddress(
      {
        ...shippingAddress,
      },
      "userForm.email@gmail.com"
    )

    if (dataError) {
      console.log("dataError", dataError)
      return
    }

    let billingAddressError
    if (!values.billingDifferentAddress) {
      const resBilling = await setBillingAsShippingAddress()
      billingAddressError = resBilling?.dataError
    } else {
      shippingAddress.countryArea = shippingAddress.state
      delete shippingAddress.address
      const resSetBilling = await setBillingAddress(
        {
          ...billingAddress,
        },
        "userForm.email@gmail.com"
      )
      billingAddressError = resSetBilling?.dataError
    }

    if (billingAddressError) {
      console.log("billingAddressError", billingAddressError)
      return
    }

    if (!availableShippingMethods?.length) {
      console.log("No availableShippingMethods")
      return
    }

    const { data, dataError: setShippingMethodError } = await setShippingMethod(
      availableShippingMethods[0].id
    )

    if (setShippingMethodError) {
      console.log("setShippingMethodError", setShippingMethodError)
      return
    }

    const totalPrice =
      data.checkoutShippingMethodUpdate?.checkout?.totalPrice?.gross

    console.log(totalPrice)
  }

  return (
    <Container fluid className={styles.deliveryContainer}>
      <OrderSumaryComponent carts={carts} />

      <Row>
        <Container>
          <Row className={styles.emailBody}>
            <Col md="12">
              <h2 className="font-weight-bold">Delivery</h2>
            </Col>

            <Form.Group controlId="email" as={Col} xs="12">
              <Form.Label className={styles.formLabel}>
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Your email address"
                name="email"
                value={userForm.email}
                readOnly={true}
              />
            </Form.Group>
          </Row>
          <ShippingMethods
            shippingMethods={shippingMethods}
            setShippingMethods={setShippingMethods}
          />

          <Formik
            validationSchema={AddressSchema}
            onSubmit={handleSubmitShipping}
            initialValues={initDeliveryData}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <ShippingAddress
                  handleChange={handleChange}
                  values={values.shippingAddress}
                />

                <Form.Check
                  type="checkbox"
                  id="billingDifferentAddress"
                  label="Bill to a different Address"
                  name="billingDifferentAddress"
                  className="pb-4"
                  onChange={handleChange}
                />

                {values.billingDifferentAddress && (
                  <BillingAddress
                    handleChange={handleChange}
                    values={values.billingAddress}
                  />
                )}

                <PaymentComponent />

                <Row>
                  <Form.Group controlId="btnPlaceOrder" as={Col} xs="12">
                    <Button
                      variant="secondary"
                      className={clsx(styles.btnPlaceOrder, "w-100")}
                      type="submit"
                    >
                      Place Order
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
            )}
          </Formik>
        </Container>
      </Row>
    </Container>
  )
}
