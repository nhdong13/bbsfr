import Image from "next/image";
import { renderStart } from "../../../services/renderStart";
import styles from "../ProductDetails.module.scss";

function UserCommentComponent({ reviewObj, is_question = false }) {
  const { customer, review } = reviewObj;
  return (
    <div className={styles.userComment}>
      <div className={styles.userProfile}>
        <div className={styles.userAvatar}>RM</div>
        {customer?.isSubscribed ? (
          <img src="/icons/user-verified.svg" className={styles.userVerified} />
        ) : null}
        <div>
          {customer?.name}
          {customer?.isSubscribed ? <span>Verified Buyer</span> : null}
        </div>
      </div>
      {is_question ? null : (
        <div className={styles.ratingLine}>
          <div>
            {renderStart(review?.rating, "15px", "15px", 5, "reviewStar")}
          </div>
          <span>{review?.title}</span>
        </div>
      )}
      <div className={styles.commentContent}>{review?.body}</div>
    </div>
  );
}

export default UserCommentComponent;
