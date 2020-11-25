import styles from "../DepartmentPage.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";

const SessionHeaderDepartmentComponent = (props) => {
  console.log("Debug code props:", props);
  const { department } = props;
  const headingText =
    department?.page_heading_1 && department.page_heading_1.length > 0
      ? department.page_heading_1[0].text
      : "---";
  const urlImg =
    department?.department_image?.url ||
    "https://images.prismic.io/slicemachine-blank/6b2bf485-aa12-44ef-8f06-dce6b91b9309_dancing.png?auto=compress,format";
  return (
    <Container className={styles.departmentContainer}>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <div className={styles.contentLeft}>
            <p className={styles.note}>
              {department?.preHeader || "Huge range"}
            </p>
            <p className={styles.heading}>{headingText}</p>
          </div>
        </Col>
        <div className={styles.contentMiddle}>{headingText}</div>
        <Col xs={6} sm={6} md={6} lg={6}>
          <div className={styles.contentRight}>
            <Image
              className={styles.imgHeader}
              src={`${urlImg}`}
              alt="Img header department"
              width={215}
              height={215}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default SessionHeaderDepartmentComponent;
