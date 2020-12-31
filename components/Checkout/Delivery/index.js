import { useState, useEffect, useRef } from "react"
import { Container, Form, Row, Col, Button } from "react-bootstrap"
import { Formik } from "formik"
// import { useCheckout } from "@saleor/sdk"
import { useCheckout, useUserDetails, useCart } from "@sdk/react"
import clsx from "clsx"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { useToasts } from "react-toast-notifications"
import _ from "lodash"

import LoadingSpinner from "components/LoadingSpinner"
import OrderSumaryComponent from "../OrderSumary"
import DeliveryHeader from "./Header"
import ShippingMethods from "./ShippingMethods"
import SelectAddressModal from "./SelectAddressModal"
import ShippingAddressForm from "./ShippingAddress"
import BillingAddress from "./BillingAddress"
import PaymentComponent from "./Payment"
import PromotionComponent from "../Promotion"
import OrderTotalCost from "../OrderTotalCost"
import { ShippingSchema, DeliverySchema } from "./validate"
import { paymentCheckoutTokenCreate } from "lib/mutations"
import { authorizeKlarna } from "./klarna"
import { validateCreditCard, authorizeCreditCard } from "./credit_card"
import { initGooglePay } from "./google_pay"
import { INITIAL_ADDRESS } from "../constants"
import {
  mappingDataAddress,
  selectAccountAddress,
  createCheckout,
  setBilling,
  processPayment,
} from "./helpers"
import styles from "./Delivery.module.scss"

