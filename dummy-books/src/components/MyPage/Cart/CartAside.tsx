'use client';

import styles from "@/app/mypage/[id]/cart/cart.module.css"
import OrderConfirm from "@/components/Confirm/OrderConfirm";
import { CartPriceContext } from "@/context/CartPriceContext";
import { HeaderContext } from "@/context/HeaderContext";
import { CartData } from "@/types/CartData";
import { IsCartEmpty, RemoveCartAll } from "@/utils/services/cartUtils";
import { AddOrder } from "@/utils/services/orderUtils";
import { useCallback, useContext, useEffect, useState } from "react";

type CartAsideProps = {
    carts: CartData[];
};

export default function CartAside({ carts }: CartAsideProps) {
    const updateHeader = useContext(HeaderContext).updateHeader;

    // 기본 정보
    const isCartsEmpty = IsCartEmpty(carts);
    // const selectCarts = isCartsEmpty ? [] : carts;
    const deliveryPrice = isCartsEmpty ? 0 : 3000;
    // const totalCount = useContext(CartPriceContext).totalCount;
    const cartTotalCount = useContext(HeaderContext).cartTotalCount;

    // 가격 정보
    const totalStandardPrice = useContext(CartPriceContext).totalStandardPrice;
    const setTotalResultPrice = useContext(CartPriceContext).setTotalResultPrice;
    const totalResultPrice = useContext(CartPriceContext).totalResultPrice;
    const setTotalStandardPrice = useContext(CartPriceContext).setTotalStandardPrice;
    const [totalSalePrice, setTotalSalePrice] = useState(0);
    useEffect(() => {
      if (!carts) return;
      const tempStandard = carts.reduce((sum, cur) => sum + (cur.book.priceStandard * cur.count), 0);
      setTotalStandardPrice(tempStandard);

      const tempResult = carts.reduce((sum, cur) => sum + (cur.book.priceSales * cur.count), 0);
      setTotalResultPrice(tempResult + deliveryPrice);
      
      setTotalSalePrice(tempStandard - tempResult);
    }, [carts]);

    // 주문하기
    const [isOrderConfirm, setIsOrderConfirm] = useState(false);
    const handleOrderOpen = useCallback(() => {
        if (isCartsEmpty) return;
        setIsOrderConfirm(true);
    }, []);
    const handleOrderConfirm = useCallback(() => {
        if (isCartsEmpty) return;
        RemoveCartAll();
        AddOrder(carts, totalResultPrice, "buy");
        updateHeader?.();
    }, [carts]);

    // 선물하기
    const [isPresentConfirm, setIsPresentConfirm] = useState(false);
    const handlePresentOpen = useCallback(() => {
        if (isCartsEmpty) return;
        setIsPresentConfirm(true);
    }, []);
    const handlePresentConfirm = useCallback(() => {
        if (isCartsEmpty) return;
        RemoveCartAll();
        AddOrder(carts, totalResultPrice, "present");
        updateHeader?.();
    }, [carts]);

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