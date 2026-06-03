import styles from "@/app/login/login.module.css"
import Image from "next/image";
import { ChangeEvent, KeyboardEvent, Ref } from "react";

type PasswordInputProps = {
    isHiddenPassword: boolean;
    inputPasswordRef?: Ref<HTMLInputElement>;
    handleChangeUserPassword: (e: ChangeEvent<HTMLInputElement>) => void;
    handleLoginKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    handleToggleIsHiddenPassword: () => void;
};

export default function PasswordInput({ isHiddenPassword, inputPasswordRef, handleChangeUserPassword, handleLoginKeyDown, handleToggleIsHiddenPassword }: PasswordInputProps) {
    return (
        <div className={styles.password_box}>
            <input className={styles.input_password} type={isHiddenPassword ? "password" : "text"} ref={inputPasswordRef} placeholder="비밀번호" onChange={handleChangeUserPassword} onKeyDown={handleLoginKeyDown}/>
            {isHiddenPassword && <Image className={styles.img_password} src={(`/images/register_password_hidden.png`)} width={50} height={50} alt="" onClick={handleToggleIsHiddenPassword}/>}
            {!isHiddenPassword && <Image className={styles.img_password} src={(`/images/register_password_show.png`)} width={50} height={50} alt="" onClick={handleToggleIsHiddenPassword}/>}
        </div>
    );
}