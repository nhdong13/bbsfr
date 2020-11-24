import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap"
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
import { initKlarna, authorizeKlarna } from "./klarna"
import { authorizeAfterpay } from "./afterpay"
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
  const [showContinue, setShowContinue] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const currentUser = useSelector((state) => state.currentUser)
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
  const initDeliveryData = {
    shippingAddress: ADDRESS,
    billingAddress: ADDRESS,
    billingDifferentAddress: false,
  }
  const router = useRouter()
  const { status, orderToken, result, checkoutId } = router.query

  useEffect(() => {
    let token
    if (status === "SUCCESS") {
      token = orderToken
    }

    if (result === "approved") {
      token = checkoutId
    }
    sendCreatePayment(token)
  }, [status, result])

  const sendCreatePayment = async (orderToken) => {
    if (orderToken) {
      setShowLoading(true)
      const paymentGateway = localStorage.getItem("paymentGateway")
      const { dataError } = await createPayment(paymentGateway, orderToken)
      if (dataError) {
        setShowLoading(false)
        alert(dataError.error?.message)
        return
      }

      const {
        data,
        dataError: completeCheckoutError,
      } = await completeCheckout()

      if (completeCheckoutError) {
        setShowLoading(false)
        alert(completeCheckoutError.error?.message)
        return
      }

      router.push(`/checkout/complete?orderNumber=${data?.number}`)
    }
  }

  const handleSubmitCheckout = async (values) => {
    if (!paymentMethod) {
      alert("Please choose payment method!")
      return
    }

    // Set Shipping Address and create Checkout
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

    // Set Billing Address
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

    // Set Shipping method
    const { data, dataError: setShippingMethodError } = await setShippingMethod(
      checkoutData.availableShippingMethods[0].id
    )

    if (setShippingMethodError) {
      alert(setShippingMethodError.error?.message)
      return
    }

    // Create payment checkout token
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

    // Authorize payment checkout token
    const {
      token,
      checkoutUri,
    } = paymentCheckoutTokenCreate.gatewayCheckoutResponse
    switch (paymentMethod.id) {
      case "plugin.gateway.afterpay":
        authorizeAfterpay(token)
        break
      case "bikebiz.payments.klarna":
        initKlarna(token, () => setShowContinue(true))
        break
      case "bikebiz.payments.zipmoney":
        console.log("checkoutUri", checkoutUri)
        router.push(checkoutUri)
        break
      default:
        break
    }
  }

  return (
    <Container fluid className={styles.deliveryContainer}>
      <Row>
        <Modal
          show={showLoading}
          contentClassName={styles.modalContent}
          dialogClassName={styles.modal}
        >
          <Modal.Body className={styles.modalBody}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </Modal.Body>
        </Modal>
      </Row>

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
            onSubmit={handleSubmitCheckout}
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
                <div id="klarna-payments-container"></div>
                {showContinue && (
                  <Row>
                    <Form.Group controlId="btnPlaceOrder" as={Col} xs="12">
                      <Button
                        variant="secondary"
                        className={clsx(styles.btnPlaceOrder, "w-100")}
                        type="button"
                        onClick={() => authorizeKlarna(sendCreatePayment)}
                      >
                        Continue
                      </Button>
                    </Form.Group>
                  </Row>
                )}

                {!showContinue && (
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
                )}
              </Form>
            )}
          </Formik>
        </Container>
      </Row>
    </Container>
  )
}
