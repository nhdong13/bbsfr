import Head from "next/head"

import Header from "../Header"

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Bikebiz Replatform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  )
}
