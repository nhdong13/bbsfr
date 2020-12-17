import dynamic from "next/dynamic"

const CheckoutComponent = dynamic(() => import("../../components/Checkout"), {
  ssr: false,
})

export default function Checkout() {
  return <CheckoutComponent />
}
