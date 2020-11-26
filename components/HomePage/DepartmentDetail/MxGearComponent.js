import Brand from "../Brand";
import SessionBrowseByCategoryComponent from "./Sesstion/SessionBrowseByCategoryComponent";
import SessionHeaderDepartmentComponent from "./Sesstion/SessionHeaderDepartmentComponent";
import SEO from "../SEO";

const MxGearComponent = (props) => {
  const { department } = props;
  const {
    collections,
    shop_by_brand_slider_content,
    page_heading_2,
    meta_title,
    page_paragraph,
    meta_description,
  } = department;

  const brands =
    shop_by_brand_slider_content && shop_by_brand_slider_content.length > 0
      ? shop_by_brand_slider_content
      : [];

  const heading1 =
    page_heading_2 && page_heading_2.length > 0
      ? page_heading_2[0].text
      : "---";
  return (
    <div>
      <SessionHeaderDepartmentComponent department={department} />
      <SessionBrowseByCategoryComponent collections={collections} />
      <Brand brands={brands} />
      <SEO heading1={heading1} pageParagraph={page_paragraph || []} />
    </div>
  );
};
export default MxGearComponent;
