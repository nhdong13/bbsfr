const paymentsClient = new google.payments.api.PaymentsClient({
  environment: process.env.NEXT_PUBLIC_GPAY_ENV,
})

export function initGooglePay(clientToken, setGPayInstance) {
  braintree.client.create(
    {
      authorization: clientToken,
    },
    function (clientErr, clientInstance) {
      if (clientErr) {
        console.log("clientErr", clientErr)
        return
      }

      braintree.googlePayment.create(
        {
          client: clientInstance,
          googlePayVersion: 2,
          googleMerchantId: process.env.NEXT_PUBLIC_GPAY_MERCHANT_ID,
        },
        function (googlePaymentErr, googlePaymentInstance) {
          if (googlePaymentErr) {
            console.log("googlePaymentErr", googlePaymentErr)
            return
          }
          paymentsClient
            .isReadyToPay({
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest()
                .allowedPaymentMethods,
              existingPaymentMethodRequired: true,
            })
            .then(function (response) {
              if (response.result) {
                setGPayInstance(googlePaymentInstance)
              }
            })
            .catch(function (err) {
              console.log("err", err)
              return
            })
        }
      )
    }
  )
}

export function authorizeGooglePay(
  googlePaymentInstance,
  totalPrice,
  sendCreatePayment,
  handleError
) {
  var paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
    transactionInfo: {
      currencyCode: "AUD",
      totalPriceStatus: "FINAL",
      totalPrice: totalPrice.toString(),
    },
  })

  // Recommend collecting billing address information as a best practice.
  var cardPaymentMethod = paymentDataRequest.allowedPaymentMethods[0]
  cardPaymentMethod.parameters.billingAddressRequired = true
  cardPaymentMethod.parameters.billingAddressParameters = {
    format: "FULL",
    phoneNumberRequired: true,
  }

  paymentsClient
    .loadPaymentData(paymentDataRequest)
    .then(function (paymentData) {
      googlePaymentInstance.parseResponse(paymentData, function (err, result) {
        if (err) {
          handleError()
          return
        }
        sendCreatePayment(result.nonce)
      })
    })
    .catch(function (err) {
      handleError()
    })
}
