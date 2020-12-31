import dynamic from "next/dynamic"
import { getDataForMainNav } from "../../services/mainNav"

const CheckoutComponent = dynamic(() => import("../../components/Checkout"), {
  ssr: false,
})

export async function getStaticProps() {
  const dataNav = await getDataForMainNav()
  return {
    props: { dataNav },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export default function Checkout() {
  return <CheckoutComponent />
}
