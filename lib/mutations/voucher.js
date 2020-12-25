import { gql } from "@apollo/client"

export const voucherifyValidate = gql`
  mutation VoucherifyValidate($input: VoucherifyInput!) {
    voucherifyValidate(input: $input) {
      voucherify {
        code
        discount
        valid
        discountAmount
        discountedPrice
      }
      voucherifyError {
        code
        valid
      }
    }
  }
`
