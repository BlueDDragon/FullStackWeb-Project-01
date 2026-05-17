'use client';

import styles from "@/components/Search/SearchList.module.css"
import SearchItem from "./SearchItem";
import { BookData } from "@/types/BookData";
import CartConfirm from "../Confirm/CartConfirm";
import { useCallback, useContext, useState } from "react";
import { SearchViewContext } from "@/context/SearchViewContext";

type SearchListProps = {
    books: BookData[];
}

export default function SearchList({ books }: SearchListProps) {
  // 장바구니 확인창 상태
  const [isCartConfirm, setIsCartConfirm] = useState(false);
  const handleCartOpen = useCallback(() => {
    setIsCartConfirm(true);
  }, []);

  const viewType = useContext(SearchViewContext);
  switch (viewType.viewType) {
    // 검색 리스트 보기 타입 - 상세
    case "detail":
    return (
      <div>
        <div className={styles.container}>
          {books.map((book, idx) => (
            <SearchItem key={idx} book={book} onCartOpen={handleCartOpen} />
          ))}
        </div>
        <div className={styles.confirm}>
          <CartConfirm isOpen={isCartConfirm} onOpen={setIsCartConfirm} />
        </div>
      </div>
    );
    
    // 검색 리스트 보기 타입 - 간단
    case "simple":
    return (
      <div>
        <div className={styles.container_simple}>
          {books.map((book, idx) => (
            <SearchItem key={idx} book={book} onCartOpen={handleCartOpen} />
          ))}
        </div>
        <div className={styles.confirm}>
          <CartConfirm isOpen={isCartConfirm} onOpen={setIsCartConfirm} />
        </div>
      </div>
    );

    default:
      return <div></div>;
  }
}