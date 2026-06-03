'use client';

import styles from "@/components/Layout/CustomHeader.module.css"
import { HeaderContext } from "@/context/HeaderContext";
import { GetCarts } from "@/utils/services/cartUtils";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function CustomHeaderCart() {
    const loginId = useContext(HeaderContext).loginId;
    const isLogined = (loginId && loginId !== "0");
    
    const resetUpdateHeader = useContext(HeaderContext).resetUpdateHeader;
    const addUpdateHeader = useContext(HeaderContext).addUpdateHeader;

    const cartTotalCount = useContext(HeaderContext).cartTotalCount;
    const isCartsEmpty = (!cartTotalCount ||cartTotalCount === 0);
    const setCartTotalCount = useContext(HeaderContext).setCartTotalCount;

    useEffect(() => {
        setCartTotalCount(GetCarts()?.reduce((sum, cur) => sum + (cur.count ? cur.count : 0), 0));

        resetUpdateHeader();
        addUpdateHeader(() => { 
            setCartTotalCount(GetCarts()?.reduce((sum, cur) => sum + (cur.count ? cur.count : 0), 0)); 
        });
    }, []);

    return (
        <div>
            <Link className={styles.btn_cart} href={(`/mypage/${loginId}/cart`)}>장바구니
                {!isCartsEmpty && <p className={styles.cart_count}>{cartTotalCount}</p>}
            </Link>
        </div>
    );
}