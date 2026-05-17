'use client';

import styles from "@/components/CustomHeader.module.css"
import { LoginData } from "@/types/UseData";
import { GetLogin, IsLoginEmpty } from "@/utils/userUtils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomHeaderLogin() {
    const [login, setLogin] = useState<LoginData>({ isLogined: false, idx: 0, id: "0", nickname: "" });
    useEffect(() => { setLogin(GetLogin()); }, []);
    const isLogined = !IsLoginEmpty(login) && login.isLogined;

    return (
        <div>
            {!isLogined && <Link className={styles.btn_login} href={(`/login`)}>로그인</Link>}
            {/* {!isLogin && <Link className={styles.btn_register} href={(`/register`)}>회원가입</Link>} */}
            {isLogined && <Link className={styles.btn_mypage} href={(`/mypage/${login.id}`)}>마이페이지</Link>}
        </div>
    );
}