import { SearchProvider } from "@sajari/react-hooks"
import dynamic from "next/dynamic"
import { Container } from "react-bootstrap"
import ShopByBrandCollectionComponent from "../Components/SBBrandCollectionComponent"
import { useRouter } from "next/router"

const BackToPageBeforeDynamic = dynamic(() =>
  import("../../Common/BackPageComponent")
)
const ImagedHeaderDynamic = dynamic(() =>
  import("../Components/ImagedHeaderComponent")
)

const BrandCollectionComponent = ({
  pipeline,
  variables,
  initialResponse,
  brandCollectionResponse,
}) => {
  const router = useRouter()
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
        <ImagedHeaderDynamic
          header={
            brandCollectionResponse?.page_heading_1?.length > 0
              ? brandCollectionResponse.page_heading_1[0].text
              : "Brand Collection"
          }
          pipeline={pipeline}
          imgUrl=""
        />
      </SearchProvider>
      <div>
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
        <ShopByBrandCollectionComponent arrData={ranges} type={"brandRange"} />
      </div>
      <BackToPageBeforeDynamic
        page={router.query.brandHome}
        type="brandCollection"
      />
    </>
  )
}
export default BrandCollectionComponent
