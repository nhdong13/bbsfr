import dynamic from "next/dynamic"
import Head from "next/head"
import { getDataForMainNav } from "../../services/mainNav"

const DeliveryComponent = dynamic(
  () => import("../../components/Checkout/Delivery"),
  { ssr: false }
)


export async function getStaticProps() {
  const dataNav = await getDataForMainNav()
  return {
    props: { dataNav },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export default function Delivery() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
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
      <DeliveryComponent />
    </>
  )
}
