import { ReviewData } from "@/types/ReviewData";
import { createContext } from "react";

export type ReviewPostContextType = {
    reviews: ReviewData[],
    updateReviews: () => void,
}

export const ReviewPostContext = createContext<ReviewPostContextType>( {
    reviews: [],
    updateReviews: () => {},
});
