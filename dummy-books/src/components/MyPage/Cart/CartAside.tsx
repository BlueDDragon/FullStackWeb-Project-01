'use client';

import styles from "@/app/mypage/[id]/cart/cart.module.css"
import OrderConfirm from "@/components/Confirm/OrderConfirm";
import { HeaderContext } from "@/context/HeaderContext";
import { CartData } from "@/types/CartData";
import { isCartEmpty, removeCartAll } from "@/utils/services/cartUtils";
import { addOrder } from "@/utils/services/orderUtils";
import { useCallback, useContext, useEffect, useState } from "react";

type CartAsideProps = {
    carts: CartData[];
};

export default function CartAside({ carts }: CartAsideProps) {
    // 기본 정보
    const isEmpty = isCartEmpty(carts);
    const deliveryPrice = isEmpty ? 0 : 3000;
    const { cartTotalCount, setCartTotalCount } = useContext(HeaderContext);

    // 가격 정보
    // const [totalStandardPrice, setTotalStandardPrice] = useState(0);
    // const [totalResultPrice, setTotalResultPrice] = useState(0);
    // const [totalSalePrice, setTotalSalePrice] = useState(0);
    const totalStandardPrice = carts?.reduce((sum, cur) => sum + (cur.book.priceStandard * cur.count), 0);
    const totalResultPrice = carts?.reduce((sum, cur) => sum + (cur.book.priceSales * cur.count), 0);
    const totalSalePrice = totalStandardPrice - totalResultPrice;

    // 주문하기
    const [isOrderConfirm, setIsOrderConfirm] = useState(false);
    const handleOrderOpen = useCallback(() => {
        if (isEmpty) return;
        setIsOrderConfirm(true);
    }, []);
    const handleOrderConfirm = useCallback(() => {
        if (isEmpty) return;
        addOrder(carts, totalResultPrice, "buy");
        removeCartAll();
        setCartTotalCount(0);
    }, [carts, totalResultPrice]);

    // 선물하기
    const [isPresentConfirm, setIsPresentConfirm] = useState(false);
    const handlePresentOpen = useCallback(() => {
        if (isEmpty) return;
        setIsPresentConfirm(true);
    }, []);
    const handlePresentConfirm = useCallback(() => {
        if (isEmpty) return;
        addOrder(carts, totalResultPrice, "present");
        removeCartAll();
        setCartTotalCount(0);
    }, [carts, totalResultPrice]);

    return (
      <div>
        <div className={styles.aside}>
          <div className={styles.aside_box_upper}>
            <p className={styles.key}>
              상품 금액<span className={styles.value}>{totalStandardPrice.toLocaleString()}원</span>
            </p>
            <p className={styles.key}>
              배송비<span className={styles.value}>+{(deliveryPrice).toLocaleString()}원</span>
            </p>
            <p className={styles.key}>
              상품 할인<span className={styles.value}>-{totalSalePrice.toLocaleString()}원</span>
            </p>
          </div>
          <div className={styles.aside_box_body}>
            <p className={styles.key}>
              결제 예정 금액<span className={styles.value}>{totalResultPrice.toLocaleString()}원</span>
            </p>
            <button className={styles.btn_buy} onClick={handleOrderOpen}>주문하기 ({cartTotalCount})</button>
            <button className={styles.btn_present} onClick={handlePresentOpen}>선물하기</button>
          </div>
        </div>
        <div>
          <OrderConfirm
            count={cartTotalCount}
            isOpen={isOrderConfirm}
            onOpen={setIsOrderConfirm}
            onConfirm={handleOrderConfirm}
          />
          <OrderConfirm
            count={cartTotalCount}
            isOpen={isPresentConfirm}
            onOpen={setIsPresentConfirm}
            onConfirm={handlePresentConfirm}
          />
        </div>
      </div>
    );
}