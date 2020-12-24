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
import NProgressBarComponent from "../components/Common/NProgressBar";

const SALEOR_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_API_URI,
}

// Fix issue localstorage not found in when start node server
// Will remove when update Saleor SDK to v11
if (typeof window === "undefined") {
  require("localstorage-polyfill")
}

export default function App({ Component, pageProps }) {
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
          <ToastProvider>
          <NProgressBarComponent  />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ToastProvider>
        </SaleorProvider>
      </ApolloProvider>
    </Provider>
  );
}
