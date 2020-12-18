export const getConfigPipeline = (collection) => {
  const config = {
    account: process.env.NEXT_PUBLIC_ACCOUNT_SAJARI,
    key: process.env.KEY_ID_SAJARI,
    secret: process.env.KEY_SECRET_SAJARI,
    collection,
  }
  return config
}
