import dynamic from "next/dynamic"
import Head from "next/head"

const CheckoutComponent = dynamic(() => import("../../components/Checkout"), {
  ssr: false,
})

export default function Checkout() {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://js.braintreegateway.com/web/3.69.0/js/client.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://js.braintreegateway.com/web/3.69.0/js/hosted-fields.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://pay.google.com/gp/p/js/pay.js"
        ></script>
        <script
          type="text/javascript"
          src="https://js.braintreegateway.com/web/3.69.0/js/google-payment.min.js"
        ></script>
      </Head>
      <CheckoutComponent />
    </>
  )
}
