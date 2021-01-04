import Head from "next/head"
import EmailPasswordComponent from "../../components/Checkout/EmailPassword"
import { getDataForMainNav } from "../../services/mainNav"

export async function getStaticProps() {
  const dataNav = await getDataForMainNav()
  return {
    props: { dataNav },
    revalidate: +process.env.NEXT_PUBLIC_REVALIDATE_PAGE_TIME,
  }
}

export default function SignUp() {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <EmailPasswordComponent />
    </>
  )
}
