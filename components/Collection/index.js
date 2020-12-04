import ResultComponent from "./Components/ResultComponent"
import HeaderCollectionComponent from "./Components/HeaderCollectionComponent"
const isServer = () => typeof window === "undefined"
const CollectionComponent = ({ collections }) => {
  return (
    <>
      {!isServer() && (
        <HeaderCollectionComponent
          pageHeading={collections.page_heading_1[0].text}
        />
      )}
      {!isServer() && <ResultComponent />}
    </>
  )
}

export default CollectionComponent
