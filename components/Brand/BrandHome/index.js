import dynamic from "next/dynamic"
import ImagedHeaderComponent from "../Components/ImagedHeaderComponent"
import SessionBrowseByCategoryComponent from "../../DepartmentDetail/Sesstion/SessionBrowseByCategoryComponent"
import Head from "next/head"
import { convertSchemaFAQ } from "../../../services/convertSchemaFAQ"

const SEODynamic = dynamic(() => import("../../HomePage/SEO"))
const FAQDynamic = dynamic(() => import("../../HomePage/FAQ"))
const TestimonialsDynamic = dynamic(() => import("../../HomePage/Testimonials"))
const BackToPageBeforeDynamic = dynamic(() =>
  import("../../Common/BackPageComponent")
)

const BrandHomeComponent = ({ brand, testimonials }) => {
  const { meta_title, faq, faq_title, brand_hero_image } = brand
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })
  const heading1 =
    brand && brand.page_heading_1 && brand.page_heading_1.length > 0
      ? brand.page_heading_1[0].text
      : "Brand"
  const heading2 =
    brand && brand.page_heading_2 && brand.page_heading_2.length > 0
      ? brand.page_heading_2[0].text
      : "Brand"
  const collections = brand?.brand_collections
    .map((i) => ({
      collection_image: i.brand_collection_image,
      collection_title: i.brand_collection_title,
      collection_slug: i.brand_collection_slug,
    }))
    .filter((i) => i.collection_title)

  return (
    <>
      <Head>
        <title>{meta_title || "Home"}</title>
        <meta name="description" content={brand?.meta_description || ""} />
        <meta
          name="og:description"
          property="og:description"
          content={meta_description || ""}
        />
        <meta name="og:title" property="og:title" content={brand?.meta_title} />
        <meta name="twitter:title" content={meta_title} />
        <meta
          name="twitter:description"
          content={brand?.meta_description || ""}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonFAQ }}
        />
      </Head>
      <ImagedHeaderComponent
        header={heading1}
        imgUrl={brand_hero_image?.url}
        notShowProductCount={true}
      />
      <BackToPageBeforeDynamic page={"All brands"} type="brandHome" />
      <SessionBrowseByCategoryComponent
        departmentSlug={brand._meta.uid}
        collections={collections}
        disableTitleContainer={false}
        disableViewAllBtn={true}
      />
      {/* <BestSellerComponent products={[]} brandHeading={heading1} /> */}
      <TestimonialsDynamic testimonials={testimonials} type="brand" />
      <FAQDynamic FAQ={{ faq, faq_title }} />
      <SEODynamic
        heading1={heading2}
        pageParagraph={
          brand && brand.page_paragraph && brand.page_paragraph.length > 0
            ? brand.page_paragraph
            : []
        }
      />
    </>
  )
}
export default BrandHomeComponent
