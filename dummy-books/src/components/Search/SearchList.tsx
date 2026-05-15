'use client';

import styles from "@/components/Search/SearchList.module.css"
import SearchItem from "./SearchItem";
import { BookData } from "@/types/BookData";
import CartConfirm from "../Confirm/CartConfirm";
import { useContext, useState } from "react";
import { SearchViewContext } from "@/context/SearchViewContext";

type SearchListProps = {
    books: BookData[];
}

export default function SearchList({ books }: SearchListProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const handleOpen = () => {
    setIsConfirmOpen(true);
  };

  const viewType = useContext(SearchViewContext);
  
  if (viewType.viewType === "detail") {
    return (
      <div>
        <div className={styles.container}>
          {books.map((book, idx) => (
            <SearchItem key={idx} book={book} onCartOpen={handleOpen} />
          ))}
        </div>
        <div className={styles.confirm}>
          <CartConfirm isOpen={isConfirmOpen} onOpen={setIsConfirmOpen} />
        </div>
      </div>
    );
  }
  else if (viewType.viewType === "simple") {
    return (
      <div>
        <div className={styles.container_simple}>
          {books.map((book, idx) => (
            <SearchItem key={idx} book={book} onCartOpen={handleOpen} />
          ))}
        </div>
        <div className={styles.confirm}>
          <CartConfirm isOpen={isConfirmOpen} onOpen={setIsConfirmOpen} />
        </div>
      </div>
    );
  }

}