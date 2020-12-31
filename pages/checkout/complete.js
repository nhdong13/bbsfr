import { useRouter } from "next/router"
import { Container } from "react-bootstrap"
import { getDataForMainNav } from "../../services/mainNav"

export async function getStaticProps() {
  const dataNav = await getDataForMainNav()
  return {
    props: { dataNav },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

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
