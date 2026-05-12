import styles from "@/components/Search/SearchItem.module.css"
import { BookData } from "@/types/BookData";
import Link from "next/link";
import Image from "next/image";

type SearchItemProps = {
  book: BookData;
};

export default function SearchItem({ book }: SearchItemProps) {
  return (
    <div className={styles.container}>
      <input className={styles.checkbox} type="checkbox" />
      <Link href={`/detail/${book.isbn13}`}>
        <div className={styles.book}>
          <Image className={styles.cover} src={book.cover} width={180} height={100} alt="" />
          <div>
            <p className={styles.title}>{book.title}</p>
            <p className={styles.description}>{book.description}</p>
            <p className={styles.price}>{book.priceStandard}원</p>
          </div>
        </div>
        <div className={styles.btns}>
          <button className={styles.btn_cart}>장바구니</button>
          <button className={styles.btn_buy}>주문하기</button>
        </div>
      </Link>
    </div>
  );
}