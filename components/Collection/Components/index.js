import {
  Pipeline,
  Results,
  SearchProvider,
  Variables,
} from "@sajari/react-search-ui"
import CategoriesComponent from "./CategoriesComponent"
import HeaderCollectionComponent from "./HeaderCollectionComponent"
import ResultComponent from "./ResultComponent"
import ShortFilterComponent from "./ShortFilterComponent"
import SEOComponent from "../../HomePage/SEO/index"

const SessionComponents = ({ collections }) => {
  const {
    page_heading_1,
    page_paragraph,
    categories,
    shop_by_category_text,
  } = collections

  const pipeline = new Pipeline(
    {
      account: process.env.NEXT_PUBLIC_ACCOUNT_SAJARI,
      collection: "jackets-app",
    },
    "app"
  )

  return (
    <>
      <HeaderCollectionComponent
        pipeline={pipeline}
        pageHeading={
          collections &&
          collections.page_heading_1 &&
          collections.page_heading_1.length > 0
            ? collections.page_heading_1[0].text
            : "Collections"
        }
      />
      <CategoriesComponent
        pipeline={pipeline}
        categories={categories}
        shopByCategoryText={
          shop_by_category_text != undefined && shop_by_category_text.length
            ? shop_by_category_text[0].text
            : "List Category"
        }
      />
      <ShortFilterComponent pipeline={pipeline} />
      <SEOComponent
        heading1={
          page_heading_1 && page_heading_1.length > 0
            ? page_heading_1[0].text
            : ""
        }
        pageParagraph={
          page_paragraph && page_paragraph.length > 0 ? page_paragraph : []
        }
      />
    </>
  )
}

export default SessionComponents
