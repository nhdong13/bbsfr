import Head from "next/head"

import Header from "../Header"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Bikebiz Replatform</title>
        <link rel="icon" href="/favicon.ico" />
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
      </Head>
      <Header />
      <main>{children}</main>
    </>
  )
}
