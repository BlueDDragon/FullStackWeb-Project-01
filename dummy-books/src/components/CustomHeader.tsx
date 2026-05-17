import styles from "@/components/CustomHeader.module.css";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar/SearchBar";
import CustomHeaderCart from "./CustomHeaderCart";
import CustomHeaderLogin from "./CustomHeaderLogin";
import CustomHeaderOrder from "./CustomHeaderOrder";
import CustomHeaderWish from "./CustomHeaderWish";

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
              <CustomHeaderCart />
              <CustomHeaderOrder />
              <CustomHeaderWish />
              <CustomHeaderLogin />
            </div>
          </div>
        </div>
    );
}