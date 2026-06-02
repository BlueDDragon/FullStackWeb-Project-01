'use client';

import styles from "@/components/Header/CustomHeader.module.css";
import { HeaderContext } from "@/context/HeaderContext";
import Link from "next/link";
import { useContext } from "react";

export default function CustomHeaderWish() {
    const loginId = useContext(HeaderContext).loginId;
    const isLogined = (!loginId && loginId !== "0");
    
    return (
        <Link className={styles.btn_order} href={(`/mypage/${loginId}/wish`)}>보관함</Link>
    );
}