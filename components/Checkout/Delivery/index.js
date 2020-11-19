import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Container, Form, Row, Col, Button } from "react-bootstrap"
import { Formik } from "formik"
// import { useCheckout } from "@saleor/sdk"
import { useCheckout } from "@sdk/react"
import clsx from "clsx"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"

import OrderSumaryComponent from "../OrderSumary"
import ShippingMethods from "./ShippingMethods"
import ShippingAddress from "./ShippingAddress"
import BillingAddress from "./BillingAddress"
import PaymentComponent from "./Payment"
import { AddressSchema } from "./validate"
import { paymentCheckoutTokenCreate } from "lib/mutations"
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

export default function DeliveryComponent() {
  const {
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
    setShippingMethod,
    availablePaymentGateways,
    createPayment,
    completeCheckout,
  } = useCheckout()
  const [createPaymentCheckoutToken] = useMutation(paymentCheckoutTokenCreate)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const currentUser = useSelector((state) => state.currentUser)
  const router = useRouter()
  const { status, orderToken } = router.query

  useEffect(() => {
    const sendCreatePayment = async () => {
      if (status === "SUCCESS" && orderToken) {
        const paymentGateway = localStorage.getItem("paymentGateway")
        const { dataError } = await createPayment(paymentGateway, orderToken)
        if (dataError) {
          alert(dataError.error?.message)
          return
        }

        const {
          data,
          dataError: completeCheckoutError,
        } = await completeCheckout()

        if (completeCheckoutError) {
          alert(completeCheckoutError.error?.message)
          return
        }

        router.push(`/checkout/complete?orderNumber=${data?.number}`)
      }
    }
    sendCreatePayment()
  }, [status])

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
    if (!paymentMethod) {
      alert("Please choose payment method!")
      return
    }
    const { shippingAddress, billingAddress, billingDifferentAddress } = {
      ...values,
    }
    shippingAddress.countryArea = shippingAddress.state
    delete shippingAddress.address

    const { data: checkoutData, dataError } = await setShippingAddress(
      {
        ...shippingAddress,
      },
      "thupx@nustechnology.com"
    )

    if (dataError) {
      console.log("dataError", dataError)
      alert(dataError.error?.message)
      return
    }

    let billingAddressError
    if (!billingDifferentAddress) {
      const resBilling = await setBillingAsShippingAddress()
      billingAddressError = resBilling?.dataError
    } else {
      shippingAddress.countryArea = shippingAddress.state
      delete shippingAddress.address
      const resSetBilling = await setBillingAddress(
        {
          ...billingAddress,
        },
        "thupx@nustechnology.com"
      )
      billingAddressError = resSetBilling?.dataError
    }

    if (billingAddressError) {
      alert(billingAddressError.error?.message)
      return
    }

    const { data, dataError: setShippingMethodError } = await setShippingMethod(
      checkoutData.availableShippingMethods[0].id
    )

    if (setShippingMethodError) {
      alert(setShippingMethodError.error?.message)
      return
    }

    const { data: paymentCheckoutTokenRes } = await createPaymentCheckoutToken({
      variables: {
        checkoutId: checkoutData.id,
        gateway: paymentMethod.id,
        amount: data.totalPrice?.gross?.amount,
      },
    })

    const { paymentCheckoutTokenCreate } = paymentCheckoutTokenRes

    if (paymentCheckoutTokenCreate.checkoutErrors?.length) {
      alert(paymentCheckoutTokenCreate.checkoutErrors.error?.message)
      return
    }

    localStorage.setItem("paymentGateway", paymentMethod.id)

    if (paymentMethod.id === "plugin.gateway.afterpay") {
      const { gatewayCheckoutResponse } = paymentCheckoutTokenCreate
      AfterPay.initialize({
        countryCode: "AU",
      })
      AfterPay.redirect({ token: gatewayCheckoutResponse.token })
    }
  }

  return (
    <Container fluid className={styles.deliveryContainer}>
      <OrderSumaryComponent />

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
                value={currentUser?.email}
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

                <PaymentComponent
                  availablePaymentGateways={availablePaymentGateways || []}
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />

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
