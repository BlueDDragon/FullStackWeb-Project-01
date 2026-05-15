'use client';

import styles from "@/components/Search/SearchList.module.css"
import SearchItem from "./SearchItem";
import { BookData } from "@/types/BookData";
import CartConfirm from "../Confirm/CartConfirm";
import { useState } from "react";

type SearchListProps = {
    books: BookData[];
    // onCartOpen: () => void;
}

export default function SearchList({ books }: SearchListProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const handleOpen = () => {
    setIsConfirmOpen(true);
  };

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