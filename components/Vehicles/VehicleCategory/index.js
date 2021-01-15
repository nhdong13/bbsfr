import { SearchProvider } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import Head from "next/head"
import { convertSchemaFAQ } from "../../../services/convertSchemaFAQ"
import BackToPageBeforeComponent from "../../Common/BackPageComponent"
import ImagedHeaderComponent from "../../Brand/Components/ImagedHeaderComponent"
import { useRouter } from "next/router"

const ResultDynamic = dynamic(() =>
  import("../../Collection/Components/ResultComponent")
)
const FAQDynamic = dynamic(() => import("../../HomePage/FAQ"))
const SEODynamic = dynamic(() => import("../../HomePage/SEO"))
const TestimonialsDynamic = dynamic(() =>
  import("../../HomePage/Testimonials/index")
)

const VehicleCategoryComponent = ({
  vehicleCategory,
  testimonials,
  pipeline,
  variables,
  initialResponse,
}) => {
  const {
    page_heading_1,
    page_heading_2,
    faq,
    faq_title,
    meta_title,
    page_paragraph,
    meta_description,
  } = vehicleCategory
  const heading1 =
    page_heading_1 && page_heading_1.length > 0 && page_heading_1[0].text
      ? page_heading_1[0].text
      : "---"
  const heading2 =
    page_heading_2 && page_heading_2.length > 0 && page_heading_2[0].text
      ? page_heading_2[0].text
      : "---"
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{meta_title || "Vehicle"}</title>
        <meta name="description" content={meta_description} />
        <meta
          name="og:description"
          property="og:description"
          content={meta_description}
        />
        <meta
          name="og:title"
          property="og:title"
          content={meta_title || "Vehicle"}
        />
        <meta name="twitter:title" content={meta_title || "Vehicle"} />
        <meta name="twitter:description" content={meta_description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonFAQ }}
        />
      </Head>
      <SearchProvider
        search={{
          pipeline,
          variables,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      >
        <ImagedHeaderComponent header={heading1} />

        <BackToPageBeforeComponent
          page={router?.query?.vehicleCollection}
          type="vehicle"
        />

        <ResultDynamic
          variables={variables}
          pipeline={pipeline}
          initialResponse={initialResponse}
        />
      </SearchProvider>
      <TestimonialsDynamic
        testimonials={testimonials}
        type="vehicle directory"
      />
      <FAQDynamic FAQ={{ faq, faq_title }} />
      <SEODynamic heading1={heading2} pageParagraph={page_paragraph || []} />
    </>
  )
}
export default VehicleCategoryComponent
