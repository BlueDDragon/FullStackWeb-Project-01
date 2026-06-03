'use client';

import styles from "@/components/Layout/CustomHeader.module.css";
import { HeaderContext } from "@/context/HeaderContext";
import Link from "next/link";
import { useContext } from "react";

export default function CustomHeaderOrder() {
    const loginId = useContext(HeaderContext).loginId;
    const isLogined = (!loginId && loginId !== "0");
    
    return (
        <Link className={styles.btn_order} href={(`/mypage/${loginId}/order`)}>주문조회</Link>
    );
}