import styles from "@/components/MyPage/Cart/CartItem.module.css"
import Link from "next/link";
import Image from "next/image";
import { CartData } from "@/types/CartData";
import { BookData } from "@/types/BookData";
import { useRef } from "react";

type CartItemProps = {
    cart: CartData;
    onDelCart: () => void;
    onDelSelectBook: (book: BookData) => void;
};

export default function CartItem({ cart, onDelCart, onDelSelectBook }: CartItemProps) {

  const handleDel = () => {
    onDelCart();
    onDelSelectBook(cart.book);
  };

  return (
    <div className={styles.container}>
      {/* <input
        className={styles.checkbox}
        type="checkbox"
      /> */}
      <div className={styles.book}>
        <Image
          className={styles.cover}
          src={cart.book.cover}
          width={180}
          height={100}
          alt=""
        />
        <div>
          <Link href={`/detail/${cart.book.isbn13}`}>
            <p className={styles.title}>{cart.book.title}</p>
          </Link>
          <p className={styles.description}>{cart.book.description}</p>
          <p className={styles.price}>{cart.book.priceStandard}원</p>
          <p className={styles.count}>{cart.count}개</p>
        </div>
        <div>
          <button className={styles.btn_del} onClick={handleDel}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}