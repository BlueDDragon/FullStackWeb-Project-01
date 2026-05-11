import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import img_logo from "@/app/_images/logo.png"
import img_search from "@/app/_images/search.png"
import BestBookList from "./_components/BestBookList";

export default function Home() {
  return (
    <div className={styles.home_container}>
      <button className={styles.btn_menu}>Menu</button>
      <Link href={"/"}>
        <Image className={styles.img_logo} src={img_logo} width={180} height={100} alt="" />
        <span className={styles.logo}>DummyBooks</span>
      </Link>
      <div className={styles.search}>
        <button className={styles.btn_searchcategory}>통합검색▼</button>
        <input className={styles.input_searchbar} placeholder="도서 검색"></input>
        <Image className={styles.img_search} src={img_search} width={20} height={20} alt="" />
      </div>
      <div className={styles.side}>
        <button className={styles.btn_cart}>장바구니</button>
        <button className={styles.btn_mypage}>마이페이지</button>
      </div>
      <div>
        <BestBookList/>
      </div>
    </div>
  );
}
