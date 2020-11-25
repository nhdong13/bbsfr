import styles from "./DepartmentPage.module.scss";
import Image from "next/image";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import Brand from "../Brand";

const AccessoriesComponent = (props) => {
  const { department } = props;
  const { collections, shop_by_brand_slider_content } = department;
  const urlImg =
    department?.department_image?.url ||
    "https://images.prismic.io/slicemachine-blank/6b2bf485-aa12-44ef-8f06-dce6b91b9309_dancing.png?auto=compress,format";

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
              <p className={styles.note}>Huge Range</p>
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

      {/* ss search */}
      <Container
        className={`${styles.sessionSearch} ${styles.sessionSearchForAccessories}`}
      >
        <div style={{ alignItems: "center", textAlign: "center" }}>
          <p className={styles.sessionSearchTitle}>SEARCH</p>
          <div className={styles.sessionSearchText}>
            <Form>
              <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                <Form.Control as="select" size="lg" custom>
                  <option value="0">Manufacturer</option>
                  <option>1</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                <Form.Control as="select" size="lg" custom>
                  <option value="0">Model</option>
                  <option>1</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                <Form.Control as="select" size="lg" custom>
                  <option value="0">Year</option>
                  <option>1</option>
                </Form.Control>
              </Form.Group>

              <Button
                className={styles.sessionSearchButtonSubmit}
                variant="primary"
                size="lg"
                block
              >
                Search parts
              </Button>
            </Form>
          </div>
        </div>
      </Container>

      {/* Category */}
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
            return (
              <Container>
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
export default AccessoriesComponent;
