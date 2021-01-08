import { SearchProvider } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import { Container } from "react-bootstrap"
import ShopByBrandCollectionComponent from "../Components/SBBrandCollectionComponent"
import { useRouter } from "next/router"
import { convertSchemaFAQ } from "../../../services/convertSchemaFAQ"
import Head from "next/head"

const BackToPageBeforeDynamic = dynamic(() =>
  import("../../Common/BackPageComponent")
)
const ImagedHeaderDynamic = dynamic(() =>
  import("../Components/ImagedHeaderComponent")
)
const SEODynamic = dynamic(() => import("../../HomePage/SEO"))
const FAQDynamic = dynamic(() => import("../../HomePage/FAQ"))

const BrandCollectionComponent = ({
  pipeline,
  variables,
  initialResponse,
  brandCollectionResponse,
}) => {
  const router = useRouter()
  const {
    ranges,
    categories,
    page_heading_1,
    page_paragraph,
    faq,
    faq_title,
    meta_description,
    meta_title,
  } = brandCollectionResponse
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })
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
          variables,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      >
        <ImagedHeaderDynamic
          header={
            brandCollectionResponse?.page_heading_1?.length > 0
              ? brandCollectionResponse.page_heading_1[0].text
              : "Brand Collection"
          }
          pipeline={pipeline}
          imgUrl=""
        />
      </SearchProvider>
      <div>
        <ShopByBrandCollectionComponent
          arrData={categories}
          type={"category"}
        />
        <Container>
          <div
            fluid
            style={{ height: "1px", borderBottom: "1px solid #e5e5e4" }}
          />
        </Container>
        <ShopByBrandCollectionComponent arrData={ranges} type={"brandRange"} />
      </div>
      <BackToPageBeforeDynamic
        page={router.query.brandHome}
        type="brandCollection"
      />
      <FAQDynamic FAQ={{ faq, faq_title }} />
      <SEODynamic
        Dynamic
        heading1={page_heading_1?.length > 0 ? page_heading_1[0].text : "---"}
        pageParagraph={page_paragraph}
      />
    </>
  )
}
export default BrandCollectionComponent
