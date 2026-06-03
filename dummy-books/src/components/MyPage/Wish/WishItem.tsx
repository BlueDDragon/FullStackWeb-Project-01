import BookPriceDisplay from "@/components/BookPriceDisplay";
import styles from "@/components/MyPage/Wish/WishItem.module.css"
import { BookData } from "@/types/BookData";
import { GetSaleData } from "@/utils/saleUtils";
import Image from "next/image";
import Link from "next/link";

type WishItemProps = {
    book: BookData;
    onSelectBook: (book: BookData) => void;
    onDelWish: () => void;
    onCartOpen: (book: BookData) => void;
    onOrder: (book: BookData) => void;
}

export default function WishItem({ book, onDelWish, onSelectBook, onCartOpen, onOrder }: WishItemProps) {
    const handleDelWish = () => {
        onSelectBook(book);
        onDelWish();
    };
    const handleCartOpen = () => {
        onSelectBook(book);
        onCartOpen(book);
    };
    const handleOrder = () => {
        onOrder(book);
    };

    return (
      <div>
        <div className={styles.book}>
          <Image
            className={styles.cover}
            src={book.cover}
            width={180}
            height={261}
            alt=""
          />
          <div>
            <Link href={`/detail/${book.isbn13}`}>
              <p className={styles.title}>{book.title}</p>
            </Link>
            <p className={styles.description}>{book.author}</p>
            {/* <p className={styles.description}>{book.description}</p> */}
            <BookPriceDisplay book={book} isSimple={false}/>
          </div>

            <div className={styles.btns}>
                <button className={styles.btn_cart} onClick={handleCartOpen}>장바구니</button>
                <button className={styles.btn_buy} onClick={handleOrder}>바로구매</button>
            </div>

            <div>
                <button className={styles.btn_del} onClick={handleDelWish}>{"×"}</button>
            </div>
        </div>
      </div>
    );
}