import Head from "next/head"
// import { SearchProvider } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import { convertSchemaFAQ } from "../../services/convertSchemaFAQ"
const SEODynamic = dynamic(() => import("../HomePage/SEO"))
const HeaderCollectionDynamic = dynamic(() =>
  import("./Components/HeaderCollectionComponent")
)
const CategoriesDynamic = dynamic(() =>
  import("./Components/CategoriesComponent")
)
const FAQDynamic = dynamic(() => import("../HomePage/FAQ"))
const ResultDynamic = dynamic(() => import("./Components/ResultComponent"))
const TestimonialsDynamic = dynamic(() =>
  import("../HomePage/Testimonials/index")
)

const CollectionComponent = ({
  collections,
  initialResponse,
  pipeline,
  testimonials,
  variables,
  filter,
}) => {
  const {
    meta_description,
    meta_title,
    categories,
    faq,
    faq_title,
  } = collections
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })

  return (
    <>
      <Head>
        <title>{meta_title || "Collection"}</title>
        <meta name="description" content={meta_description} />
        <meta
          name="og:description"
          property="og:description"
          content={meta_description}
        />
        <meta name="og:title" property="og:title" content={meta_title} />
        <meta name="twitter:title" content={meta_title} />
        <meta name="twitter:description" content={meta_description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonFAQ }}
        />
      </Head>
      {/* <SearchProvider
        search={{
          pipeline,
          // variables,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
        defaultFilter={filter}
        customClassNames={{
          filter: {
            // pagination: {
            //   container: "containerPagination",
            //   button: "buttonPagination",
            //   active: "activePagination",
            //   next: "nextPagination",
            //   prev: "prevPagination",
            //   spacerEllipsis: "spacerEllipsisPagination",
            // },
            resetButton: "resetButtonFilter",
            list: {
              container: "listContainerFilter",
              checkboxGroup: "checkboxGroupFilter",
              searchFilter: "searchFilter",
              toggleButton: "toggleButtonFilter",
            },
          },
        }}
      > */}
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
        <ResultDynamic
          variables={variables}
          pipeline={pipeline}
          initialResponse={initialResponse}
          filter={filter}
        />
        <TestimonialsDynamic testimonials={testimonials} type="collection" />
        <FAQDynamic FAQ={{ faq, faq_title }} />
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
      {/* </SearchProvider> */}
    </>
  )
}

export default CollectionComponent
