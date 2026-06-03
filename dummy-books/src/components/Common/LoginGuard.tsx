import styles from "./LoginGuard.module.css"
import Empty from "@/components/Common/Empty";
import Link from "next/link";

type LoginGuardProps = {
    isLogined: boolean;
    isVerifyId: boolean;
    children: React.ReactNode;
}

export default function LoginGuard({ isLogined, isVerifyId, children }: LoginGuardProps) {
    if (!isLogined) {
        return (
            <div className={styles.body_warning}>
                <Empty info="로그인이 필요합니다."/>
                <div className={styles.link_box}>
                    <Link className={styles.register} href={(`/register`)}>회원가입</Link>
                    <Link className={styles.login} href={(`/login`)}>로그인</Link>
                </div>
            </div>
        );
    }

    if (!isVerifyId) {
        return (
            <div className={styles.body_warning}>
                <Empty info="접근할 수 없습니다."/>
            </div>
        );
    }

    return (
        children
    );
}