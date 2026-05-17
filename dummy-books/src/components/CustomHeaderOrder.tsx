'use client';

import styles from "@/components/CustomHeader.module.css";
import { LoginData } from "@/types/UseData";
import { useLoginState } from "@/utils/userUtils";
import Link from "next/link";

export default function CustomHeaderOrder() {
    const [isLogined, isVerifyId, login] = useLoginState("0");
    const id = (login && isLogined ? (login as LoginData).id : 0);
    
    return (
        <Link className={styles.btn_order} href={(`/mypage/${id}/order`)}>주문조회</Link>
    );
}