import Image from "next/image"
import { renderStart } from "../../../services/renderStart"
import styles from "../ProductDetails.module.scss"

function UserCommentComponent({ user, comment, is_question = false }) {
  return (
    <div className={styles.userComment}>
      <div className={styles.userProfile}>
        <div className={styles.userAvatar}>RM</div>
        {user?.is_verified ? (
          <img src="/icons/user-verified.svg" className={styles.userVerified} />
        ) : null}
        <div>
          {user?.name}
          {user?.is_verified ? <span>Verified Buyer</span> : null}
        </div>
      </div>
      {is_question ? null : (
        <div className={styles.ratingLine}>
          <div>{renderStart(5, "15px", "15px", 5, "reviewStar")}</div>
          <span>{comment?.title}</span>
        </div>
      )}
      <div className={styles.commentContent}>{comment?.content}</div>
    </div>
  )
}

export default UserCommentComponent
