'use client';

import styles from "@/app/mypage/[id]/mypage.module.css"
import { GetLogin, IsAlreadyLogin, IsLoginEmpty } from "@/utils/userUtils";
import Empty from "../Empty/Empty";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginData } from "@/types/UseData";
import { useParams } from "next/navigation";

type MyPageContentProps = {
    id: string;
}

export default function MyPageContent({ id }: MyPageContentProps) {
    const [login, setLogin] = useState<LoginData>({ isLogined: false, idx: 0, id: "0", nickname: "" });
    useEffect(() => { setLogin(GetLogin()); }, []);
    const isLogined = !IsLoginEmpty(login) && login.isLogined;
    const isVerifyId = login.id === id;

    return (
        <div className={styles.container}>
            <div className={styles.upper}>
                <p className={styles.count}>내 정보</p>
            </div>

            {isLogined && isVerifyId &&
            <div className={styles.body}>
                <div className={styles.user_container}>
                    <p className={styles.user_subtitle}>닉네임</p>
                    <p className={styles.user_info}>{login.nickname}님</p>
                </div>
                <div className={styles.user_container}>
                    <p className={styles.user_subtitle}>아이디</p>
                    <p className={styles.user_info}>{login.id}</p>
                </div>
                <div className={styles.btns_box}>
                    <Link className={styles.btn_link} href={(`/mypage/${id}/cart`)}>장바구니</Link>
                    <Link className={styles.btn_link} href={(`/mypage/${id}/order`)}>주문조회</Link>
                    <Link className={styles.btn_link} href={(`/mypage/${id}/wish`)}>보관함</Link>
                    <button className={styles.btn_logout}>로그아웃</button>
                </div>
            </div>}

            {!isLogined &&
            <div className={styles.body_warning}>
                <Empty info="로그인이 필요합니다."/>
                <div className={styles.link_box}>
                    <Link className={styles.register} href={(`/register`)}>회원가입</Link>
                    <Link className={styles.login} href={(`/login`)}>로그인</Link>
                </div>
            </div>}

            {!isVerifyId &&
            <div className={styles.body_warning}>
                <Empty info="접근할 수 없습니다."/>
            </div>}
        </div>
    );
}