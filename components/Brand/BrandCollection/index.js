import { SearchProvider } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import { Container } from "react-bootstrap"
import ImagedHeaderComponent from "../Components/ImagedHeaderComponent"
import ShopByBrandCollectionComponent from "../Components/SBBrandCollectionComponent"

const BrandCollectionComponent = ({
  pipeline,
  variables,
  initialResponse,
  brandCollectionResponse,
}) => {
  const { ranges, categories } = brandCollectionResponse
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
      <div style={{ borderBottom: "1px solid #e5e5e4" }}>
        <ShopByBrandCollectionComponent
          arrData={categories}
          type={"category"}
        />
        <Container>
          <div
            fluid
            style={{ height: "1px", borderBottom: "1px solid #e5e5e4" }}
          />
        </Container>
        <ShopByBrandCollectionComponent arrData={ranges} type={"range"} />
      </div>
    </>
  )
}
export default BrandCollectionComponent
