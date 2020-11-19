import { useRouter } from "next/router"
import { Container } from "react-bootstrap"

export default function Complete() {
  const router = useRouter()
  const { orderNumber } = router.query

  return (
    <Container>
      <h1>Thank you for your order!</h1>
      <h2>Your order number is {orderNumber}</h2>
    </Container>
  )
}
