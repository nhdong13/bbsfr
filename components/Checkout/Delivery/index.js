import { useState, useEffect } from "react"
import { Container, Form, Row, Col, Button } from "react-bootstrap"
import { Formik } from "formik"
// import { useCheckout } from "@saleor/sdk"
import { useCheckout, useUserDetails } from "@sdk/react"
import clsx from "clsx"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useToasts } from "react-toast-notifications"
import _ from "lodash"

import LoadingSpinner from "components/LoadingSpinner"
import OrderSumaryComponent from "../OrderSumary"
import ShippingMethods from "./ShippingMethods"
import SelectAddressModal from "./SelectAddressModal"
import ShippingAddress from "./ShippingAddress"
import BillingAddress from "./BillingAddress"
import PaymentComponent from "./Payment"
import { AddressSchema } from "./validate"
import { paymentCheckoutTokenCreate } from "lib/mutations"
import { initKlarna, authorizeKlarna } from "./klarna"
import { authorizeAfterpay } from "./afterpay"
import { COUNTRIES_RESTRICTION } from "./constants"
import styles from "./Delivery.module.scss"

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
  const { data: currentUser, loading } = useUserDetails()
  const { addToast } = useToasts()
  const [createPaymentCheckoutToken] = useMutation(paymentCheckoutTokenCreate)
  const router = useRouter()
  const { status, orderToken, result, checkoutId } = router.query

  const [initDeliveryData, setInitDeliveryData] = useState({
    shippingAddress: { country: {} },
    billingAddress: { country: {} },
    billingDifferentAddress: false,
    paymentMethod: null,
  })
  const [showContinue, setShowContinue] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)
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

  useEffect(() => {
    const { defaultShippingAddress, defaultBillingAddress } = currentUser || {}
    setInitDeliveryData({
      shippingAddress: mappingDataAddress(defaultShippingAddress),
      billingAddress: mappingDataAddress(defaultBillingAddress),
      billingDifferentAddress: false,
      paymentMethod: null,
    })
  }, [currentUser])

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

  const selectAccountAddress = (id) => {
    const address = currentUser.addresses.find((address) => address.id === id)
    setInitDeliveryData({
      shippingAddress: mappingDataAddress(address),
      billingAddress: mappingDataAddress(address),
      billingDifferentAddress: false,
      paymentMethod: null,
    })
  }

  const showToast = () => {
    addToast("An error has been occurred. Please try again later", {
      appearance: "error",
      autoDismiss: true,
      className: "mt-4 mr-2 w-auto",
    })
  }

  const handleSubmitCheckout = async (values, bag) => {
    // Set Shipping Address and create Checkout
    const { shippingAddress, billingAddress, billingDifferentAddress } = {
      ...values,
    }

    const { data: checkoutData, dataError } = await setShippingAddress(
      {
        ...shippingAddress,
      },
      currentUser.email
    )

    if (dataError) {
      bag.setSubmitting(false)
      const fieldErrors = _.intersection(
        dataError.error.map((error) => error.field),
        ["postalCode", "phone"]
      )

      if (fieldErrors.length) {
        fieldErrors.forEach((field) =>
          bag.setErrors({
            [`shippingAddress.${field}`]: "Please check this field and try again",
          })
        )
      } else {
        showToast()
      }

      return
    }

    // Set Billing Address
    let billingAddressError
    if (!billingDifferentAddress) {
      const resBilling = await setBillingAsShippingAddress()
      billingAddressError = resBilling?.dataError
    } else {
      const resSetBilling = await setBillingAddress(
        {
          ...billingAddress,
        },
        currentUser.email
      )
      billingAddressError = resSetBilling?.dataError
    }

    if (billingAddressError) {
      bag.setSubmitting(false)
      const fieldErrors = _.intersection(
        billingAddressError.error.map((error) => error.field),
        ["postalCode", "phone"]
      )

      if (fieldErrors.length) {
        fieldErrors.forEach((field) =>
          bag.setErrors({
            [`billingAddress.${field}`]: "Please check this field and try again",
          })
        )
      } else {
        showToast()
      }
      return
    }

    // Set Shipping method
    const { data, dataError: setShippingMethodError } = await setShippingMethod(
      checkoutData.availableShippingMethods[0].id
    )

    if (setShippingMethodError) {
      showToast()
      bag.setSubmitting(false)
      return
    }

    // Create payment checkout token
    const { data: paymentCheckoutTokenRes } = await createPaymentCheckoutToken({
      variables: {
        checkoutId: checkoutData.id,
        gateway: values.paymentMethod.id,
        amount: data.totalPrice?.gross?.amount,
      },
    })

    const { paymentCheckoutTokenCreate } = paymentCheckoutTokenRes

    if (paymentCheckoutTokenCreate.checkoutErrors?.length) {
      showToast()
      bag.setSubmitting(false)
      return
    }
    localStorage.setItem("paymentGateway", values.paymentMethod.id)

    // Authorize payment checkout token
    const {
      token,
      checkoutUri,
    } = paymentCheckoutTokenCreate.gatewayCheckoutResponse
    switch (values.paymentMethod.id) {
      case "plugin.gateway.afterpay":
        authorizeAfterpay(token)
        break
      case "bikebiz.payments.klarna":
        initKlarna(token, () => setShowContinue(true))
        break
      case "bikebiz.payments.zipmoney":
        router.push(checkoutUri)
        break
      default:
        break
    }
  }

  return (
    <Container fluid className={styles.deliveryContainer}>
      {(loading || showLoading) && (
        <Row>
          <LoadingSpinner show={loading || showLoading} />
        </Row>
      )}

      {!loading && !showLoading && (
        <>
          <OrderSumaryComponent />
          <SelectAddressModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            onSelectAddress={selectAccountAddress}
            addresses={currentUser?.addresses}
            defaultShippingAddress={currentUser?.defaultShippingAddress}
          />
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
              <Formik
                enableReinitialize
                validationSchema={AddressSchema}
                onSubmit={handleSubmitCheckout}
                initialValues={initDeliveryData}
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

                    <ShippingAddress
                      handleChange={handleChange}
                      values={values.shippingAddress}
                      touched={touched}
                      errors={errors}
                      setFieldValue={setFieldValue}
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
                        touched={touched}
                        errors={errors}
                      />
                    )}

                    <PaymentComponent
                      availablePaymentGateways={availablePaymentGateways || []}
                      paymentMethod={values.paymentMethod}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
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
                            CONTINUE
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
                            disabled={isSubmitting}
                          >
                            PLACE ORDER
                          </Button>
                        </Form.Group>
                      </Row>
                    )}
                  </Form>
                )}
              </Formik>
            </Container>
          </Row>
        </>
      )}
    </Container>
  )
}

export const mappingDataAddress = (data) => {
  return {
    bussinessName: data?.companyName || "",
    city: data?.city || "",
    country: data?.country || COUNTRIES_RESTRICTION[0],
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    phone: data?.phone || "",
    postalCode: data?.postalCode || "",
    countryArea: data?.countryArea || "",
    streetAddress1: data?.streetAddress1 || "",
    streetAddress2: data?.streetAddress2 || "",
    address: data
      ? [
          data?.streetAddress1,
          data?.city,
          [data?.countryArea, data?.postalCode].join(" "),
        ].join(", ")
      : "",
    useFullForm: false,
  }
}
