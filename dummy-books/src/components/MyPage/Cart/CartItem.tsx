import styles from "@/components/MyPage/Cart/CartItem.module.css"
import Link from "next/link";
import Image from "next/image";
import { CartData } from "@/types/CartData";
import { BookData } from "@/types/BookData";
import { useCallback } from "react";
import { GetSaleTotalPrice } from "@/utils/services/saleUtils";
import { ChangeCartCount } from "@/utils/services/cartUtils";
import { useCountInput } from "@/hooks/useCountInput";
import BookPriceDisplay from "@/components/Common/BookPriceDisplay";

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
  const { inputRef, count, handleCountIncrease, handleCountDecrease, handleChange } 
    = useCountInput(cart.count, (newCount: number) => {
      ChangeCartCount(cart.book, newCount);
      cart.count = newCount;
      onUpdatePrice();
    });

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
          <BookPriceDisplay book={cart.book} isSimple={true}/>
        </div>
      </div>
      <div>
        <p className={styles.totalPrice}>{(GetSaleTotalPrice(cart.book, cart.count)).toLocaleString()}원</p>
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