export const SHIPPING_METHODS_ICON = {
  Post: "/box-2.svg",
  "Click & Collect": "/walk.svg",
  Courier: "/delivery-fast.svg",
}

export const PAYMENT_METHODS_ICON = {
  "bikebiz.payments.klarna": "/klarna.svg",
  "plugin.gateway.afterpay": "/afterpay.svg",
  "bikebiz.payments.zipmoney": "/zip.svg",
  "bikebiz.payments.paypal": "/paypal.svg",
}

export const BRAINTREE_SUPPORTED_METHODS = ["bikebiz.payments.paypal"]

export const PAYMENT_METHODS = [
  {
    name: "visa",
    icon: "/visa.svg",
  },
  {
    name: "paypal",
    icon: "/paypal.svg",
  },
  {
    name: "klarna",
    icon: "/klarna.svg",
  },
  {
    name: "zippay",
    icon: "/zip.svg",
  },
  {
    name: "afterpay",
    icon: "/afterpay.svg",
  },
  {
    name: "applepay",
    icon: "/applepay.svg",
  },
  {
    name: "googlepay",
    icon: "/googlepay.svg",
  },
]

export const COUNTRIES_RESTRICTION = [
  {
    country: "Australia",
    code: "AU",
  },
]

export const NUMBER_DUMP_CONTENT_FLEXBOX = 3

export const INITIAL_ADDRESS = {
  bussinessName: "",
  city: "",
  country: COUNTRIES_RESTRICTION[0],
  firstName: "",
  lastName: "",
  phone: "",
  postalCode: "",
  countryArea: "",
  streetAddress1: "",
  streetAddress2: "",
  address: "",
  useFullForm: false,
}

// Will remove in future
export const DUMP_SHIPPING_DATA = [
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
]
