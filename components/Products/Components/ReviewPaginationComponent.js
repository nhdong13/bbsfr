import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import styles from "../ProductDetails.module.scss";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import { useState } from "react";

function ReviewPaginationComponent({ currPage, totalPage }) {
  const [activePage, setActivePage] = useState(currPage);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <Row>
      <Col xs={12} className={styles.reviewPaginationDetail}>
        <p>Showing 2 reviews</p>
        <Link href="/">
          <a className={styles.showAllReviewBtn}>Show All</a>
        </Link>
      </Col>
      <Col xs={12} className={styles.paginationContainer}>
        <ReactPaginate
          previousLabel={
            <Image src="/icons/previus.svg" width={9} height={9} />
          }
          previousClassName={styles.noMargin}
          nextLabel={<Image src="/icons/next.svg" width={9} height={9} />}
          nextClassName={styles.noMargin}
          breakLabel={"..."}
          breakClassName={styles.breakBtn}
          pageCount={totalPage}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={() => handlePageChange}
          containerClassName={"pagination"}
          pageClassName={styles.paginationHolder}
          subContainerClassName={"pages pagination"}
          activeClassName={styles.paginationHolderActive}
        />
      </Col>
    </Row>
  );
}

export default ReviewPaginationComponent;
