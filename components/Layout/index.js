import Head from "next/head"

import Header from "../Header"
import { NewRelicSnippet } from "./newrelic_snippet"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Bikebiz Replatform</title>
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
      </Head>
      <Header />
      <main>{children}</main>
    </>
  )
}
