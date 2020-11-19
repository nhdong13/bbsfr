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
      </Head>
      <Header />
      <main>{children}</main>
    </>
  )
}
