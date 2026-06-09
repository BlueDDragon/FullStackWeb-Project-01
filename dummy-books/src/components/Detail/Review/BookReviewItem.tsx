import styles from "./BookReview.module.css";
import { ReviewData } from "@/types/ReviewData";

type BookReviewItemProps = {
    review: ReviewData;
    isMyReview: boolean;
}

export default function BookReviewItem({ review, isMyReview }: BookReviewItemProps) {
    const maskingId = review.id.slice(0,4) + "*".repeat(review.id.length - 2);
    const postDate = new Date(Number(review.postDate));

    return (
        <div className={styles.review_item}>
            <div className={styles.review_upper}>
                {review.isBuy && <span className={styles.buy}>구매자</span>}
                <span className={styles.nickname}>{review.nickname}</span>
                <span className={styles.id}>{maskingId}</span>
                <span className={styles.rank}>{"⭐️".repeat(review.rank)}</span>
                <span className={styles.postDate}>{postDate.toDateString()}</span>
                {!isMyReview && <button className={styles.btn1}>신고</button>}
                {isMyReview && <button className={styles.btn1}>수정</button>}
                <button className={styles.btn1}>삭제</button>
            </div>
            <div className={styles.review_body}>
                <span className={styles.content}>{review.content}</span>
                <button className={styles.btn2}>펼치기</button>
            </div>
            <div className={styles.review_bottom}>
                <span className={styles.like}>좋아요 {review.like}</span>
                {review.hashtag.map((h, idx) => <span key={idx} className={styles.hashtag}>#{h} </span>)}
            </div>
        </div>
    );
}