import styles from "../DepartmentPage.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { useSelector } from "react-redux";
import { findDepartments } from "../../../../services/findDepartments";
import { useRouter } from "next/router";

const SessionHeaderDepartmentComponent = (props) => {
  const { department } = props;
  const router = useRouter();
  const currentDepartments = useSelector((state) => state.currentDepartments);

  const headingText =
    department?.page_heading_1 && department.page_heading_1.length > 0
      ? department.page_heading_1[0].text
      : "---";

  const urlImg =
    department?.department_image?.url ||
    "https://images.prismic.io/slicemachine-blank/6b2bf485-aa12-44ef-8f06-dce6b91b9309_dancing.png?auto=compress,format";

  const departmentFiller = findDepartments(
    router.pathname,
    currentDepartments
  );
  
  const preHeader =
    department?.department_preHeader &&
    department.department_preHeader.length > 0
      ? department.department_preHeader[0].text
      : departmentFiller?.department_preHeader && departmentFiller?.department_preHeader.length > 0
      ? departmentFiller.department_preHeader[0].text
      : "---";

  return (
    <Container className={styles.departmentContainer}>
      <Row>
        <Col xs={6} sm={6} md={6} lg={6}>
          <div className={styles.contentLeft}>
            <p className={styles.note}>
              {preHeader}
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
