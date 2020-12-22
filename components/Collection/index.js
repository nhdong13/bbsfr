import Head from "next/head"
import { SearchProvider } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
const SEODynamic = dynamic(() => import("../HomePage/SEO"))
const HeaderCollectionDynamic = dynamic(() =>
  import("./Components/HeaderCollectionComponent")
)
const CategoriesDynamic = dynamic(() =>
  import("./Components/CategoriesComponent")
)
const ResultDynamic = dynamic(() => import("./Components/ResultComponent"))

const CollectionComponent = ({ collections, initialResponse, pipeline }) => {
  const { meta_description, meta_title, categories } = collections
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
      <SearchProvider
        search={{
          pipeline,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      >
        <HeaderCollectionDynamic
          pipeline={pipeline}
          pageHeading={
            collections &&
            collections.page_heading_1 &&
            collections.page_heading_1.length > 0
              ? collections.page_heading_1[0].text
              : "Collections"
          }
        />
        <CategoriesDynamic
          categories={categories}
          shopByCategoryText={
            collections.shop_by_category_text != undefined &&
            collections.shop_by_category_text.length
              ? collections.shop_by_category_text[0].text
              : "List Category"
          }
        />

        <ResultDynamic pipeline={pipeline} initialResponse={initialResponse} />
      </SearchProvider>

      <SEODynamic
        heading1={
          collections &&
          collections.page_heading_1 &&
          collections.page_heading_1.length > 0
            ? collections.page_heading_1[0].text
            : ""
        }
        pageParagraph={
          collections &&
          collections.page_paragraph &&
          collections.page_paragraph.length > 0
            ? collections.page_paragraph
            : []
        }
      />
    </>
  )
}

export default CollectionComponent
