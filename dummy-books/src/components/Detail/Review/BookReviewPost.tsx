'use client';

import { useLoginState } from "@/utils/services/userUtils";
import styles from "./BookReviewPost.module.css";
import Link from "next/link";
import { useCallback, useContext, useRef, useState } from "react";
import { addReview } from "@/utils/services/reviewUtils";
import { BookData } from "@/types/BookData";
import LoginConfirm from "@/components/Confirm/LoginConfirm";
import { ReviewPostContext } from "@/context/ReviewPostContext";

type BookReviewPostProps = {
    book: BookData;
}

export default function BookReviewPost({ book }: BookReviewPostProps) {
    const { updateReviews } = useContext(ReviewPostContext);
    const { isLogined, isVerifyId, login } = useLoginState("0");
    const maskingId = isLogined && login.id.slice(0,4) + "*".repeat(login.id.length - 2);

    const [rank, setRank] = useState(0);
    const [content, setContent] = useState("");
    const [hashtag, setHashtag] = useState([]);

    // 리뷰 포스팅
    const handleReviewPost = useCallback(() => {
        if (!isLogined) {
            setIsLoginConfirm(true);
            return;
        }

        if (!content) {
            return;
        }

        addReview(book.isbn13, rank, content, hashtag);
        updateReviews();
        
        setContent("");
    }, [isLogined, content]);
    
    // 로그인 팝업
    const [isLoginConfirm, setIsLoginConfirm] = useState(false);

    return (
        <div>
            <div className={styles.post_cotainer}>
            {isLogined ? 
                <div className={styles.post_upper}>
                    <span className={styles.nickname}>{login.nickname}</span>
                    <span className={styles.id}>{maskingId}</span>
                </div> :
                <div className={styles.post_upper}>
                    <span className={styles.nickname}>로그인이 필요합니다.</span>
                    <Link className={styles.id} href={(`/register`)}>회원가입</Link>
                    <Link className={styles.id} href={(`/login`)}>로그인</Link>
                </div>}
                <div className={styles.post_content}>
                    <textarea className={styles.input} 
                        value={content}
                        maxLength={500}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={(e) => { if (e.ctrlKey && e.key === 'Enter') handleReviewPost() }}
                        placeholder="10자 이상 입력해주세요. 주제와 무관한 댓글, 악플, 배송문의 등의 글은 임의 삭제될 수 있습니다."/>
                    <span className={styles.textcount}>{content.length}/500</span>
                </div>
                <div className={styles.box_btn}>
                    <div className={styles.post_picture}>
                        <span className={styles.picupload}>사진 첨부(선택) 0/5</span>
                        <button className={styles.btn_upload}>업로드</button>
                    </div>
                    <button className={styles.btn_review} onClick={handleReviewPost}>리뷰 등록</button>
                </div>
            </div>
            <div>
                <LoginConfirm isOpen={isLoginConfirm} onOpen={setIsLoginConfirm}/>
            </div>
        </div>
    );
}