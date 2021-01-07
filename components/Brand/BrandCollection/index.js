import { SearchProvider } from "@sajari/react-hooks"
import ImagedHeaderComponent from "../Components/ImagedHeaderComponent"
const BrandCollectionComponent = ({
  pipeline,
  variables,
  initialResponse,
  brandCollectionResponse,
}) => {
  return (
    <>
      <SearchProvider
        search={{
          pipeline,
          variables,
        }}
        initialResponse={initialResponse}
        searchOnLoad={!initialResponse}
      >
        <ImagedHeaderComponent
          header={
            brandCollectionResponse?.page_heading_1?.length > 0
              ? brandCollectionResponse.page_heading_1[0].text
              : "Brand Collection"
          }
          pipeline={pipeline}
          imgUrl=""
        />
      </SearchProvider>
    </>
  )
}
export default BrandCollectionComponent
