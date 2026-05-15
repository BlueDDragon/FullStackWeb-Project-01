import styles from "@/components/MyPage/Order/OrderItem.module.css"
import { CartData } from "@/types/CartData";
import Link from "next/link";
import Image from "next/image";

type OrderItemProps = {
    cart: CartData;
};

export default function OrderItem({ cart }: OrderItemProps) {
  const totalPrice = cart.book.priceSales * cart.count;

  return (
    <div className={styles.container}>
      <div className={styles.book}>
        <Image
          className={styles.cover}
          src={cart.book.cover}
          width={180}
          height={100}
          alt=""
        />
        <div className={styles.book_detail}>
          <Link href={`/detail/${cart.book.isbn13}`}>
            <p className={styles.title}>{cart.book.title}</p>
          </Link>
          <p className={styles.description}>{cart.book.author}</p>
          <p className={styles.description}>{cart.book.description}</p>
        </div>
      </div>
      <div className={styles.price_container}>
        <p className={styles.price}>{totalPrice.toLocaleString()}원</p>
        <p className={styles.count}>{cart.count}개</p>
      </div>
    </div>
  );
}