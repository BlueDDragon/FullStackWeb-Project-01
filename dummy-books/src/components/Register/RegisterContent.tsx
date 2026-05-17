'use client';

import styles from "@/app/register/register.module.css"
import { AddUser, GetLogin, IsLoginEmpty, IsUserIdDuplicate } from "@/utils/userUtils";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import ConfirmPopup from "../Confirm/ConfirmPopup";
import { useRouter } from "next/navigation";
import { LoginData } from "@/types/UseData";

function CheckId(id: string) {
    if (!id || id === null || id === "" || id === undefined)
        return '아이디 입력은 필수입니다.';

    if (id.search(/\s/) != -1) 
        return '아이디는 빈 칸을 포함할 수 없습니다.';

    if (id.length < 6 || id.length > 30)
        return '아이디는 영문 및 숫자 6~30자 입니다.';

    var specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (specialCheck.test(id))
        return '아이디는 특수문자를 포함할 수 없습니다.';

    const koreanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (koreanCheck.test(id))
        return '아이디는 한글을 포함할 수 없습니다.';

    const isUserIdDuplicate = IsUserIdDuplicate(id);
    if (isUserIdDuplicate)
        return '아이디가 중복되어 사용할 수 없습니다.';

    return '';
}

function CheckPassword(password: string, rePassword: string) {
    if (!password || password === null || password === "" || password === undefined)
        return '비밀번호 입력은 필수입니다.';
    
    if (!rePassword || rePassword === null || rePassword === "" || rePassword === undefined || rePassword != password)
        return '비밀번호가 일치하지 않습니다.';

    if (password.search(/\s/) != -1) 
        return '비밀번호는 빈 칸을 포함할 수 없습니다.';

    if (password.length < 8 || password.length > 20)
        return '비밀번호는 영문 및 숫자 8~16자 입니다.';

    var specialCheck = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (!specialCheck.test(password))
        return '비밀번호는 특수문자를 포함해야합니다.';

    const koreanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (koreanCheck.test(password))
        return '비밀번호는 한글을 포함할 수 없습니다.';

    return '';
}

function CheckNickname(nickname: string) {
    if (!nickname || nickname === null || nickname === "" || nickname === undefined)
        return '닉네임 입력은 필수입니다.';

    // if (nickname.search(/\s/) != -1) 
    //     return '닉네임은 빈 칸을 포함할 수 없습니다.';

    if (nickname.length < 2 || nickname.length > 20)
        return '닉네임은 한글, 영문 및 숫자 2~20자 입니다.';

    return '';
}

