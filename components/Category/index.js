import Head from "next/head"
import { SearchProvider } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { convertSchemaFAQ } from "../../services/convertSchemaFAQ.js"

const HeaderCategoryDynamic = dynamic(() =>
  import("../Collection/Components/HeaderCollectionComponent.js")
)
const ResultDynamic = dynamic(() =>
  import("../Collection/Components/ResultComponent.js")
)
const BackToPageBeforeDynamic = dynamic(() =>
  import("../Common/BackPageComponent/index.js")
)
const FAQDynamic = dynamic(() => import("../HomePage/FAQ"))
const TestimonialsDynamic = dynamic(() =>
  import("../HomePage/Testimonials/index")
)
const SEODynamic = dynamic(() => import("../HomePage/SEO"))

const CategoryComponent = ({
  categoryData,
  initialResponse,
  pipeline,
  testimonials,
}) => {
  const router = useRouter()
  const { meta_description, meta_title, faq, faq_title } = categoryData
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })
  return (
    <>
      <Head>
        <title>{meta_title || "Category"}</title>
        <meta
          name="description"
          content={meta_description || "No description"}
        />
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
      <SearchProvider
        search={{
          pipeline,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      >
        <HeaderCategoryDynamic
          pageHeading={
            categoryData &&
            categoryData.page_heading_1 &&
            categoryData.page_heading_1.length > 0
              ? categoryData.page_heading_1[0].text
              : "Category"
          }
        />
        <BackToPageBeforeDynamic page={router.query.collection} />
        <ResultDynamic pipeline={pipeline} initialResponse={initialResponse} />
      </SearchProvider>
      <TestimonialsDynamic testimonials={testimonials} type="category" />
      <FAQDynamic FAQ={{ faq, faq_title }} />
      <SEODynamic
        heading1={
          categoryData &&
          categoryData.page_heading_1 &&
          categoryData.page_heading_1.length > 0
            ? categoryData.page_heading_1[0].text
            : ""
        }
        pageParagraph={
          categoryData &&
          categoryData.page_paragraph &&
          categoryData.page_paragraph.length > 0
            ? categoryData.page_paragraph
            : []
        }
      />
    </>
  )
}
export default CategoryComponent
