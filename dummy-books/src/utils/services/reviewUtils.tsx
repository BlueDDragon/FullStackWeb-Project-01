import { ReviewData } from "@/types/ReviewData";
import { loadData, saveData } from "@/utils/storage/saveload";
import { getLogin } from "./userUtils";
import { getIsOrderBuy } from "./orderUtils";

export function getReviews(isbn13: string) : ReviewData[]{
    return loadData<ReviewData[]>({ type: "Review", isbn13: isbn13 }, ("[]"));
}

export function isReviewEmpty(reviews: ReviewData[]) {
    return (!reviews || !Array.isArray(reviews) || reviews.length === 0);
}

export function addReview(isbn13: string, rank: number, content: string, hashtag: string[]) {
    const login = getLogin();
    if (!login || !login.isLogined) return;

    const reviews = getReviews(isbn13);
    const isEmpty = isReviewEmpty(reviews);

    const newIdx: number = isEmpty ? 0 : reviews.reduce((r, max) => r.idx > max.idx ? r : max).idx + 1;
    const nowDate: number = Date.now();
    const isBuy: boolean = getIsOrderBuy(isbn13);
    const newReview: ReviewData = {
        idx: newIdx,
        isBuy: isBuy,
        nickname: login.nickname,
        id: login.id,
        postDate: String(nowDate),
        isDel: false,
        delDate: "",
        rank: rank,
        content: content,
        like: 0,
        hashtag: hashtag,
    }
    
    // 기존에 저장된 값이 없을 경우
    if (isEmpty) {
        saveData<ReviewData[]>({ type: "Review", isbn13: isbn13 }, [newReview]);
        return;
    }
    
    saveData<ReviewData[]>({ type: "Review", isbn13: isbn13 }, [...reviews, newReview]);
}
