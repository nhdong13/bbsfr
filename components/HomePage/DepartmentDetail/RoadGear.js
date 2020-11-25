import Brand from "../Brand";
import SessionHeaderDepartmentComponent from "./Sesstion/SessionHeaderDepartmentComponent";
import SessionBrowseByCategoryComponent from "./Sesstion/SessionBrowseByCategoryComponent";

const RoadGearComponent = (props) => {
  const { department } = props;
  const { collections, shop_by_brand_slider_content } = department;
  const brands =
    shop_by_brand_slider_content && shop_by_brand_slider_content.length > 0
      ? shop_by_brand_slider_content
      : [];
  return (
    <div>
      <SessionHeaderDepartmentComponent props={department} />
      <SessionBrowseByCategoryComponent props={collections} />
      <Brand brands={brands} />
    </div>
  );
};
export default RoadGearComponent;