export default function RegisterContent() {
    // 이미 로그인 되어있으면 자동으로 마이페이지
    const router = useRouter();
    const [checkLogin, setCheckLogin] = useState(false);
    const [login, setLogin] = useState<LoginData>({ isLogined: false, idx: 0, id: "0", nickname: "" });
    useEffect(() => { setLogin(GetLogin()); setCheckLogin(true); }, []);
    const isLogined = !IsLoginEmpty(login) && login.isLogined;
    useEffect(() => {
        if (!isLogined) return;
        router.push(`/mypage/${login.id}`);
    }, [login, checkLogin]);
    
    // 경고 정보
    // const [isRegisterFail, setIsRegisterFail] = useState(false);
    const [warningString, setWarningString] = useState("");
    const isRegisterFail = (warningString);

    // 유저 아이디 - input 입력
    const inputIdRef = useRef<HTMLInputElement>(null);
    const [userId, setUserId] = useState("");
    const handleChangeUserId = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    }, []);

    // 유저 비밀번호 - input 입력
    const inputPasswordRef = useRef<HTMLInputElement>(null);
    const [userPassword, setUserPassword] = useState("");
    const handleChangeUserPassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUserPassword(e.target.value);
    }, []);

    // 비밀번호 표시 toggle
    const [isHiddenPassword, setIsHiddenPassword] = useState(true);
    const handleToggleIsHiddenPassword = useCallback(() => {
        setIsHiddenPassword(!isHiddenPassword);
    }, [isHiddenPassword]);
    
    // 유저 비밀번호 재입력 - input 입력
    const inputRePasswordRef = useRef<HTMLInputElement>(null);
    const [userRePassword, setUserRePassword] = useState("");
    const handleChangeUserRePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUserRePassword(e.target.value);
    }, []);

    // 비밀번호 재입력 표시 toggle
    const [isHiddenRePassword, setIsHiddenRePassword] = useState(true);
    const handleToggleIsHiddenRePassword = useCallback(() => {
        setIsHiddenRePassword(!isHiddenRePassword);
    }, [isHiddenRePassword]);

    // 유저 닉네임 - input 입력
    const inputNicknameRef = useRef<HTMLInputElement>(null);
    const [userNickname, setUserNickname] = useState("");
    const handleChangeUserNickname = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setUserNickname(e.target.value);
    }, []);

    // 정보 제공 동의
    const inputAgreeRef = useRef<HTMLInputElement>(null);
    const [isUserAgree, setIsUserAgree] = useState(false);
    const handleToggleIsUserAgree = useCallback(() => {
        setIsUserAgree(!isUserAgree);
    }, [isUserAgree]);

    // 회원가입
    const handleRegister = useCallback(() => {
        let warning = "";

        warning = CheckId(userId);
        if (warning) return setWarningString(warning); // 아이디 사용 불가
        
        warning = CheckPassword(userPassword, userRePassword);
        if (warning) return setWarningString(warning); // 비밀번호 사용 불가

        warning = CheckNickname(userNickname);
        if (warning) return setWarningString(warning); // 닉네임 사용 불가

        if (!isUserAgree) return setWarningString("정보 제공에 동의해야합니다.");

        setWarningString("");
        AddUser(userId, userPassword, userNickname);
        setIsConfirmOpen(true);

        // 입력 정보 리셋
        if (inputIdRef.current) inputIdRef.current.value = "";
        if (inputPasswordRef.current) inputPasswordRef.current.value = "";
        if (inputRePasswordRef.current) inputRePasswordRef.current.value = "";
        if (inputNicknameRef.current) inputNicknameRef.current.value = "";
        if (inputAgreeRef.current) inputAgreeRef.current.checked = false;

        setUserId("");
        setUserPassword("");
        setUserRePassword("");
        setUserNickname("");
        setIsUserAgree(false);

    }, [userId, userPassword, userRePassword, userNickname, isUserAgree]);
    const handleRegisterKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleRegister();
    }, [userId, userPassword, userRePassword, userNickname, isUserAgree]);

    // 회원가입 성공
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
                <p className={styles.title}>회원가입</p>
                {isRegisterFail && <p className={styles.warning}>{warningString}</p>}
                <input className={styles.input_id} type="text" placeholder="아이디" onChange={handleChangeUserId} onKeyDown={handleRegisterKeyDown} ref={inputIdRef}/>
                <div className={styles.password_box}>
                    <input className={styles.input_password} type={isHiddenPassword ? "password" : "text"} placeholder="비밀번호" onChange={handleChangeUserPassword} onKeyDown={handleRegisterKeyDown} ref={inputPasswordRef}/>
                    {isHiddenPassword && <Image className={styles.img_password} src={(`/images/register_password_hidden.png`)} width={50} height={50} alt="" onClick={handleToggleIsHiddenPassword}/>}
                    {!isHiddenPassword && <Image className={styles.img_password} src={(`/images/register_password_show.png`)} width={50} height={50} alt="" onClick={handleToggleIsHiddenPassword}/>}
                </div>
                <div className={styles.password_box}>
                    <input className={styles.input_password} type={isHiddenRePassword ? "password" : "text"} placeholder="비밀번호 재입력" onChange={handleChangeUserRePassword} onKeyDown={handleRegisterKeyDown} ref={inputRePasswordRef}/>
                    {isHiddenRePassword && <Image className={styles.img_password} src={(`/images/register_password_hidden.png`)} width={50} height={50} alt="" onClick={handleToggleIsHiddenRePassword}/>}
                    {!isHiddenRePassword && <Image className={styles.img_password} src={(`/images/register_password_show.png`)} width={50} height={50} alt="" onClick={handleToggleIsHiddenRePassword}/>}
                </div>
                <input className={styles.input_nickname} type="text" placeholder="닉네임" onChange={handleChangeUserNickname} onKeyDown={handleRegisterKeyDown} ref={inputNicknameRef}/>
                <div className={styles.agree_box}>
                    <p className={styles.agree_info}>정보 제공에 동의하시겠습니까?</p>
                    <input className={styles.checkbox} type="checkbox" onClick={handleToggleIsUserAgree} ref={inputAgreeRef}/>
                </div>
                <button className={styles.btn_login} onClick={handleRegister}>회원가입</button>
                <Link className={styles.login} href={(`/login`)}>로그인</Link>

                <div>
                    <ConfirmPopup
                    info={ `성공적으로 회원가입을 마쳤습니다.\n로그인 하시겠습니까?`}
                    no={`취소`}
                    yes={`로그인`}
                    routerURL={`/login`}
                    isOpen={isConfirmOpen}
                    onOpen={setIsConfirmOpen}
                    />
                </div>
            </div>}
        </div>
    );
}