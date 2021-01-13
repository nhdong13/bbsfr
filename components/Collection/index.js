import Head from "next/head"
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
  testimonials,
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
      <HeaderCollectionDynamic
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
      <ResultDynamic />
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
    </>
  )
}

export default CollectionComponent
