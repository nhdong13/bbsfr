import { gql } from "@apollo/client"

export const paymentCheckoutTokenCreate = gql`
  mutation PaymentCheckoutTokenCreate(
    $checkoutId: ID!
    $gateway: String!
    $amount: Decimal!
  ) {
    paymentCheckoutTokenCreate(
      checkoutId: $checkoutId
      input: { gateway: $gateway, amount: $amount }
    ) {
      checkoutErrors {
        message
      }
      gatewayCheckoutResponse {
        errors {
          code
          message
          details {
            name
            message
          }
        }
        token
        expires
        redirectCheckoutUrl
        checkoutUri
        checkoutId
      }
    }
  }
`
