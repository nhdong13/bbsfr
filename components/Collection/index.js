import ResultComponent from "./Components/ResultComponent"
import HeaderCollectionComponent from "./Components/HeaderCollectionComponent"

const isServer = () => typeof window === "undefined"
const CollectionComponent = ({ collections }) => {
  console.log(collections)
  return (
    <>
      <HeaderCollectionComponent />
      {!isServer() && <ResultComponent />}
    </>
  );
}

export default CollectionComponent
