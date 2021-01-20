import Head from "next/head"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useToasts } from "react-toast-notifications"

import Header from "../Header"
import { NewRelicSnippet } from "./newrelic_snippet"
import { resetNotify } from "redux/reducers/notify"

export default function Layout({ children }) {
  const { props } = children
  const { dataNav } = props
  const notify = useSelector((state) => state.notify)
  const dispatch = useDispatch()
  const { addToast } = useToasts()

  useEffect(() => {
    if (notify.message) {
      addToast(notify.message, {
        appearance: notify.type,
        autoDismiss: true,
        className: "mt-4 mr-2 w-auto",
      })
      dispatch(resetNotify())
    }
  }, [notify.message])

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
