export const SHIPPING_METHODS_ICON = {
  post: "/box-2.svg",
  click_collect: "/walk.svg",
  courier: "/delivery-fast.svg",
}

export const PAYMENT_METHODS_ICON = {
  "bikebiz.payments.klarna": "/klarna.svg",
  "plugin.gateway.afterpay": "/afterpay.svg",
  "bikebiz.payments.zipmoney": "/zip.svg",
  "bikebiz.payments.paypal": "/paypal.svg",
  "bikebiz.payments.creditCard": "/visa.svg",
  "bikebiz.payments.googlepay": "/googlepay.svg",
}

export const BRAINTREE_SUPPORTED_METHODS = [
  "bikebiz.payments.creditCard",
  "bikebiz.payments.paypal",
  "bikebiz.payments.googlepay",
]

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

export const MAX_QUANTITY = 10

export const MAX_TOASTS_ALLOWED = 2
