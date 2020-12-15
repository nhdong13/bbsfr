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
import DeliveryHeader from "./Header"
import ShippingMethods from "./ShippingMethods"
import SelectAddressModal from "./SelectAddressModal"
import ShippingAddress from "./ShippingAddress"
import BillingAddress from "./BillingAddress"
import PaymentComponent from "./Payment"
import { AddressSchema } from "./validate"
import { paymentCheckoutTokenCreate } from "lib/mutations"
import { authorizeKlarna } from "./klarna"
import { INITIAL_ADDRESS, DUMP_SHIPPING_DATA } from "./constants"
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
    shippingAddress: INITIAL_ADDRESS,
    billingAddress: INITIAL_ADDRESS,
    billingDifferentAddress: false,
    paymentMethod: null,
  })
  const [showContinue, setShowContinue] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)

  // TODO in the future
  const [shippingMethods, setShippingMethods] = useState(DUMP_SHIPPING_DATA)

  useEffect(() => {
    if (!loading) {
      const { defaultShippingAddress, defaultBillingAddress } =
        currentUser || {}
      setInitDeliveryData({
        ...initDeliveryData,
        shippingAddress: mappingDataAddress(defaultShippingAddress),
        billingAddress: mappingDataAddress(defaultBillingAddress),
      })
    }

    let token
    if (status === "SUCCESS") {
      token = orderToken
    }

    if (result === "approved") {
      token = checkoutId
    }
    sendCreatePayment(token)
  }, [loading, status, result])

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

  const handleSubmitCheckout = async (values, bag) => {
    const {
      shippingAddress,
      billingAddress,
      billingDifferentAddress,
      paymentMethod,
    } = values

    // Set Shipping Address and create Checkout
    const { checkoutData } = await createCheckout(
      setShippingAddress,
      shippingAddress,
      currentUser.email,
      bag,
      handleSubmitError
    )
    if (!checkoutData) return

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

    // Set Shipping method
    const { data, dataError: setShippingMethodError } = await setShippingMethod(
      checkoutData.availableShippingMethods[0].id
    )
    if (setShippingMethodError) {
      handleSubmitError(bag)
      return
    }

    localStorage.setItem("paymentGateway", paymentMethod.id)

    const totalPrice = data.totalPrice?.gross?.amount

    await processPayment(
      checkoutData,
      totalPrice,
      paymentMethod,
      createPaymentCheckoutToken,
      bag,
      handleSubmitError,
      router,
      setShowContinue,
      sendCreatePayment
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
              selectAccountAddress(
                currentUser,
                id,
                setInitDeliveryData,
                initDeliveryData
              )
            }
            addresses={currentUser?.addresses}
            defaultShippingAddress={currentUser?.defaultShippingAddress}
          />
          <Row>
            <Container>
              <DeliveryHeader currentUser={currentUser} />
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
