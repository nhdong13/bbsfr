const METHOD_CATEGORY = "pay_later"

function initKlarna(clientToken, callback) {
  try {
    Klarna.Payments.init({ client_token: clientToken })
    Klarna.Payments.load(
      {
        container: "#klarna-payments-container",
        payment_method_category: METHOD_CATEGORY,
      },
      {},
      callback
    )
  } catch (e) {
    console.log(e)
  }
}

function authorizeKlarna(sendCreatePayment) {
  try {
    Klarna.Payments.authorize(
      { payment_method_category: METHOD_CATEGORY },
      {},
      function (res) {
        sendCreatePayment(res.authorization_token)
      }
    )
  } catch (e) {
    console.log(e)
  }
}

export { initKlarna, authorizeKlarna }
