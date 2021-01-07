import { gql } from "@apollo/client"

export const voucherifyValidate = gql`
  mutation VoucherifyValidate($input: VoucherifyInput!) {
    voucherifyValidate(input: $input) {
      voucherify {
        code
        type
        discount
        valid
        discountAmount
        discountedPrice
      }
      voucherifyError {
        code
        field
        message
      }
    }
  }
`
