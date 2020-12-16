import _ from "lodash"
import { COUNTRIES_RESTRICTION } from "./constants"
import { initKlarna } from "./klarna"
import { authorizeAfterpay } from "./afterpay"
import { authorizePaypal } from "./paypal"
import { authorizeCreditCard } from "./creditCard"

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

export const sendCreatePayment = async (
  orderToken,
  createPayment,
  completeCheckout,
  setShowLoading,
  router
) => {
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

export const selectAccountAddress = (
  currentUser,
  id,
  setInitDeliveryData,
  initDeliveryData
) => {
  const address = currentUser.addresses.find((address) => address.id === id)
  setInitDeliveryData({
    ...initDeliveryData,
    shippingAddress: mappingDataAddress(address),
    billingAddress: mappingDataAddress(address),
  })
}

export const createCheckout = async (
  setShippingAddress,
  shippingAddress,
  email,
  bag,
  handleSubmitError
) => {
  const { data, dataError } = await setShippingAddress(shippingAddress, email)

  if (dataError) {
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
      bag.setSubmitting(false)
    } else {
      handleSubmitError(bag)
    }

    return {}
  }

  return { checkoutData: data }
}

export const setBilling = async (
  setBillingAddress,
  setBillingAsShippingAddress,
  billingDifferentAddress,
  billingAddress,
  email,
  bag,
  handleSubmitError
) => {
  let billingAddressError
  if (!billingDifferentAddress) {
    const resBilling = await setBillingAsShippingAddress()
    billingAddressError = resBilling?.dataError
  } else {
    const resSetBilling = await setBillingAddress(billingAddress, email)
    billingAddressError = resSetBilling?.dataError
  }

  if (billingAddressError) {
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
      bag.setSubmitting(false)
    } else {
      handleSubmitError(bag)
    }
    return {}
  }

  return { billingData: true }
}

export const processPayment = async (
  checkoutData,
  totalPrice,
  paymentMethod,
  createPaymentCheckoutToken,
  bag,
  handleSubmitError,
  router,
  setShowContinue,
  sendCreatePayment
) => {
  if (paymentMethod.id !== "mirumee.payments.braintree") {
    // Create payment checkout token
    const { data: paymentCheckoutTokenRes } = await createPaymentCheckoutToken({
      variables: {
        checkoutId: checkoutData.id,
        gateway: paymentMethod.id,
        amount: totalPrice,
      },
    })

    const { paymentCheckoutTokenCreate } = paymentCheckoutTokenRes

    if (paymentCheckoutTokenCreate.checkoutErrors?.length) {
      handleSubmitError(bag)
      return
    }

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
        router.push(checkoutUri)
        break
      default:
        break
    }
  } else {
    const clientToken = paymentMethod.config.find(
      (config) => config.field === "client_token"
    ).value

    // Authorize payment checkout token
    switch (paymentMethod.subId) {
      case "bikebiz.payments.paypal":
        authorizePaypal(clientToken, totalPrice, sendCreatePayment, () =>
          handleSubmitError(bag)
        )
        break
      case "bikebiz.payments.creditCard":
        authorizeCreditCard(clientToken)
      default:
        break
    }
  }
}
