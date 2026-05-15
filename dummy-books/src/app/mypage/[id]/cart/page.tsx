'use client';

import styles from "@/app/mypage/[id]/cart/cart.module.css"
import DelCartConfirm from "@/components/Confirm/DelCartConfirm";
import OrderConfirm from "@/components/Confirm/OrderConfirm";
import Empty from "@/components/Empty/Empty";
import CartItem from "@/components/MyPage/Cart/CartItem";
import { BookData } from "@/types/BookData";
import { CartData } from "@/types/CartData";
import { GetCarts, IsCartEmpty, RemoveCart, RemoveCartAll } from "@/utils/cartUtils";
import { AddOrder } from "@/utils/orderUtils";
import { useEffect, useState } from "react";

export default function Page() {
    const [carts, setCarts] = useState<CartData[]>([]);
    const updateCarts = () => {
      setCarts(GetCarts());
      setTotalCount(carts.reduce((sum, cur) => sum + (cur.count), 0));
    };
    useEffect(() => updateCarts(), []);
    const isCartsEmpty = IsCartEmpty(carts);

    const deliveryPrice = isCartsEmpty ? 0 : 3000;
    const [totalCount, setTotalCount] = useState(0);
    const selectCarts= isCartsEmpty ? [] : carts;
    const [totalStandardPrice, setTotalStandardPrice] = useState(0);
    const [totalResultPrice, setTotalResultPrice] = useState(0);
    useEffect(() => {
      setTotalStandardPrice(selectCarts.reduce((sum, cur) => sum + (cur.book.priceStandard * cur.count), 0));
      setTotalResultPrice(selectCarts.reduce((sum, cur) => sum + (cur.book.priceSales * cur.count), 0) + deliveryPrice);
    }, [selectCarts]);
    const totalSalePrice = totalStandardPrice - totalResultPrice;

    const [isOrderConfirm, setIsOrderConfirm] = useState(false);
    const handleOrderOpen = () => {
        setIsOrderConfirm(true);
    };
    const handleOrderConfirm = () => {
        if (isCartsEmpty) return;
        RemoveCartAll();
        AddOrder(carts, totalResultPrice, "buy");
    };

    const [isPresentConfirm, setIsPresentConfirm] = useState(false);
    const handlePresentOpen = () => {
        setIsPresentConfirm(true);
    };
    const handlePresentConfirm = () => {
        if (isCartsEmpty) return;
        RemoveCartAll();
        AddOrder(carts, totalResultPrice, "present");
    };

    const [selectBook, setSelectBook] = useState<BookData>();
    const [isDelCartConfirm, setIsDelCartConfirm] = useState(false);
    const handleDelCartOpen = () => {
        setIsDelCartConfirm(true);
    };
    const handleDelCartConfirm = () => {
        if (!selectBook) return;
        RemoveCart(selectBook);
        updateCarts();
        setIsDelCartConfirm(false);
    };

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.upper}>
            <p className={styles.count}>장바구니 ({totalCount})</p>
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
                  onUpdatePrice={updateCarts}
                />
              ))}
            {isCartsEmpty && <Empty info="장바구니가 비어 있습니다." />}
          </div>
        </div>
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
            <button className={styles.btn_buy} onClick={handleOrderOpen}>주문하기 ({totalCount})</button>
            <button className={styles.btn_present} onClick={handlePresentOpen}>선물하기</button>
          </div>
        </div>
        <div>
          <OrderConfirm
            count={totalCount}
            isOpen={isOrderConfirm}
            onOpen={setIsOrderConfirm}
            onConfirm={handleOrderConfirm}
          />
          <OrderConfirm
            count={totalCount}
            isOpen={isPresentConfirm}
            onOpen={setIsPresentConfirm}
            onConfirm={handlePresentConfirm}
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