import dynamic from "next/dynamic"
import Head from "next/head"
import { convertSchemaFAQ } from "../../services/convertSchemaFAQ"
const BrandListDynamic = dynamic(() =>
  import("./Components/BrandListComponent")
)
const SearchBrandIndexDynamic = dynamic(() =>
  import("./Components/SearchBrandIndexComponent")
)
const HeaderBrandIndexDynamic = dynamic(() =>
  import("./Components/HeaderBrandIndexComponent")
)
const FAQDynamic = dynamic(() => import("../HomePage/FAQ"))
const SEODynamic = dynamic(() => import("../HomePage/SEO"))
const TestimonialsDynamic = dynamic(() =>
  import("../HomePage/Testimonials/index")
)

const BrandComponent = ({ brandDirectory, brands, testimonials }) => {
  const {
    page_heading_1,
    page_heading_2,
    faq,
    faq_title,
    meta_title,
    page_paragraph,
    meta_description,
  } = brandDirectory
  const title =
    page_heading_1 && page_heading_1.length > 0 && page_heading_1[0].text
      ? page_heading_1[0].text
      : "---"
  const titleSeo = page_heading_2.length > 0 ? page_heading_2[0].text : ""
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })

  return (
    <>
      <Head>
        <title>{meta_title || "Brand Directory"}</title>
        <meta name="description" content={meta_description} />
        <meta
          name="og:description"
          property="og:description"
          content={meta_description}
        />
        <meta
          name="og:title"
          property="og:title"
          content={meta_title || "Brand Directory"}
        />
        <meta name="twitter:title" content={meta_title || "Brand Directory"} />
        <meta name="twitter:description" content={meta_description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonFAQ }}
        />
      </Head>
      <HeaderBrandIndexDynamic title={title} />
      <SearchBrandIndexDynamic />
      <div style={{ marginTop: "145px" }}>
        <BrandListDynamic brands={brands} />
      </div>
      <TestimonialsDynamic testimonials={testimonials} type="brand-directory" />
      <FAQDynamic FAQ={{ faq, faq_title }} />
      <SEODynamic heading1={titleSeo} pageParagraph={page_paragraph || []} />
    </>
  )
}
export default BrandComponent
