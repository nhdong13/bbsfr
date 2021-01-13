import { Provider } from "react-redux"
import { ApolloProvider } from "@apollo/client"
import { ToastProvider } from "react-toast-notifications"
import { useStore } from "../redux/store"
import { useApollo } from "../lib/apollo"
import { SaleorProvider } from "../lib/@sdk/react"
import Layout from "components/Layout"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../styles/globals.scss"
import NProgressBarComponent from "../components/Common/NProgressBar"
import { getConfigPipeline } from "../services/getPipelineSajari"
import {
  SSRProvider,
  Variables,
  Pipeline,
  FilterBuilder,
  SearchProvider,
} from "@sajari/react-search-ui"
import App from "next/app"

const SALEOR_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_API_URI,
}

// Fix issue localstorage not found in when start node server
// Will remove when update Saleor SDK to v11
if (typeof window === "undefined") {
  require("localstorage-polyfill")
}

const pipeline = new Pipeline({ ...getConfigPipeline("best-buy") }, "query")
const variables = new Variables({
  resultsPerPage: 20,
  q: "",
})

export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  const apolloClient = useApollo(pageProps.initialApolloState)
  console.log("Debug code pageProps:", pageProps)
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <SaleorProvider
          client={apolloClient} // Will remove when update Saleor SDK to v11
          config={SALEOR_CONFIG}
          apolloConfig={{ client: apolloClient }}
        >
          <SSRProvider>
            <SearchProvider
              search={{
                pipeline,
                // variables,
              }}
              // initialResponse={pageProps?.initialResponse}
              // searchOnLoad={!pageProps?.initialResponse}
              defaultFilter={pageProps?.filter}
              // customClassNames={{
              //   pagination: {
              //     container: "containerPagination",
              //     button: "buttonPagination",
              //     active: "activePagination",
              //     next: "nextPagination",
              //     prev: "prevPagination",
              //     spacerEllipsis: "spacerEllipsisPagination",
              //   },
              // }}
            >
              <ToastProvider>
                <NProgressBarComponent />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </ToastProvider>
            </SearchProvider>
          </SSRProvider>
        </SaleorProvider>
      </ApolloProvider>
    </Provider>
  )
}
