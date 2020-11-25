import styles from "../DepartmentPage.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";

const SessionHeaderDepartmentComponent = (props) => {
  const { department } = props;
  const headingText =
    department?.page_heading_1 && department.page_heading_1.length > 0
      ? department.page_heading_1[0].text
      : "---";
  const textHide = headingText ? headingText.split(" ")[0] : "";
  const urlImg =
    department?.department_image?.url ||
    "https://images.prismic.io/slicemachine-blank/6b2bf485-aa12-44ef-8f06-dce6b91b9309_dancing.png?auto=compress,format";
  return (
    <Container className={styles.departmentContainer}>
      <Row>
        <Col>
          <div className={styles.contentLeft}>
            <p className={styles.note}>
              {department?.preHeader || "Huge range"}
            </p>
            <p className={styles.heading}>{headingText}</p>
          </div>
        </Col>
        <div className={styles.contentMiddle}>{textHide}</div>
        <Col>
          <div className={styles.contentRight}>
            <Image
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