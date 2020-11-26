import styles from "./DepartmentPage.module.scss";
import { Button, Container, Form } from "react-bootstrap";
import Brand from "../Brand";
import SessionBrowseByCategoryComponent from "./Sesstion/SessionBrowseByCategoryComponent";
import SessionHeaderDepartmentComponent from "./Sesstion/SessionHeaderDepartmentComponent";
import SEO from "../SEO";

const AccessoriesComponent = (props) => {
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
      <SessionBrowseByCategoryComponent props={collections} />
      <Brand brands={brands} />
      <SEO heading1={heading1} pageParagraph={page_paragraph || []} />
    </div>
  );
};
export default AccessoriesComponent;
