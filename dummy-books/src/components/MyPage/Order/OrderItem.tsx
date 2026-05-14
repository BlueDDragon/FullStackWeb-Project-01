import styles from "@/components/MyPage/Order/OrderItem.module.css"
import { CartData } from "@/types/CartData";
import Link from "next/link";
import Image from "next/image";

type OrderItemProps = {
    cart: CartData;
};

export default function OrderItem({ cart }: OrderItemProps) {
  return (
    <div className={styles.container}>
      <Link href={`/detail/${cart.book.isbn13}`}>
        <div className={styles.book}>
          <Image className={styles.cover} src={cart.book.cover} width={180} height={100} alt="" />
          <div>
            <p className={styles.title}>{cart.book.title}</p>
            <p className={styles.description}>{cart.book.description}</p>
            <p className={styles.price}>{cart.book.priceStandard}원</p>
            <p className={styles.count}>{cart.count}개</p>
          </div>
        </div>
      </Link>
    </div>
  );
}