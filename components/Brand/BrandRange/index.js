import { SearchProvider } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import ImagedHeaderComponent from "../Components/ImagedHeaderComponent"
import Head from "next/head"
import { convertSchemaFAQ } from "../../../services/convertSchemaFAQ"
import { useRouter } from "next/router"

const SEODynamic = dynamic(() => import("../../HomePage/SEO"))
const FAQDynamic = dynamic(() => import("../../HomePage/FAQ"))
const TestimonialsDynamic = dynamic(() => import("../../HomePage/Testimonials"))
const BackToPageBeforeDynamic = dynamic(() =>
  import("../../Common/BackPageComponent/index.js")
)
const ResultDynamic = dynamic(() =>
  import("../../Collection/Components/ResultComponent")
)
const BrandRangeComponent = ({
  initialResponse,
  pipeline,
  variables,
  brandRange,
  testimonials,
}) => {
  const {
    meta_description,
    meta_title,
    faq,
    faq_title,
    brand_hero_image,
  } = brandRange
  const router = useRouter()
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })
  const heading1 =
    brandRange &&
    brandRange.page_heading_1 &&
    brandRange.page_heading_1.length > 0
      ? brandRange.page_heading_1[0].text
      : "Brand"

  return (
    <>
      <Head>
        <title>{meta_title || "Home"}</title>
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
      <SearchProvider
        search={{
          pipeline,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      >
        <ImagedHeaderComponent
          header={heading1}
          pipeline={pipeline}
          imgUrl={brand_hero_image?.url}
        />

        <BackToPageBeforeDynamic page={router.query.brandCollection} />
        <ResultDynamic
          variables={variables}
          pipeline={pipeline}
          initialResponse={initialResponse}
        />
      </SearchProvider>

      <TestimonialsDynamic testimonials={testimonials} type="home" />
      <FAQDynamic FAQ={{ faq, faq_title }} />
      <SEODynamic
        heading1={heading1}
        pageParagraph={
          brandRange &&
          brandRange.page_paragraph &&
          brandRange.page_paragraph.length > 0
            ? brandRange.page_paragraph
            : []
        }
      />
    </>
  )
}
export default BrandRangeComponent
