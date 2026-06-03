'use client';

import styles from "@/components/Search/SearchItem.module.css"
import { BookData } from "@/types/BookData";
import Link from "next/link";
import Image from "next/image";
import WishButton from "../WishButton";
import BookPriceDisplay from "../BookPriceDisplay";

type SearchItemDetailProps = {
    book: BookData;
    isWishAlready: boolean;
    handleToggleWish: () => void;
    handleCartOpen: () => void;
    handleOrder: () => void;
};

export default function SearchItemDetail({ book, isWishAlready, handleToggleWish, handleCartOpen, handleOrder }: SearchItemDetailProps) {
    return (
        <div className={styles.container}>
          {/* <input className={styles.checkbox} type="checkbox" /> */}
          <Link href={`/detail/${book.isbn13}`}>
            <div className={styles.book}>
              <Image className={styles.cover} src={book.cover} width={180} height={261} alt="" />
              <div>
                <p className={styles.title}>{book.title}</p>
                <p className={styles.description}>{book.author}</p>
                <p className={styles.description}>{book.description}</p>
                <BookPriceDisplay book={book} isSimple={false}/>
              </div>
            </div>
          </Link>
          <div className={styles.btns}>
            <button className={styles.btn_cart} onClick={handleCartOpen}>장바구니</button>
            <button className={styles.btn_buy} onClick={handleOrder}>바로구매</button>
            <WishButton isWished={isWishAlready} onClick={handleToggleWish}/>
          </div>
        </div>
      );
}