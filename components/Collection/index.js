
import Head from "next/head"
import SessionComponents from "./Components"

const isServer = () => typeof window === "undefined"
const CollectionComponent = ({ collections }) => {
  const { meta_description, meta_title } = collections
  return (
    <>
      <Head>
        <title>{meta_title}</title>
        <meta name="description" content={meta_description} />
        <meta
          name="og:description"
          property="og:description"
          content={meta_description}
        />
        <meta name="og:title" property="og:title" content={meta_title} />
        <meta name="twitter:title" content={meta_title} />
        <meta name="twitter:description" content={meta_description} />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonFAQ }}
        /> */}
      </Head>
      <SessionComponents collections={collections} />
    </>
  )
}

export default CollectionComponent
