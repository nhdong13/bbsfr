import Head from "next/head"

import Header from "../Header"
import { NewRelicSnippet } from "./newrelic_snippet"

export default function Layout({ children }) {
  const { props } = children
  const { dataNav } = props
  return (
    <>
      <Head>
        <title>Bikebiz Replatform</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="icon" href="/favicon.ico" />
        {NewRelicSnippet}
      </Head>
      <Header dataNav={dataNav} />
      <main>
        {children}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
          as="style"
        />
      </main>
    </>
  )
}
