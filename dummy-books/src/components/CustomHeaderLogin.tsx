'use client';

import styles from "@/components/CustomHeader.module.css"
import { LoginData } from "@/types/UseData";
import { useLoginState } from "@/utils/userUtils";
import Link from "next/link";

export default function CustomHeaderLogin() {
    const [isLogined, isVerifyId, login] = useLoginState("0");
    const id = (login && isLogined ? (login as LoginData).id : 0);

    return (
        <div>
            {!isLogined && <Link className={styles.btn_login} href={(`/login`)}>로그인</Link>}
            {/* {!isLogin && <Link className={styles.btn_register} href={(`/register`)}>회원가입</Link>} */}
            {isLogined && <Link className={styles.btn_mypage} href={(`/mypage/${id}`)}>마이페이지</Link>}
        </div>
    );
}