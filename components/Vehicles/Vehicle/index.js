import dynamic from "next/dynamic"
import Head from "next/head"
import { convertSchemaFAQ } from "../../../services/convertSchemaFAQ"
import ImagedHeaderComponent from "../../Brand/Components/ImagedHeaderComponent"
import ListCategoriesComponent from "../../Collection/Components/ListCategoriesComponent"
import BackToPageBeforeComponent from "../../Common/BackPageComponent"
import styles from "../Vehicles.module.scss"

const ResultDynamic = dynamic(() =>
  import("../../Collection/Components/ResultComponent")
)
const FAQDynamic = dynamic(() => import("../../HomePage/FAQ"))
const SEODynamic = dynamic(() => import("../../HomePage/SEO"))
const TestimonialsDynamic = dynamic(() =>
  import("../../HomePage/Testimonials/index")
)

const VehicleComponent = ({ vehicle, testimonials }) => {
  const {
    page_heading_1,
    page_heading_2,
    faq,
    faq_title,
    meta_title,
    page_paragraph,
    meta_description,
    collections,
  } = vehicle
  const heading1 =
    page_heading_1 && page_heading_1.length > 0 && page_heading_1[0].text
      ? page_heading_1[0].text
      : "---"
  const heading2 =
    page_heading_2 && page_heading_2.length > 0 && page_heading_2[0].text
      ? page_heading_2[0].text
      : "---"
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })
  const mappedCollection = collections.map((collection) => {
    return {
      category_title: collection.collection_title,
      category_slug: `/${collection.collection_slug}`,
    }
  })
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
      <ImagedHeaderComponent header={heading1} />
      <div className={styles.shopByText}>
        {vehicle.shop_by_category_text != undefined &&
        vehicle.shop_by_category_text.length
          ? vehicle.shop_by_category_text[0].text
          : "Shop by Category"}
      </div>
      <ListCategoriesComponent categories={mappedCollection} type="vehicle" />
      <BackToPageBeforeComponent page="All Vehicles" type="vehicle" />
      <ResultDynamic />
      <TestimonialsDynamic
        testimonials={testimonials}
        type="vehicle directory"
      />
      <FAQDynamic FAQ={{ faq, faq_title }} />
      <SEODynamic heading1={heading2} pageParagraph={page_paragraph || []} />
    </>
  )
}
export default VehicleComponent