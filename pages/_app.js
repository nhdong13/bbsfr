import { Provider } from "react-redux"
import { ApolloProvider } from "@apollo/client"
import { SaleorProvider } from "@saleor/sdk"
import { useStore } from "../redux/store"
import { useApollo } from "../lib/apollo"
import "../styles/globals.scss"

const SALEOR_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_API_URI,
}

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <SaleorProvider
          config={SALEOR_CONFIG}
          apolloConfig={{ client: apolloClient }}
        >
          <Component {...pageProps} />
        </SaleorProvider>
      </ApolloProvider>
    </Provider>
  )
}