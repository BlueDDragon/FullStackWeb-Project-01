import styles from "@/components/CustomFooter.module.css"

export default function CustomFooter() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_inner}>
                <p className={styles.company}>Dummy Books</p>
                <p className={styles.menu}>회사소개 | 이용약관 | 개인정보처리방침 | 청소년보호정책 | 대량구매서비스 | 협력사 | 채용정보 | 광고소개</p>
                <p className={styles.info}>(주)더미북스 | 서울 금천구 독산로50길 23 | 1666 - 1111 | FAX : 0000-000-0000</p>
                <p className={styles.info}>서울특별시 통신판매업신고번호 : 제 000호</p>
            </div>
        </div>
    );
}