import CustomerReviewsTab from "../CustomerReviewsTab";
import CustomerQuestionsTab from "../CustomerQuestionsTab";
import { Tabs, Tab, Row, Col, Nav } from "react-bootstrap";
import styles from "../ProductDetails.module.scss";
import { renderStart } from "../../../services/renderStart";
import { useState } from "react";
import UserCommentComponent from "../Components/UserCommentComponent";

const starValue = (i) => {
  return i == 4 ? 8 : i == 3 ? 2 : i == 2 ? 10 : i == 1 ? 35 : 1668;
};
function ProductCustomerReviews({ reviews = [], reviewSummary = {} }) {
  const { breakdown, rating, count, countQuestions } = reviewSummary;
  const [active, setActive] = useState(true);

  return (
    <div className={styles.customerReviewSection}>
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
            Reviews {count}
          </div>
          <div
            className={active ? styles.unactiveTab : styles.activeTab}
            onClick={() => setActive(false)}
          >
            Questions {countQuestions}
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
          </div>
          <div className={active ? "d-none" : ""}>
            {/* <UserCommentComponent
              user={{ name: "ndd", is_verified: true }}
              comment={{
                title: "Best quality",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. ",
              }}
              is_question={true}
            />
            <UserCommentComponent
              user={{ name: "ndd", is_verified: true }}
              comment={{
                title: "Best quality",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas varius tortor nibh, sit amet tempor nibh finibus et. Aenean eu enim justo. Vestibulum aliquam hendrerit molestie. ",
              }}
              is_question={true}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCustomerReviews;
