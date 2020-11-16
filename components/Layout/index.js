import Head from "next/head"

import Header from "../Header"
import { newrelicSPAMonitoring } from "./newrelic_spa_monitoring"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: newrelicSPAMonitoring}} />
        <title>Bikebiz Replatform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  )
}
