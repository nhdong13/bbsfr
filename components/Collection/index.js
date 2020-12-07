import ResultComponent from "./Components/ResultComponent"
import HeaderCollectionComponent from "./Components/HeaderCollectionComponent"
import CategoriesComponent from "./Components/CategoriesComponent"

const isServer = () => typeof window === "undefined"
const CollectionComponent = ({ collections }) => {
  return (
    <>
      {!isServer() && (
        <div>
          <HeaderCollectionComponent
            pageHeading={collections.page_heading_1[0].text}
          />
          <CategoriesComponent
            categories={collections.categories}
            shopByCategoryText={collections.shop_by_category_text[0].text}
          />
          <ResultComponent />
        </div>
      )}
    </>
  )
}

export default CollectionComponent
