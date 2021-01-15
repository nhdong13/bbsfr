import Head from "next/head"
import { convertSchemaFAQ } from "../../../services/convertSchemaFAQ"
import ImagedHeaderComponent from "../Components/ImagedHeaderComponent"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
const SEODynamic = dynamic(() => import("../../HomePage/SEO"))
const FAQDynamic = dynamic(() => import("../../HomePage/FAQ"))
const TestimonialsDynamic = dynamic(() => import("../../HomePage/Testimonials"))
const BackToPageBeforeDynamic = dynamic(() =>
  import("../../Common/BackPageComponent/index.js")
)
const ResultDynamic = dynamic(() =>
  import("../../Collection/Components/ResultComponent")
)

const BrandCategoryComponent = ({ category, testimonials }) => {
  const {
    meta_title,
    meta_description,
    faq,
    faq_title,
    page_heading_2,
  } = category
  const router = useRouter()
  const jsonFAQ = convertSchemaFAQ({ faq, meta_title })
  const titleHeader =
    category && category.page_heading_1 && category.page_heading_1.length > 0
      ? category.page_heading_1[0].text
      : "Brand Category"
  const titleSeo =
    page_heading_2?.length > 0 && page_heading_2[0].text
      ? page_heading_2[0].text
      : ""  
  return (
    <>
      <Head>
        <title>{meta_title || "Brand category"}</title>
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
      <ImagedHeaderComponent header={titleHeader} imgUrl={null} />
      <BackToPageBeforeDynamic
        page={router.query.brandCollection}
        type="brandCategory"
      />
      <ResultDynamic />
      <TestimonialsDynamic testimonials={testimonials} type="brand-category" />
      <FAQDynamic FAQ={{ faq, faq_title }} />
      <SEODynamic
        heading1={titleSeo}
        pageParagraph={
          category &&
          category.page_paragraph &&
          category.page_paragraph.length > 0
            ? category.page_paragraph
            : []
        }
      />
    </>
  )
}
export default BrandCategoryComponent
