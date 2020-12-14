import styles from "../DepartmentPage.module.scss"
import { Row, Col, Button, Container, Form } from "react-bootstrap"

//STILL NOT USED
const SearchComponent = () => {
  return (
    <Container className={styles.sessionSearch}>
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
            <Form.Group controlId="exampleForm.SelectCustomSizeLg">
              <Row>
                <Col xs={9} sm={10} md={10} lg={10}>
                  <Form.Label>Lams Bikes Only</Form.Label>
                </Col>
                <Col xs={3} sm={2} md={2} lg={2}>
                  <Form.Switch id="custom-switch" />
                </Col>
              </Row>
            </Form.Group>
            <Form.Label>Price</Form.Label>
            <Row>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                  <Form.Control as="select" size="lg" custom>
                    <option value="0">Min</option>
                    <option>1</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={6} sm={6} md={6} lg={6}>
                <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                  <Form.Control as="select" size="lg" custom>
                    <option value="0">Max</option>
                    <option>1</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Button
              className={styles.sessionSearchButtonSubmit}
              variant="primary"
              size="lg"
              block
            >
              Search used bikes
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  )
}

export default SearchComponent
