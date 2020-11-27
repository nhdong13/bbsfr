import Brand from "../Brand";
import SessionHeaderDepartmentComponent from "./Sesstion/SessionHeaderDepartmentComponent";
import SessionBrowseByCategoryComponent from "./Sesstion/SessionBrowseByCategoryComponent";
import SEO from "../SEO";
import FAQComponent from "../FAQ";
import { useRouter } from "next/router";
import SearchForAccessoriesComponent from "./Sesstion/SearchForAccessoriesComponent";

const DepartmentDetailComponent = (props) => {
  const { department } = props;
  const router = useRouter();
  const {
    collections,
    shop_by_brand_slider_content,
    page_heading_2,
    meta_title,
    page_paragraph,
    meta_description,
    faq,
    faq_title,
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
      {router?.query?.id === "accessories" ? (
        <SearchForAccessoriesComponent />
      ) : (
        <></>
      )}
      <SessionBrowseByCategoryComponent collections={collections} />
      <Brand brands={brands} />
      <FAQComponent FAQ={{ faq, faq_title }} />
      <SEO heading1={heading1} pageParagraph={page_paragraph || []} />
    </div>
  );
};
export default DepartmentDetailComponent;
