import styles from "../ProductDetails.module.scss";
import { renderStart } from "../../../services/renderStart";
import { useState } from "react";
import UserCommentComponent from "../Components/UserCommentComponent";
import { Container } from "react-bootstrap";
import ReviewPaginationComponent from "../Components/ReviewPaginationComponent";

function ProductCustomerReviews({
  reviewResponse,
  reviewSummary = {},
  questionResponse,
}) {
  const reviews = reviewResponse?.results || [];
  const questions = questionResponse?.results || [];
  const { breakdown, rating, count, countQuestions } = reviewSummary;
  const [active, setActive] = useState(true);

  return (
    <Container className={styles.customerReviewSection}>
      <p className={styles.customerReviewTitle}>Customer Reviews</p>
      <div className={styles.productOverallReviews}>
        <div className={styles.reviewScore}>
          <div className={styles.totalScore}>{rating}</div>
          <div className={styles.reviewStar}>
            {renderStart(rating, "20px", "20px", 5, "reviewStar")}
          </div>
        </div>
        <div className={styles.overallReviewCounter}>
          Based on {count} reviews
        </div>
      </div>

      <div className={styles.reviewCounter}>
        {[...Array(5).keys()].map((i) => (
          <div key={i} className={styles.reviewCounterLine}>
            <div>
              {renderStart(5 - i, "15px", "15px", 5, "reviewCountStar", 3)}
            </div>
            <div className={styles.ratingPercent}>
              <div className={styles.ratingFullPercent}></div>
              <div
                className={styles.ratingCalculatedPercent}
                style={{
                  width: `${(breakdown[`rating${5 - i}`] / count) * 146}px`,
                }}
              ></div>
            </div>
            <div className={styles.ratingCount}>
              ({breakdown[`rating${5 - i}`]})
            </div>
          </div>
        ))}
      </div>
      <div className={styles.reviewList}>
        <div className={styles.tabHeader}>
          <div
            className={active ? styles.activeTab : styles.unactiveTab}
            onClick={() => setActive(true)}
          >
            Reviews ({count})
          </div>
          <div
            className={active ? styles.unactiveTab : styles.activeTab}
            onClick={() => setActive(false)}
          >
            Questions ({questions.length})
          </div>
        </div>
        <div>
          <div className={active ? "" : "d-none"}>
            {reviews.map((review, i) => (
              <UserCommentComponent
                key={i}
                reviewObj={review}
                is_question={false}
              />
            ))}
            <ReviewPaginationComponent
              currPage={reviewResponse?.page}
              totalPage={reviewResponse?.totalPages}
            />
          </div>
          <div className={active ? "d-none" : ""}>
            {questions.map((question, i) => (
              <UserCommentComponent
                key={i}
                reviewObj={question}
                is_question={true}
              />
            ))}
            <ReviewPaginationComponent
              currPage={questionResponse?.page}
              totalPage={questionResponse?.totalPages}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ProductCustomerReviews;
