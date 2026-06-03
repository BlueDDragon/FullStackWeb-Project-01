'use client';

import styles from "@/components/Search/SearchItem.module.css"
import { BookData } from "@/types/BookData";
import { AddCart } from "@/utils/services/cartUtils";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";
import { SearchViewContext } from "@/context/SearchViewContext";
import { LoginData } from "@/types/UserData";
import { useLoginState } from "@/utils/services/userUtils";
import { HeaderContext } from "@/context/HeaderContext";
import { useWishToggle } from "@/hooks/useWishToggle";
import SearchItemDetail from "./SearchItemDetail";
import SearchItemSimple from "./SearchItemSimple";

type SearchItemProps = {
  book: BookData;
  onCartOpen: () => void;
};

export default function SearchItem({ book, onCartOpen }: SearchItemProps) {
    const { isLogined, isVerifyId, login } = useLoginState("0");
    const updateHeader = useContext(HeaderContext).updateHeader;

    // 장바구니 확인창 상태
    const handleCartOpen = useCallback(() => {
      AddCart({ book: book, count: 1 });
      updateHeader?.();
      onCartOpen();
    }, [book]);

    // 바로구매
    const router = useRouter();
    const handleOrder = useCallback(() => {
      AddCart({ book: book, count: 1 });
      updateHeader?.();
      
      if (isLogined)
        router.push(`/mypage/${(login as LoginData).id}/cart`);
      else
        onCartOpen();
    }, [book, isLogined]);

    // 찜하기 상태
    const { isWishAlready, handleToggleWish } = useWishToggle(book, isLogined, onCartOpen);

    const viewType = useContext(SearchViewContext);
    switch (viewType.viewType) {
      // 검색 리스트 보기 타입 - 상세
      case "detail":
        return <SearchItemDetail book={book} isWishAlready={isWishAlready} handleToggleWish={handleToggleWish}
                handleCartOpen={handleCartOpen} handleOrder={handleOrder} />

      // 검색 리스트 보기 타입 - 간단
      case "simple":
        return <SearchItemSimple book={book} isWishAlready={isWishAlready} handleToggleWish={handleToggleWish} />

      default:
        return <div></div>;
    }
}