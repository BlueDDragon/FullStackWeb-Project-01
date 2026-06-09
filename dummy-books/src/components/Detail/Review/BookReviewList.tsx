'use client';

import styles from "./BookReview.module.css";
import BookReviewItem from "./BookReviewItem"
import BookReviewPost from "./BookReviewPost";
import { getReviews, isReviewEmpty } from "@/utils/services/reviewUtils";
import { BookData } from "@/types/BookData";
import Empty from "@/components/Common/Empty";
import { useCallback, useEffect, useState } from "react";
import { ReviewData } from "@/types/ReviewData";
import { ReviewPostContext } from "@/context/ReviewPostContext";
import { useLoginState } from "@/utils/services/userUtils";

type BookReviewListProps = {
    book: BookData;
}

export default function BookReviewList({ book }: BookReviewListProps) {
    const { isLogined, isVerifyId, login } = useLoginState("0");
    
    const [reviews, setReviews] = useState<ReviewData[]>([]);
    const isEmpty = isReviewEmpty(reviews);

    const updateReviews = useCallback(() => {
        setReviews(getReviews(book.isbn13));
    }, [book]);

    useEffect(() => {
        updateReviews();
    }, []);

    return (
      <div className={styles.review}>
        <div className={styles.container}>
          <p className={styles.subtitle}>리뷰</p>
          <div className={styles.info}>
            <ReviewPostContext.Provider value={{ reviews, updateReviews }}>
              <BookReviewPost book={book} />
              <p className={styles.totalcount}>전체({reviews.length})</p>
              <div className={styles.box}>
                {isEmpty ?
                  <Empty info={`도서를 읽고 감상을 남겨보세요.`} /> :
                  reviews
                    .sort((a, b) => (a.postDate > b.postDate ? -1 : 1))
                    .map((review) => (
                      <BookReviewItem
                        key={review.idx}
                        review={review}
                        isMyReview={isLogined && login?.id === review.id}
                      />)
                )}
              </div>
            </ReviewPostContext.Provider>
          </div>
        </div>
      </div>
    );
}