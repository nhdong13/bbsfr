import HeaderBrandIndexComponent from "./Components/HeaderBrandIndexComponent"
import SearchBrandIndexComponent from "./Components/SearchBrandIndexComponent"

const BrandComponent = ({ brandDirectory }) => {
  const { page_heading_1 } = brandDirectory
  const title =
    page_heading_1 && page_heading_1.length > 0 && page_heading_1[0].text
      ? page_heading_1[0].text
      : "---"
  return (
    <>
      <HeaderBrandIndexComponent title={title} />
      <SearchBrandIndexComponent />
    </>
  )
}
export default BrandComponent
