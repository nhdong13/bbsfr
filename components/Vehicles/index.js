import dynamic from "next/dynamic"
import Head from "next/head"
import { convertSchemaFAQ } from "../../services/convertSchemaFAQ"
import { generateMotorcyclesGroup } from "../../services/vehicle"
import styles from "./Vehicles.module.scss"

const SearchIndexDynamic = dynamic(() =>
  import("./Components/SearchVehiclesIndexComponent")
)
const HeaderIndexDynamic = dynamic(() =>
  import("./Components/HeaderVehiclesIndexComponent")
)

const FAQDynamic = dynamic(() => import("../HomePage/FAQ"))
const SEODynamic = dynamic(() => import("../HomePage/SEO"))
const TestimonialsDynamic = dynamic(() =>
  import("../HomePage/Testimonials/index")
)
const VehicleDynamic = dynamic(() =>
  import("./Components/MakeGroupedComponent")
)

const VehiclesComponent = ({ vehiclesDirectory, vehicles, testimonials }) => {
  const {
    page_heading_1,
    page_heading_2,
    faq,
    faq_title,
    meta_title,
    page_paragraph,
    meta_description,
  } = vehiclesDirectory
  const title =
    page_heading_1 && page_heading_1.length > 0 && page_heading_1[0].text
      ? page_heading_1[0].text
      : "---"
  const titleSeo =
    page_heading_2?.length > 0 && page_heading_2[0].text
      ? page_heading_2[0].text
      : ""
  const jsonFAQ = convertSchemaFAQ({ faq, faq_title })
  const generatedData = generateMotorcyclesGroup(vehicles)
  return (
    <>
      <Head>
        <title>{meta_title || "Vehicle Directory"}</title>
        <meta name="description" content={meta_description} />
        <meta
          name="og:description"
          property="og:description"
          content={meta_description}
        />
        <meta
          name="og:title"
          property="og:title"
          content={meta_title || "Vehicle Directory"}
        />
        <meta
          name="twitter:title"
          content={meta_title || "Vehicle Directory"}
        />
        <meta name="twitter:description" content={meta_description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonFAQ }}
        />
      </Head>
      <HeaderIndexDynamic title={title} />
      <SearchIndexDynamic />

      <div className={styles.vehicleListContainer}>
        <p className={styles.vehicleListHeader}>OR SELECT USING THE BELOW</p>
        <div className={styles.vehicleList}>
          {Object.keys(generatedData).map((key, i, arr) => (
            <VehicleDynamic
              key={`motorcycle-make-${i}`}
              title={key}
              vehicle={generatedData[key]}
              noBorder={arr.length - 1 === i ? true : false}
            />
          ))}
        </div>
      </div>

      <TestimonialsDynamic
        testimonials={testimonials}
        type="vehicle directory"
      />
      <FAQDynamic FAQ={{ faq, faq_title }} />
      <SEODynamic heading1={titleSeo} pageParagraph={page_paragraph || []} />
    </>
  )
}
export default VehiclesComponent
