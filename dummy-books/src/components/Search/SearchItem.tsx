'use client';

import styles from "@/components/Search/SearchItem.module.css"
import { BookData } from "@/types/BookData";
import Link from "next/link";
import Image from "next/image";
import { GetSaleData } from "@/utils/saleUtils";
import { AddCart } from "@/utils/cartUtils";
import { useRouter } from "next/navigation";

type SearchItemProps = {
  book: BookData;
  onCartOpen: () => void;
};

export default function SearchItem({ book, onCartOpen }: SearchItemProps) {
  const { priceSales, priceStandard, isSale, percentSale } = GetSaleData(book);

  const handleCartOpen = () => {
    AddCart({ book: book, count: 1 });
    onCartOpen();
  };

  const router = useRouter();
  const handleOrder = () => {
    AddCart({ book: book, count: 1 });
    router.push(`/mypage/0/cart`);
  };
  
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
            <p className={styles.price}>
              {isSale && (
                <span className={styles.sale}>{`${percentSale}%`}</span>
              )}
              {(isSale ? priceSales : priceStandard).toLocaleString()}원
            </p>
          </div>
        </div>
      </Link>
      <div className={styles.btns}>
        <button className={styles.btn_cart} onClick={handleCartOpen}>장바구니</button>
        <button className={styles.btn_buy} onClick={handleOrder}>주문하기</button>
      </div>
    </div>
  );
}