export default function DeliveryComponent() {
  const {
    checkout,
    availableShippingMethods,
    setShippingMethod,
    setShippingAddress,
    setBillingAddress,
    setBillingAsShippingAddress,
    availablePaymentGateways,
    createPayment,
    completeCheckout,
    addPromoCode,
    promoCodeDiscount,
    loaded,
  } = useCheckout()
  const deliveryFormRef = useRef()
  const { totalPrice, subtotalPrice, shippingPrice, discount } = useCart()
  const { data: userData, loading } = useUserDetails()
  const { addToast } = useToasts()
  const [createPaymentCheckoutToken] = useMutation(paymentCheckoutTokenCreate)

  const router = useRouter()
  const { status, orderToken, result, checkoutId } = router.query
  const [initShippingData, setInitShippingData] = useState({
    shippingAddress: INITIAL_ADDRESS,
  })
  const [initDeliveryData, setInitDeliveryData] = useState({
    shippingMethod: "",
    billingAddress: INITIAL_ADDRESS,
    billingDifferentAddress: false,
    paymentMethod: null,
    promotion: {
      code: "",
      valid: false,
      discountAmount: null,
      discountedPrice: null,
    },
    giftCard: {
      code: "",
      valid: false,
    },
    creditCard: {
      number: "",
      expirationDate: "",
      cvv: "",
    },
  })

  const [showContinue, setShowContinue] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [hostedFieldsInstance, setHostedFieldsInstance] = useState(null)
  const [googlePayInstance, setGooglePayInstance] = useState(null)
  const [currentUser, setCurrentUser] = useState({
    email: localStorage.getItem("guestEmail") || "",
  })

  useEffect(() => {
    if (loading) {
      return
    }
    if (!userData && !currentUser.email) {
      localStorage.removeItem("token")
      router.push(`/checkout/signup`)
      return
    }
    if (!userData) {
      return
    }
    localStorage.removeItem("guestEmail")
    const { defaultShippingAddress, defaultBillingAddress } = userData || {}
    setInitShippingData({
      shippingAddress: mappingDataAddress(defaultShippingAddress),
    })
    setInitDeliveryData({
      ...initDeliveryData,
      billingAddress: mappingDataAddress(defaultBillingAddress),
    })
    setCurrentUser(userData)
  }, [loading])

  useEffect(() => {
    if (!loaded) {
      return
    }

    if (checkout.shippingAddress) {
      setInitShippingData({
        shippingAddress: mappingDataAddress(checkout.shippingAddress),
      })
    }

    const braintreeMethod =
      availablePaymentGateways &&
      availablePaymentGateways.find(
        (method) => method.id === "mirumee.payments.braintree"
      )

    let paymentMethod
    if (braintreeMethod) {
      paymentMethod = {
        ...braintreeMethod,
        subId: "bikebiz.payments.creditCard",
      }
      const clientToken = braintreeMethod.config.find(
        (config) => config.field === "client_token"
      ).value
      authorizeCreditCard(clientToken, setHostedFieldsInstance)
      initGooglePay(clientToken, setGooglePayInstance)
    }

    let shippingMethod = checkout.shippingMethod?.id
    let promotion = initDeliveryData.promotion
    if (promoCodeDiscount.voucherCode) {
      promotion = {
        code: promoCodeDiscount.voucherCode,
        valid: true,
        discountAmount: null,
        discountedPrice: null,
      }
    }

    setInitDeliveryData({
      ...initDeliveryData,
      paymentMethod,
      shippingMethod,
      promotion,
    })
  }, [loaded])

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
    if (!orderToken) return

    setShowLoading(true)
    const paymentGateway = localStorage.getItem("paymentGateway")
    const { dataError } = await createPayment(paymentGateway, orderToken)
    if (dataError) {
      setShowLoading(false)
      handleSubmitError()
      return
    }

    const { data, dataError: completeCheckoutError } = await completeCheckout()

    if (completeCheckoutError) {
      setShowLoading(false)
      handleSubmitError()
      return
    }
    localStorage.removeItem("guestEmail")
    router.push(`/checkout/complete?orderNumber=${data?.number}`)
  }

  const handleSubmitError = (bag) => {
    addToast("An error has been occurred. Please try again later", {
      appearance: "error",
      autoDismiss: true,
      className: "mt-4 mr-2 w-auto",
    })
    if (bag) {
      bag.setSubmitting(false)
    }
  }

  const handleSubmitShipping = async (values, bag) => {
    const { shippingAddress } = values
    const deliveryForm = deliveryFormRef.current
    // Set Shipping Address and create Checkout
    const { checkoutData } = await createCheckout(
      setShippingAddress,
      shippingAddress,
      currentUser.email,
      bag,
      handleSubmitError,
      addPromoCode,
      deliveryForm
    )
    if (!checkoutData) return
    await setShippingMethod("")
    deliveryForm.setFieldValue("shippingMethod", "")
  }

  const handleSubmitCheckout = async (values, bag) => {
    const { billingAddress, billingDifferentAddress, paymentMethod } = values

    if (paymentMethod.subId === "bikebiz.payments.creditCard") {
      const validCreditCard = validateCreditCard(hostedFieldsInstance, bag)
      if (!validCreditCard) {
        return
      }
    }

    // Set Billing Address
    const { billingData } = await setBilling(
      setBillingAddress,
      setBillingAsShippingAddress,
      billingDifferentAddress,
      billingAddress,
      currentUser.email,
      bag,
      handleSubmitError
    )
    if (!billingData) return

    const data = {
      ...checkout,
      totalPrice,
    }

    localStorage.setItem("paymentGateway", paymentMethod.id)
    await processPayment(
      data,
      paymentMethod,
      createPaymentCheckoutToken,
      bag,
      handleSubmitError,
      router,
      setShowContinue,
      sendCreatePayment,
      hostedFieldsInstance,
      googlePayInstance
    )
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
            onSelectAddress={(id) =>
              selectAccountAddress(currentUser, id, setInitShippingData)
            }
            addresses={currentUser?.addresses}
            defaultShippingAddress={currentUser?.defaultShippingAddress}
          />
          <Row>
            <Container>
              <DeliveryHeader currentUser={currentUser} />

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
                validationSchema={ShippingSchema}
                onSubmit={handleSubmitShipping}
                initialValues={initShippingData}
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
                  <ShippingAddressForm
                    handleSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    handleChange={handleChange}
                    values={values.shippingAddress}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  />
                )}
              </Formik>

              <Formik
                innerRef={deliveryFormRef}
                enableReinitialize
                validationSchema={DeliverySchema}
                onSubmit={handleSubmitCheckout}
                initialValues={initDeliveryData}
              >
                {({
                  handleSubmit,
                  handleChange,
                  setFieldValue,
                  setFieldTouched,
                  setFieldError,
                  isSubmitting,
                  values,
                  touched,
                  errors,
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row>
                      <LoadingSpinner show={isSubmitting} />
                    </Row>

                    <ShippingMethods
                      values={values}
                      availableShippingMethods={availableShippingMethods}
                      handleSubmitError={handleSubmitError}
                      setShowLoading={setShowLoading}
                      setFieldValue={setFieldValue}
                      errors={errors}
                      touched={touched}
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
                      googlePayInstance={googlePayInstance}
                    />
                    <div id="klarna-payments-container"></div>

                    <PromotionComponent
                      handleChange={handleChange}
                      values={values}
                      touched={touched}
                      errors={errors}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      setFieldError={setFieldError}
                    />

                    <OrderTotalCost
                      totalPrice={totalPrice}
                      subtotalPrice={subtotalPrice}
                      shippingPrice={shippingPrice}
                      discount={discount}
                      promotion={values.promotion}
                    ></OrderTotalCost>

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
