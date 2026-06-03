'use client';

import styles from "@/app/mypage/[id]/cart/cart.module.css"
import { CartData } from "@/types/CartData";
import { getCarts } from "@/utils/services/cartUtils";
import { useContext, useEffect, useState } from "react";
import CartAside from "./CartAside";
import CartList from "./CartList";
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
    const updateCarts =() => {
        const tempCart = getCarts();
        setCarts(tempCart);
        setCartTotalCount(tempCart.reduce((sum, cur) => sum + (cur.count ? cur.count : 0), 0));
    };

    return (
        <LoginGuard isLogined={isLogined} isVerifyId={isVerifyId}>
            <div className={styles.container}>
                <CartList carts={carts} updateCarts={updateCarts}/>
                <CartAside carts={carts}/>
            </div>
        </LoginGuard>
    );
}