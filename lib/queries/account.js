import { gql } from "@apollo/client"

export const checkEmailExistedQuery = gql`
  query ExistedEmailChecking($email: String!) {
    existedEmailChecking(email: $email)
  }
`
