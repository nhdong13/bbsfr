import Head from "next/head"
import { SearchProvider } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import BackToPageBeforeComponent from "../Common/BackPageComponent/index.js"

const HeaderCategoryDynamic = dynamic(() =>
  import("../Collection/Components/HeaderCollectionComponent.js")
)

const CategoryComponent = ({ categoryData, initialResponse, pipeline }) => {
  const router = useRouter()
  const { meta_description, meta_title } = categoryData
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
      </Head>
      <SearchProvider
        search={{
          pipeline,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      >
        <HeaderCategoryDynamic
          pipeline={pipeline}
          pageHeading={
            categoryData &&
            categoryData.page_heading_1 &&
            categoryData.page_heading_1.length > 0
              ? categoryData.page_heading_1[0].text
              : "Category"
          }
        />
      </SearchProvider>
      <BackToPageBeforeComponent page={router.query.collection} />
    </>
  )
}
export default CategoryComponent
