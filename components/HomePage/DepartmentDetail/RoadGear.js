import { Container } from "react-bootstrap";
import styles from "./DepartmentPage.module.scss";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";
import Brand from "../Brand";

const RoadGearComponent = (props) => {
  const { department } = props;
  const { collections, shop_by_brand_slider_content } = department;
  const urlImg = department?.department_image?.url || "";
  const headingText =
    department?.page_heading_1 && department.page_heading_1.length > 0
      ? department.page_heading_1[0].text
      : "---";
  const textHide = headingText ? headingText.split(" ")[0] : "";
  const brands =
    shop_by_brand_slider_content && shop_by_brand_slider_content.length > 0
      ? shop_by_brand_slider_content
      : [];
  return (
    <div>
      <Container className={styles.departmentContainer}>
        <Row>
          <Col>
            <div className={styles.contentLeft}>
              <p className={styles.note}>HUGE RANGE</p>
              <p className={styles.heading}>{headingText}</p>
            </div>
          </Col>
          <div className={styles.contentMiddle}>{textHide}</div>
          <Col>
            <div className={styles.contentRight}>
              <Image
                src={`${urlImg}`}
                alt="Img road gear"
                width={215}
                height={215}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Container className={styles.sessionTitleCategory}>
        <Row>
          <Col xs={9} sm={8} md={8} lg={8}>
            <p className={styles.sessionTitleCategoryTextRight}>
              BROWSE BY CATEGORY
            </p>
          </Col>
          <Col style={{ textAlign: "right" }} xs={3} sm={4} md={4} lg={4}>
            <p className={styles.sessionTitleCategoryTextLeft}>VIEW ALL</p>
          </Col>
        </Row>
      </Container>
      <div className={styles.sessionListCategory}>
        {collections &&
          collections.map((collection, index) => {
            console.log("Debug code collection:", collection);
            return (
              <Container key={index}>
                <div
                  className={
                    collections.length === index + 1
                      ? styles.containerItemCategoryLasted
                      : styles.containerItemCategory
                  }
                >
                  <Row>
                    <Col
                      className={styles.categoryIndex}
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                    >
                      {index < 10 ? 0 : ""}
                      {index + 1}
                    </Col>
                    <Col
                      className={styles.categoryTitle}
                      xs={3}
                      sm={8}
                      md={9}
                      lg={9}
                    >
                      {collection.collection_title &&
                      collection.collection_title.length > 0
                        ? collection.collection_title[0].text
                        : "---"}
                    </Col>
                    <Col xs={7} sm={3} md={2} lg={2}>
                      <div className={styles.categoryLeft}>
                        <div className={styles.categoryLeftImg}>
                          <Image
                            src={`${urlImg}`}
                            alt="Img road gear"
                            width={57}
                            height={62}
                          />
                        </div>
                        <div className={styles.categoryLeftIcon}>{">"}</div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Container>
            );
          })}
      </div>
      <Brand brands={brands} />
    </div>
  );
};
export default RoadGearComponent;
