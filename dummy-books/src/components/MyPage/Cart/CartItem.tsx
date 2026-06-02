import styles from "@/components/MyPage/Cart/CartItem.module.css"
import Link from "next/link";
import Image from "next/image";
import { CartData } from "@/types/CartData";
import { BookData } from "@/types/BookData";
import { useCallback, useEffect, useRef, useState } from "react";
import { GetSaleData } from "@/utils/saleUtils";
import { ChangeCartCount } from "@/utils/cartUtils";
import { useCountInput } from "@/hooks/useCountInput";

type CartItemProps = {
    cart: CartData;
    onDelCart: () => void;
    onDelSelectBook: (book: BookData) => void;
    onUpdatePrice: () => void;
};

export default function CartItem({ cart, onDelCart, onDelSelectBook, onUpdatePrice }: CartItemProps) {
  // 삭제 확인
  const handleDel = useCallback(() => {
    onDelCart();
    onDelSelectBook(cart.book);
    onUpdatePrice();
  }, [cart]);
  
  // 수량
  const onCountChange = (newCount: number) => {
    ChangeCartCount(cart.book, newCount);
    cart.count = newCount;
    onUpdatePrice();
  };
  const { inputRef, count, handleCountIncrease, handleCountDecrease, handleChange } = useCountInput(cart.count, onCountChange);

  // 세일 정보
  const { priceSales, priceStandard, isSale, percentSale } = GetSaleData(cart.book);
  const priceResult = (isSale ? priceSales : priceStandard);

  return (
    <div className={styles.container}>
      {/* <input className={styles.checkbox} type="checkbox" /> */}
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
          <p className={styles.description}>{cart.book.author}</p>
          <p className={styles.price}>
            {isSale && <span className={styles.sale}>{`${percentSale}%`}</span>}
            {priceResult.toLocaleString()}원
          </p>
        </div>
      </div>
      <div>
        <p className={styles.totalPrice}>{(cart.count ? priceResult * cart.count : 0).toLocaleString()}원</p>
        <div className={styles.buy_count}>
          <button className={styles.btn_decrease} onClick={handleCountDecrease}>-</button>
          <input className={styles.input} type="number" defaultValue={cart.count} min={1} ref={inputRef} onChange={handleChange}/>
          <button className={styles.btn_increase} onClick={handleCountIncrease}>+</button>
        </div>
      </div>
      <div>
        <button className={styles.btn_del} onClick={handleDel}>{"×"}</button>
      </div>
    </div>
  );
}