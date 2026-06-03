'use client';

import styles from "@/app/mypage/[id]/cart/cart.module.css"
import { CartData } from "@/types/CartData";
import { GetCarts } from "@/utils/services/cartUtils";
import { useContext, useEffect, useState } from "react";
import CartAside from "./CartAside";
import CartList from "./CartList";
import { CartPriceContext } from "@/context/CartPriceContext";
import { useLoginState } from "@/utils/services/userUtils";
import { HeaderContext } from "@/context/HeaderContext";
import LoginGuard from "@/components/Common/LoginGuard";

type CartContentProps = {
    id: string;
}

export default function CartContent({ id }: CartContentProps) {
    const { isLogined, isVerifyId, login } = useLoginState(id);
    const setCartTotalCount = useContext(HeaderContext).setCartTotalCount;

    // 장바구니 정보
    const [carts, setCarts] = useState<CartData[]>([]);
    useEffect(() => {
        updateCarts();
    }, []);
    
    // 장바구니 개수 합계
    // const [totalCount, setTotalCount] = useState(0);
    const updateCarts =() => {
      setCarts(GetCarts());
      const tempTotal = carts.reduce((sum, cur) => sum + (cur.count ? cur.count : 0), 0);
    //   setTotalCount(tempTotal);
      setCartTotalCount(tempTotal);
    };
    
    // 상품 금액, 결제 예정 금액
    const [totalStandardPrice, setTotalStandardPrice] = useState(0);
    const [totalResultPrice, setTotalResultPrice] = useState(0);

    return (
        <LoginGuard isLogined={isLogined} isVerifyId={isVerifyId}>
            <div className={styles.container}>
                <CartPriceContext.Provider value={{ /*totalCount,*/ 
                    totalStandardPrice, setTotalStandardPrice,
                    totalResultPrice, setTotalResultPrice, }}>
                    <CartList carts={carts} updateCarts={updateCarts}/>
                    <CartAside carts={carts}/>
                </CartPriceContext.Provider>
            </div>
        </LoginGuard>
    );
}