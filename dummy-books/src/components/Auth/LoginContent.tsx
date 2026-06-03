'use client';

import styles from "@/app/login/login.module.css"
import { getLogin, isLoginEmpty, loginUser } from "@/utils/services/userUtils";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, KeyboardEvent, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginData } from "@/types/UserData";
import { HeaderContext } from "@/context/HeaderContext";
import PasswordInput from "./PasswordInput";
import { getCarts } from "@/utils/services/cartUtils";

export default function LoginContent() {
    // 이미 로그인 되어있으면 자동으로 마이페이지
    const router = useRouter();
    const [checkLogin, setCheckLogin] = useState(false);
    const [login, setLogin] = useState<LoginData>({ isLogined: false, idx: 0, id: "0", nickname: "" });
    useEffect(() => { setLogin(getLogin()); setCheckLogin(true); }, []);
    const isLogined = !isLoginEmpty(login) && login.isLogined;
    useEffect(() => {
        if (!isLogined) return;
        router.push(`/mypage/${login.id}`);
    }, [login, checkLogin]);
    
    const { setLoginId, setCartTotalCount } = useContext(HeaderContext);
    
    // 경고
    const [warningString, setWarningString] = useState("");
    const isLoginFail = (warningString);

    // 유저 아이디 - input 입력
    const [userId, setUserId] = useState("");
    const handleChangeUserId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    }, []);

    // 유저 비밀번호 - input 입력
    const [userPassword, setUserPassword] = useState("");
    const handleChangeUserPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUserPassword(e.target.value);
    }, []);

    // 비밀번호 표시 toggle
    const [isHiddenPassword, setIsHiddenPassword] = useState(true);
    const handleToggleIsHiddenPassword = useCallback(() => {
        setIsHiddenPassword(!isHiddenPassword);
    }, [isHiddenPassword]);

    // 로그인
    const handleLogin = useCallback(() => {
        if (!loginUser(userId, userPassword))
            return setWarningString("아이디 또는 비밀번호가 올바르지 않습니다.");

        setWarningString("");
        setLoginId(userId);
        setCartTotalCount(getCarts()?.reduce((sum, cur) => sum + (cur.count ? cur.count : 0), 0));
        router.push(`/mypage/${userId}`);

    }, [userId, userPassword]);
    const handleLoginKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleLogin();
    }, [userId, userPassword]);

    return (
        <div>
            {checkLogin &&
            <div className={styles.container}>
                <Image
                className={styles.img_logo}
                src="/images/logo.png"
                width={180}
                height={100}
                alt=""
                />
                <p className={styles.title}>로그인</p>
                {isLoginFail && <p className={styles.warning}>{warningString}</p>}
                <input className={styles.input_id} type="text" placeholder="아이디" onChange={handleChangeUserId} onKeyDown={handleLoginKeyDown}/>
                <PasswordInput isHiddenPassword={isHiddenPassword} handleChangeUserPassword={handleChangeUserPassword} handleLoginKeyDown={handleLoginKeyDown} handleToggleIsHiddenPassword={handleToggleIsHiddenPassword} />
                <button className={styles.btn_login} onClick={handleLogin}>로그인</button>
                <Link className={styles.register} href={(`/register`)}>회원가입</Link>
            </div>}
        </div>
    );
}