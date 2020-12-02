import ResultComponent from "./Components/ResultComponent";

const isServer = () => typeof window === "undefined";
const CollectionComponent = (props) => {
  return <>{!isServer() && <ResultComponent />}</>;
};

export default CollectionComponent;
