export const getConfigPipeline = (collection) => {
  const config = {
    account: process.env.NEXT_PUBLIC_ACCOUNT_SAJARI,
    endpoint: "https://jsonapi-us-valkyrie.sajari.net",
    collection,
  }
  if (typeof window === "undefined") {
    return {
      ...config,
      key: process.env.KEY_ID_SAJARI,
      secret: process.env.KEY_SECRET_SAJARI,
    }
  }
  return config
}
