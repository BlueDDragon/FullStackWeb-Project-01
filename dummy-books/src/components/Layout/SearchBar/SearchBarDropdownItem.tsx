import styles from "@/components/Layout/SearchBar/SearchBarDropdownItem.module.css"
import { BookData } from "@/types/BookData";
import Image from "next/image";
import Link from "next/link";
import { getSaleData } from "@/utils/services/saleUtils";
import { addCart, getCartTotalCount } from "@/utils/services/cartUtils";
import { useCallback, useContext } from "react";
import { HeaderContext } from "@/context/HeaderContext";
import { usePathname } from "next/navigation";

type SearchBarDropdownItemProps = {
    book: BookData;
    onCartOpen: () => void;
};

export default function SearchBarDropdownItem({ book, onCartOpen }: SearchBarDropdownItemProps) {
  const paths = usePathname().split('/');
  const { setCartTotalCount } = useContext(HeaderContext);

  // 장바구니 확인창
  const handleCartOpen = useCallback(() => {
    addCart({ book: book, count: 1 });
    setCartTotalCount(getCartTotalCount());

    console.log(`paths: ${paths}`);
    if (paths.length > 3 && paths[1] === 'mypage' && paths[3] === 'cart')
      window.location.reload();
    else
      onCartOpen();
  }, [book]);

  // 세일 정보
  const { priceSales, priceStandard, isSale, percentSale } = getSaleData(book);

  return (
    <div>
      <div className={styles.container}>
        <Link className={styles.book_container} href={`/detail/${book.isbn13}`}>
          <Image
            className={styles.img}
            src={book.cover}
            width={100}
            height={180}
            alt=""
          />
          <div className={styles.box}>
            <p className={styles.title}>{book.title}</p>
            <p className={styles.author}>{book.author}</p>
            <p className={styles.price}>
              {isSale && <span className={styles.sale}>{`${percentSale}%`}</span>}
              {(isSale ? priceSales : priceStandard).toLocaleString()}원
            </p>
          </div>
        </Link>
        <button className={styles.btn_cart} onClick={handleCartOpen}>장바구니</button>
      </div>
    </div>
  );
}