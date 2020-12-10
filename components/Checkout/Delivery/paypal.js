export function authorizePaypal(clientToken, totalPrice, sendCreatePayment) {
  braintree.client.create(
    {
      authorization: clientToken,
    },
    function (clientErr, clientInstance) {
      if (clientErr) {
        showToast()
        bag.setSubmitting(false)
        return
      }
      braintree.paypal.create(
        {
          client: clientInstance,
        },
        function (paypalErr, paypalInstance) {
          if (paypalErr) {
            showToast()
            bag.setSubmitting(false)
            return
          }
          paypalInstance.tokenize(
            {
              flow: "vault",
              amount: totalPrice,
              currency: "AUD",
            },
            function (tokenizeErr, payload) {
              // Stop if there was an error.
              if (tokenizeErr) {
                showToast()
                bag.setSubmitting(false)
                return
              }

              sendCreatePayment(payload.nonce)
            }
          )
        }
      )
    }
  )
}
