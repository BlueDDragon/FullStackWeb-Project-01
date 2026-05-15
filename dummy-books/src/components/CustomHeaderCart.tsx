'use client';

import styles from "@/components/CustomHeader.module.css"
import { CartData } from "@/types/CartData";
import { GetCarts } from "@/utils/cartUtils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomHeaderCart() {
    const [carts, setCarts] = useState<CartData[]>([]);
    useEffect(() => { setCarts(GetCarts()); }, []);

    const isCartsEmpty = (!carts || !Array.isArray(carts) || carts.length === 0);
    const cartCount = (isCartsEmpty ? 0 : carts.length);

    return (
        <div>
            <Link className={styles.btn_cart} href={(`/mypage/0/cart`)}>장바구니
                {!isCartsEmpty && <p className={styles.cart_count}>{cartCount}</p>}
            </Link>
        </div>
    );
}