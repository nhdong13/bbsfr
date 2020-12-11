import Head from "next/head"

import Header from "../Header"
import { NewRelicSnippet } from "./newrelic_snippet"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Bikebiz Replatform</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
        {NewRelicSnippet}
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
      <Header />
      <main>{children}</main>
    </>
  )
}
