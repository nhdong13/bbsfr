import { Provider } from "react-redux"
import { ApolloProvider } from "@apollo/client"
import { ToastProvider } from "react-toast-notifications"
import { useStore } from "../redux/store"
import { useApollo } from "../lib/apollo"
import { SaleorProvider } from "../lib/@sdk/react"
import Layout from "components/Layout"
import NProgressBarComponent from "../components/Common/NProgressBar"
import { SSRProvider, SearchProvider } from "@sajari/react-search-ui"
import { pipelineConfig, variablesConfig } from "../lib/sajari/config"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../styles/globals.scss"
import {
  brandFilter,
  categoryFilter,
  listBrandsFilter,
  priceRangeFilter,
  ratingFilter,
} from "../lib/sajari/filter"

const SALEOR_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_API_URI,
}

// Fix issue localstorage not found in when start node server
// Will remove when update Saleor SDK to v11
if (typeof window === "undefined") {
  require("localstorage-polyfill")
}


export default function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  const apolloClient = useApollo(pageProps.initialApolloState)
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
                pipeline: pipelineConfig,
                variables: variablesConfig,
                filters: [
                  listBrandsFilter,
                  priceRangeFilter,
                  brandFilter,
                  categoryFilter,
                  ratingFilter,
                ],
              }}
              initialResponse={pageProps?.initialResponse}
              searchOnLoad={!pageProps?.initialResponse}
              defaultFilter={pageProps?.filter}
              customClassNames={{
                pagination: {
                  container: "containerPagination",
                  button: "buttonPagination",
                  active: "activePagination",
                  next: "nextPagination",
                  prev: "prevPagination",
                  spacerEllipsis: "spacerEllipsisPagination",
                },
              }}
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
