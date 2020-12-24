import Head from "next/head"
import { SearchProvider } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"

const HeaderCategoryDynamic = dynamic(() =>
  import("../Collection/Components/HeaderCollectionComponent.js")
)
const ResultDynamic = dynamic(() =>
  import("../Collection/Components/ResultComponent.js")
)
const BackToPageBeforeDynamic = dynamic(() =>
  import("../Common/BackPageComponent/index.js")
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
        <BackToPageBeforeDynamic page={router.query.collection} />
        <ResultDynamic pipeline={pipeline} initialResponse={initialResponse} />
      </SearchProvider>
    </>
  )
}
export default CategoryComponent
