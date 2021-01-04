import BrandListComponent from "./Components/BrandListComponent"
import HeaderBrandIndexComponent from "./Components/HeaderBrandIndexComponent"
import SearchBrandIndexComponent from "./Components/SearchBrandIndexComponent"

const BrandComponent = ({ brandDirectory, brands }) => {
  const { page_heading_1 } = brandDirectory
  const title =
    page_heading_1 && page_heading_1.length > 0 && page_heading_1[0].text
      ? page_heading_1[0].text
      : "---"
  return (
    <>
      <HeaderBrandIndexComponent title={title} />
      <SearchBrandIndexComponent />
      <div style={{ marginTop: "145px" }}>
        <BrandListComponent brands={brands} />
      </div>
    </>
  )
}
export default BrandComponent
