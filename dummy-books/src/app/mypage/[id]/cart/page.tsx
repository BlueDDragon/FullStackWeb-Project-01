'use client';

import styles from "@/app/mypage/[id]/cart/cart.module.css"
import DelCartConfirm from "@/components/Confirm/DelCartConfirm";
import OrderConfirm from "@/components/Confirm/OrderConfirm";
import Empty from "@/components/Empty/Empty";
import CartItem from "@/components/MyPage/Cart/CartItem";
import { BookData } from "@/types/BookData";
import { CartData } from "@/types/CartData";
import { GetCarts, RemoveCart, RemoveCartAll } from "@/utils/cartUtils";
import { AddOrder } from "@/utils/orderUtils";
import { useEffect, useState } from "react";

export default function Page() {
    const [carts, setCarts] = useState<CartData[]>([]);
    useEffect(() => { setCarts(GetCarts()); }, []);
    const isCartsEmpty = (!carts || !Array.isArray(carts) || carts.length === 0);

    const totalCount = (isCartsEmpty ? 0 : carts.length);
    const selectCarts= isCartsEmpty ? [] : carts;
    const totalStandardPrice = isCartsEmpty ? 0 : selectCarts.reduce((sum, cur) => sum + cur.book.priceStandard, 0);
    const totalResultPrice = isCartsEmpty ? 0 : selectCarts.reduce((sum, cur) => sum + cur.book.priceSales, 0);
    const totalSalePrice = totalStandardPrice - totalResultPrice;

    const [isOrderConfirm, setIsOrderConfirm] = useState(false);
    const handleOrderOpen = () => {
        setIsOrderConfirm(true);
    };
    const handleOrderConfirm = () => {
        if (isCartsEmpty) return;
        RemoveCartAll();
        AddOrder(carts, totalResultPrice);
    };

    const [selectBook, setSelectBook] = useState<BookData>();
    const [isDelCartConfirm, setIsDelCartConfirm] = useState(false);
    const handleDelCartOpen = () => {
        setIsDelCartConfirm(true);
    };
    const handleDelCartConfirm = () => {
        if (!selectBook) return;
        RemoveCart(selectBook);
        setIsDelCartConfirm(false);
    };

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.upper}>
            {/* <p className={styles.count}>장바구니 ({totalCount})</p> */}
            {/* <input className={styles.selectAll} type="checkbox" /> */}
          </div>
          <div className={styles.book_container}>
            {!isCartsEmpty &&
              carts.map((cart, idx) => (
                <CartItem
                  key={idx}
                  cart={cart}
                  onDelCart={handleDelCartOpen}
                  onDelSelectBook={setSelectBook}
                />
              ))}
            {isCartsEmpty && <Empty info="장바구니가 비어 있습니다." />}
          </div>
        </div>
        <div className={styles.aside}>
          <div className={styles.aside_box_upper}>
            <p className={styles.key}>
              상품 금액<span className={styles.value}>{totalStandardPrice}원</span>
            </p>
            <p className={styles.key}>
              배송비<span className={styles.value}>+{3000}원</span>
            </p>
            <p className={styles.key}>
              상품 할인<span className={styles.value}>-{totalSalePrice}원</span>
            </p>
          </div>
          <div className={styles.aside_box_body}>
            <p className={styles.key}>
              결제 예정 금액<span className={styles.value}>{totalResultPrice}원</span>
            </p>
            <button className={styles.btn_buy} onClick={handleOrderOpen}>
              주문하기 ({totalCount})
            </button>
          </div>
        </div>
        <div>
          <OrderConfirm
            count={totalCount}
            isOpen={isOrderConfirm}
            onOpen={setIsOrderConfirm}
            onConfirm={handleOrderConfirm}
          />
          <DelCartConfirm
            isOpen={isDelCartConfirm}
            onOpen={setIsDelCartConfirm}
            onConfirm={handleDelCartConfirm}
          />
        </div>
      </div>
    );
}