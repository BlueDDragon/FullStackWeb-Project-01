'use client';

import styles from "@/app/mypage/[id]/cart/cart.module.css"
import { BookData } from "@/types/BookData";
import { CartData } from "@/types/CartData";
import { GetCartTotalCount, IsCartEmpty, RemoveCart } from "@/utils/services/cartUtils";
import { useCallback, useContext, useState } from "react";
import CartItem from "./CartItem";
import Empty from "@/components/Common/Empty";
import DelCartConfirm from "@/components/Confirm/DelCartConfirm";
import { HeaderContext } from "@/context/HeaderContext";

type CartListProps = {
  carts: CartData[];
  updateCarts: () => void;
};

export default function CartList({ carts, updateCarts }: CartListProps) {
    const { cartTotalCount, setCartTotalCount } = useContext(HeaderContext);

    // 기본 정보
    const isCartsEmpty = IsCartEmpty(carts);

    // 장바구니 삭제
    const [selectBook, setSelectBook] = useState<BookData>();
    const [isDelCartConfirm, setIsDelCartConfirm] = useState(false);
    const handleDelCartOpen = useCallback(() => {
        setIsDelCartConfirm(true);
    }, []);
    const handleDelCartConfirm = useCallback(() => {
        if (!selectBook) return;
        RemoveCart(selectBook);
        updateCarts();
        setCartTotalCount(GetCartTotalCount());
        setIsDelCartConfirm(false);
        window.location.reload();
    }, [selectBook]);

    return (
      <div className={styles.content}>
        <div className={styles.upper}>
          <p className={styles.count}>장바구니 ({cartTotalCount})</p>
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
        <div>
          <DelCartConfirm
            isOpen={isDelCartConfirm}
            onOpen={setIsDelCartConfirm}
            onConfirm={handleDelCartConfirm}
          />
        </div>
      </div>
    );
}