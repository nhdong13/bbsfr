import Head from "next/head";
import { SearchProvider } from "@sajari/react-hooks"
import { getBrandCategoryByUid } from "../../../lib/prismic/api"
import { convertSchemaFAQ } from "../../../services/convertSchemaFAQ"
import ImagedHeaderComponent from "../Components/ImagedHeaderComponent";
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

const BrandCategoryComponent = ({
  initialResponse,
  pipeline,
  variables,
  category
}) => {
  const {
    meta_title,
    meta_description,
    faq
  } = category
  const router = useRouter()
  const jsonFAQ = convertSchemaFAQ({faq, meta_title})

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
      <SearchProvider
        search={{
          pipeline,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      >
        <ImagedHeaderComponent
          header={
            category && category.page_heading_1 && category.page_heading_1.length > 0
              ? category.page_heading_1[0].text
              : "Brand Home"
          }
          pipeline={pipeline}
          imgUrl={null}
        />

        <BackToPageBeforeDynamic page={router.query.brandCollection} />
        <ResultDynamic
          variables={variables}
          pipeline={pipeline}
          initialResponse={initialResponse}
        />
      </SearchProvider>

    </>
  )
}
export default BrandCategoryComponent
