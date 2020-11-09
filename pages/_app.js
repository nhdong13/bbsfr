import { Provider } from "react-redux"
import { SaleorProvider } from "@saleor/sdk"
import { useStore } from "../redux/store"
import "../styles/globals.scss"

const SALEOR_CONFIG = {
  apiUrl: process.env.API_URL,
}

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <SaleorProvider config={SALEOR_CONFIG}>
        <Component {...pageProps} />
      </SaleorProvider>
    </Provider>
  )
}
