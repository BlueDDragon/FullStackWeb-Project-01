import styles from "@/components/CustomHeader.module.css";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function CustomHearder() {
    return (
        <div className={styles.header}>
          <div className={styles.container}>
            <button className={styles.btn_menu}>Menu</button>
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
              <button className={styles.btn_cart}>장바구니</button>
              <button className={styles.btn_mypage}>마이페이지</button>
            </div>
          </div>
        </div>
    );
}