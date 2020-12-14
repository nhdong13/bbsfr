export function authorizeCreditCard(clientToken) {
  const client = Promise.promisify(braintree.client.create)({
    authorization: clientToken,
  })
  console.log("client", client)
  // braintree.client.create(
  //   {
  //     authorization: clientToken,
  //   },
  //   function (err, clientInstance) {
  //     if (err) {
  //       console.error(err)
  //       return
  //     }
  //     return createHostedFields(clientInstance)
  //   }
  // )
}

function createHostedFields(clientInstance) {
  braintree.hostedFields.create(
    {
      client: clientInstance,
      styles: {
        input: {
          "font-size": "16px",
          "font-family": "courier, monospace",
          "font-weight": "lighter",
          color: "#ccc",
        },
        ":focus": {
          color: "black",
        },
        ".valid": {
          color: "#8bdda8",
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

      hostedFieldsInstance.tokenize(function (err, payload) {
        if (err) {
          console.log("err", err)
          return
        }

        alert("Submit your nonce (" + payload.nonce + ") to your server here!")
      })
    }
  )
}
