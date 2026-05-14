import styles from "@/components/SearchBar/SearchBarDropdownItem.module.css"
import { BookData } from "@/types/BookData";
import { AddCart } from "@/utils/cartUtils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CartConfirm from "../Confirm/CartConfirm";

type SearchBarDropdownItemProps = {
    book: BookData;
};

export default function SearchBarDropdownItem({ book }: SearchBarDropdownItemProps) {
    const [isConfirm, setIsConfirm] = useState(false);
    const handleOpen = () => {
        AddCart({ book: book, count: 1 });
        setIsConfirm(true);
    };

    return (
      <div className={styles.container}>
        <Link className={styles.book_container} href={`/detail/${book.isbn13}`}>
          <Image
            className={styles.img}
            src={book.cover}
            width={100}
            height={180}
            alt=""
          />
          <div className={styles.box}>
            <p className={styles.title}>{book.title}</p>
            <p className={styles.author}>{book.author}</p>
            <p className={styles.price}>{book.priceStandard}</p>
          </div>
        </Link>
        <button className={styles.btn_cart} onClick={handleOpen}>장바구니</button>
        <div>
          <CartConfirm book={book} isOpen={isConfirm} onOpen={setIsConfirm}/>
        </div>
      </div>
    );
}