import Head from "next/head"
import styles from "../styles/Home.module.scss"
import Header from "../components/Header"
import CheckoutComponent from "../components/Checkout"

export default function Home() {
  return (
    <>
      <Head>
        <title>Bikebiz Replatform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <CheckoutComponent />
      </main>
    </>
  )
}
