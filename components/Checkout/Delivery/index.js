import { useState } from "react"
import { Container, Form, Row, Col } from "react-bootstrap"
import { Formik } from "formik"
import { useCheckout } from "@saleor/sdk"

import OrderSumaryComponent from "../OrderSumary"
import ShippingMethods from "./ShippingMethods"
import ShippingAddress from "./ShippingAddress"
import BillingAddress from "./BillingAddress"
import { ShippingAddressSchema } from "./validate"

import styles from "./Delivery.module.scss"

export default function DeliveryComponent({ carts, userForm }) {
  const { setShippingAddress, setBillingAddress } = useCheckout()
  const [billingDifferentAddress, setBillingDifferentAddress] = useState(false)
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

  const shippingAddress = {
    // firstName: "",
    // lastName: "",
    // phoneNumber: "",
    // country: "",
    // city: "",
    // state: "",
    // streetAddress1: "",
    // streetAddress2: "",
    // postalCode: "",
    // address: "",
    // bussinessName: "",
    bussinessName: "thupx",
    city: "Westmead",
    country: "Australia",
    firstName: "Thu",
    lastName: "Pham",
    phoneNumber: "0123456789",
    postalCode: "2145",
    state: "NSW",
    streetAddress1: "83/85 Amos St",
    streetAddress2: "",
    address: "",
  }

  const handleSubmitShipping = async (values) => {
    const shippingData = { ...values }
    delete shippingData.address
    const { data, dataError, functionError } = await setShippingAddress(
      {
        ...shippingData,
      },
      { shippingEmail: userForm.email }
    )
    console.log("data", data)
    console.log("dataError", dataError)
    console.log("functionError", functionError)
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
            validationSchema={ShippingAddressSchema}
            onSubmit={handleSubmitShipping}
            initialValues={shippingAddress}
          >
            {({ handleSubmit, handleChange, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <ShippingAddress handleChange={handleChange} values={values} />
              </Form>
            )}
          </Formik>

          <Form.Check
            type="checkbox"
            id="billingDifferentAddress"
            label="Bill to a different Address"
            className="pb-4"
            onChange={(event) =>
              setBillingDifferentAddress(event.target.checked)
            }
          />

          {billingDifferentAddress && (
            <Formik
              validationSchema={ShippingAddressSchema}
              onSubmit={handleSubmitShipping}
              initialValues={shippingAddress}
            >
              {({ handleSubmit, handleChange, values }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <BillingAddress handleChange={handleChange} values={values} />
                </Form>
              )}
            </Formik>
          )}
        </Container>
      </Row>
    </Container>
  )
}
