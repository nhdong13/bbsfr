import Head from "next/head"
import DeliveryComponent from "../../components/Checkout/Delivery"

export default function Delivery() {
  return (
    <>
      <Head>
        <title>Checkout Delivery</title>
        <script
          type="text/javascript"
          src="https://portal.sandbox.afterpay.com/afterpay-async.js"
          async
          defer
        ></script>
        <script
          type="text/javascript"
          src="https://x.klarnacdn.net/kp/lib/v1/api.js"
          async
        ></script>
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places,geometry`}
        ></script>

        <script
          type="text/javascript"
          src="https://js.braintreegateway.com/web/3.69.0/js/client.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://js.braintreegateway.com/web/3.69.0/js/paypal.min.js"
        ></script>
      </Head>
      <DeliveryComponent />
    </>
  )
}
