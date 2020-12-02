import styles from "../DepartmentPage.module.scss";
import { Button, Container, Form } from "react-bootstrap";

const SearchForAccessoriesComponent = () => {
  return (
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
  );
};

export default SearchForAccessoriesComponent;