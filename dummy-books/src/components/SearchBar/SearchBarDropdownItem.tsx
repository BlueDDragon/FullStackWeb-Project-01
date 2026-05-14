import styles from "@/components/SearchBar/SearchBarDropdownItem.module.css"
import { BookData } from "@/types/BookData";
import Image from "next/image";
import Link from "next/link";

type SearchBarDropdownItemProps = {
    book: BookData;
};

export default function SearchBarDropdownItem({ book }: SearchBarDropdownItemProps) {
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
        <button className={styles.btn_cart}>장바구니</button>
      </div>
    );
}