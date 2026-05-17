'use client';

import styles from "@/components/CustomHeader.module.css"
import { CartData } from "@/types/CartData";
import { LoginData } from "@/types/UseData";
import { GetCarts } from "@/utils/cartUtils";
import { useLoginState } from "@/utils/userUtils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomHeaderCart() {
    const [isLogined, isVerifyId, login] = useLoginState("0");
    const id = (login && isLogined ? (login as LoginData).id : 0);
    
    const [carts, setCarts] = useState<CartData[]>([]);
    useEffect(() => { setCarts(GetCarts()); }, []);

    const isCartsEmpty = (!carts || !Array.isArray(carts) || carts.length === 0);
    const cartCount = (isCartsEmpty ? 0 : carts.length);

    return (
        <div>
            <Link className={styles.btn_cart} href={(`/mypage/${id}/cart`)}>장바구니
                {!isCartsEmpty && <p className={styles.cart_count}>{cartCount}</p>}
            </Link>
        </div>
    );
}