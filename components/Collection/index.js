
import { Pipeline } from "@sajari/react-search-ui"
import Head from "next/head"
import CategoriesComponent from "./Components/CategoriesComponent"
import HeaderCollectionComponent from "./Components/HeaderCollectionComponent"
import ResultComponent from "./Components/ResultComponent"
import SEOComponent from "../HomePage/SEO/index"
const isServer = () => typeof window === "undefined"
const CollectionComponent = ({ collections }) => {
  const {
    meta_description,
    meta_title,
    page_heading_1,
    page_paragraph,
    categories,
    shop_by_category_text,
  } = collections

  const pipeline = new Pipeline(
    {
      account: process.env.NEXT_PUBLIC_ACCOUNT_SAJARI,
      collection: "jackets-app",
    },
    "app"
  )
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

      <HeaderCollectionComponent
        pipeline={pipeline}
        pageHeading={
          collections &&
          collections.page_heading_1 &&
          collections.page_heading_1.length > 0
            ? collections.page_heading_1[0].text
            : "Collections"
        }
      />
      <CategoriesComponent
        pipeline={pipeline}
        categories={categories}
        shopByCategoryText={
          shop_by_category_text != undefined && shop_by_category_text.length
            ? shop_by_category_text[0].text
            : "List Category"
        }
      />
      <ResultComponent pipeline={pipeline} />
      <SEOComponent
        heading1={
          page_heading_1 && page_heading_1.length > 0
            ? page_heading_1[0].text
            : ""
        }
        pageParagraph={
          page_paragraph && page_paragraph.length > 0 ? page_paragraph : []
        }
      />
    </>
  )
}

export default CollectionComponent
