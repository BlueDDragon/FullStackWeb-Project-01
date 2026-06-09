'use client';

import styles from "@/components/Layout/CustomHeader.module.css"
import { HeaderContext } from "@/context/HeaderContext";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function CustomHeaderCart() {
    const { loginId, cartTotalCount } = useContext(HeaderContext);
    const isCartsEmpty = (!cartTotalCount ||cartTotalCount === 0);

    return (
        <div>
            <Link className={styles.btn_cart} href={(`/mypage/${loginId}/cart`)}>장바구니
                {!isCartsEmpty && <p className={styles.cart_count}>{cartTotalCount}</p>}
            </Link>
        </div>
    );
}