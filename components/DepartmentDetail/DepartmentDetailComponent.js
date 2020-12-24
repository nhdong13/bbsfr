import { useRouter } from "next/router"
import Head from "next/head"
import { convertSchemaFAQ } from "../../services/convertSchemaFAQ"
import dynamic from "next/dynamic"

const SessionHeaderDepartmentDynamic = dynamic(() =>
  import("./Sesstion/SessionHeaderDepartmentComponent")
)
const SessionBrowseByCategoryDynamic = dynamic(() =>
  import("./Sesstion/SessionBrowseByCategoryComponent")
)
const SearchForAccessoriesDynamic = dynamic(() =>
  import("./Sesstion/SearchForAccessoriesComponent")
)
const BrandDynamic = dynamic(() => import("../HomePage/Brand"))
const TestimonialsDynamic = dynamic(() =>
  import("../HomePage/Testimonials/index")
)
const FAQDynamic = dynamic(() => import("../HomePage/FAQ"))
const SEODynamic = dynamic(() => import("../HomePage/SEO"))

const DepartmentDetailComponent = (props) => {
  const { department, testimonials } = props
  const router = useRouter()
  const {
    collections,
    shop_by_brand_slider_content,
    page_heading_2,
    meta_title,
    page_paragraph,
    meta_description,
    faq,
    faq_title,
  } = department

  const brands =
    shop_by_brand_slider_content && shop_by_brand_slider_content.length > 0
      ? shop_by_brand_slider_content
      : []

  const heading1 =
    page_heading_2 && page_heading_2.length > 0 ? page_heading_2[0].text : "---"
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonFAQ }}
        />
      </Head>
      <div>
        <SessionHeaderDepartmentDynamic department={department} />
        {router?.query?.id === "accessories" ? (
          <SearchForAccessoriesDynamic />
        ) : (
          <></>
        )}
        <SessionBrowseByCategoryDynamic collections={collections} />
        <BrandDynamic brands={brands} />
        <TestimonialsDynamic testimonials={testimonials} type="department" />
        <FAQDynamic FAQ={{ faq, faq_title }} />
        <SEODynamic heading1={heading1} pageParagraph={page_paragraph || []} />
      </div>
    </>
  )
}
export default DepartmentDetailComponent
