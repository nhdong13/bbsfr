export function authorizeAfterpay(token) {
  AfterPay.initialize({
    countryCode: "AU",
  })
  AfterPay.redirect({ token })
}
