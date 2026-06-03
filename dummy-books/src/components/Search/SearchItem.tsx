'use client';

import styles from "@/components/Search/SearchItem.module.css"
import { BookData } from "@/types/BookData";
import { addCart, getCartTotalCount } from "@/utils/services/cartUtils";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";
import { SearchViewContext } from "@/context/SearchViewContext";
import { LoginData } from "@/types/UserData";
import { useLoginState } from "@/utils/services/userUtils";
import { useWishToggle } from "@/hooks/useWishToggle";
import SearchItemDetail from "./SearchItemDetail";
import SearchItemSimple from "./SearchItemSimple";
import { useBookActions } from "@/hooks/useBookActions";

type SearchItemProps = {
  book: BookData;
  onCartOpen: () => void;
};

export default function SearchItem({ book, onCartOpen }: SearchItemProps) {
    const { isLogined, isVerifyId, login } = useLoginState("0");
    
    // 장바구니
    // 바로구매
    const getCount = () => 1;
    const { handleCartOpen, handleOrder } = useBookActions({ isLogined, login, book, getCount, onComplete: onCartOpen });
    
    // 찜하기 상태
    const { isAlready, handleToggleWish } = useWishToggle(book, isLogined, onCartOpen);

    const viewType = useContext(SearchViewContext);
    switch (viewType.viewType) {
      // 검색 리스트 보기 타입 - 상세
      case "detail":
        return <SearchItemDetail book={book} isWishAlready={isAlready} handleToggleWish={handleToggleWish}
        handleCartOpen={handleCartOpen} handleOrder={handleOrder} />

      // 검색 리스트 보기 타입 - 간단
      case "simple":
        return <SearchItemSimple book={book} isWishAlready={isAlready} handleToggleWish={handleToggleWish} />

      default:
        return <div></div>;
    }
}