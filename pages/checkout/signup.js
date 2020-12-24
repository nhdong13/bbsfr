import Head from "next/head"
import EmailPasswordComponent from "../../components/Checkout/EmailPassword"

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
