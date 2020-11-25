import styles from "./DepartmentPage.module.scss";
import Image from "next/image";
import { Row, Col, Button, Container, Form } from "react-bootstrap";
import React, { useState } from "react";
import Brand from "../Brand";
import SessionHeaderDepartmentComponent from "./Sesstion/SessionHeaderDepartmentComponent";
import SessionBrowseByCategoryComponent from "./Sesstion/SessionBrowseByCategoryComponent";

const NewBikeComponent = (props) => {
  const [links, setLinks] = useState([
    {
      icon: "/icons/browse.png",
      name: "Browse the range",
    },
    {
      icon: "/icons/lams.png",
      name: "Browse all LAMS",
    },
    {
      icon: "/icons/recently-listed.png",
      name: "Recently listed",
    },
    {
      icon: "/icons/sell.png",
      name: "Sell your motorcycle",
    },
  ]);

  const { department } = props;
  const { collections, shop_by_brand_slider_content } = department;
  const brands =
    shop_by_brand_slider_content && shop_by_brand_slider_content.length > 0
      ? shop_by_brand_slider_content
      : [];

  return (
    <div>
      <SessionHeaderDepartmentComponent department={department} />
      {/* ss search */}
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

      {/* SS Quick Links */}
      <Container className={styles.sessionQuickLinks}>
        <p className={styles.sessionQuickLinksTitle}>QUICK LINKS</p>
        {links &&
          links.map((item, index) => (
            <Container key={index} className={styles.sessionQuickLinksRows}>
              <Row>
                <Col
                  className={styles.sessionQuickLinksIcon}
                  xs={2}
                  sm={1}
                  md={1}
                  lg={1}
                >
                  <div className={styles.sessionQuickLinksIconItem}>
                    <Image
                      src={item.icon}
                      alt="logo"
                      width={24}
                      height={24}
                    ></Image>
                  </div>
                </Col>
                <Col
                  className={styles.sessionQuickLinksText}
                  xs={8}
                  sm={9}
                  md={9}
                  lg={9}
                >
                  {item.name || "---"}
                </Col>
                <Col xs={1} sm={1} md={1} lg={1}>
                  <div className={styles.sessionQuickLinksPath}>
                    <div className={styles.sessionQuickLinksPathItem}>
                      {">"}
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          ))}
      </Container>
      <SessionBrowseByCategoryComponent collections={collections} />
      <Brand brands={brands} />
    </div>
  );
};
export default NewBikeComponent;
