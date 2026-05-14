import styles from "@/components/CustomHeader.module.css";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function CustomHearder() {  
    return (
        <div className={styles.header}>
          <div className={styles.container}>
            <Link href={"/"}>
              <Image
                className={styles.img_logo}
                src="/images/logo.png"
                width={180}
                height={100}
                alt=""
              />
              <span className={styles.logo}>DummyBooks</span>
            </Link>

            <SearchBar />

            <div className={styles.side}>
              <Link className={styles.btn_cart} href={(`/mypage/0/cart`)}>장바구니</Link>
              <Link className={styles.btn_order} href={(`/mypage/0/order`)}>주문조회</Link>
              <Link className={styles.btn_wish} href={(`/mypage/0/wish`)}>보관함</Link>
            </div>
          </div>
        </div>
    );
}