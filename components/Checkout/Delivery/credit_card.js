export function authorizeCreditCard(clientToken, setHostedFieldsInstance) {
  braintree.client.create(
    {
      authorization: clientToken,
    },
    function (err, clientInstance) {
      if (err) {
        console.error(err)
        return
      }
      braintree.hostedFields.create(
        {
          client: clientInstance,
          styles: {
            input: {
              "font-size": "14px",
            },
          },
          fields: {
            number: {
              selector: "#card-number",
              placeholder: "4111 1111 1111 1111",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "123",
            },
            expirationDate: {
              selector: "#expiration-date",
              placeholder: "MM / YY",
            },
          },
        },
        function (err, hostedFieldsInstance) {
          if (err) {
            console.log("err1", err)
            return
          }
          setHostedFieldsInstance(hostedFieldsInstance)
        }
      )
    }
  )
}

export function validateCreditCard(hostedFieldsInstance, bag) {
  let valid = true
  const state = hostedFieldsInstance.getState()
  Object.keys(state.fields).forEach(function (field) {
    const fieldData = state.fields[field]
    if (fieldData.isEmpty) {
      valid = false
      bag.setFieldError(`creditCard.${field}`, "This field is required")
    } else if (!fieldData.isValid) {
      valid = false
      bag.setFieldError(
        `creditCard.${field}`,
        field === "expirationDate"
          ? "Please enter a valid date"
          : "Please enter a valid number"
      )
    }
  })

  bag.setSubmitting(false)
  return valid
}

export function hostedFieldsTokenize(
  hostedFieldsInstance,
  totalPrice,
  sendCreatePayment,
  handleError
) {
  hostedFieldsInstance.tokenize(
    {
      amount: totalPrice,
      currency: "AUD",
    },
    function (err, payload) {
      if (err) {
        handleError()
        return
      }
      sendCreatePayment(payload.nonce)
    }
  )
}
