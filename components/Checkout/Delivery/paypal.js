export function authorizePaypal(
  clientToken,
  totalPrice,
  sendCreatePayment,
  handleError
) {
  braintree.client.create(
    {
      authorization: clientToken,
    },
    function (clientErr, clientInstance) {
      if (clientErr) {
        handleError()
        return
      }
      braintree.paypal.create(
        {
          client: clientInstance,
        },
        function (paypalErr, paypalInstance) {
          if (paypalErr) {
            handleError()
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
                handleError()
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
