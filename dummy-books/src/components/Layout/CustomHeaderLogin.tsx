'use client';

import styles from "@/components/Layout/CustomHeader.module.css"
import { HeaderContext } from "@/context/HeaderContext";
import Link from "next/link";
import { useContext } from "react";

export default function CustomHeaderLogin() {
    const loginId = useContext(HeaderContext).loginId;
    const isLogined = (loginId && loginId !== "0");
    
    return (
        <div>
            {!isLogined && <Link className={styles.btn_login} href={(`/login`)}>로그인</Link>}
            {/* {!isLogin && <Link className={styles.btn_register} href={(`/register`)}>회원가입</Link>} */}
            {isLogined && <Link className={styles.btn_mypage} href={(`/mypage/${loginId}`)}>마이페이지</Link>}
        </div>
    );
}