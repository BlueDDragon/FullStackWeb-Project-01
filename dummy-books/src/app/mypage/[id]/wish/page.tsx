'use client';

import styles from "@/app/mypage/[id]/wish/wish.module.css"
import Empty from "@/components/Empty/Empty";
import WishItem from "@/components/MyPage/Wish/WishItem";
import { WishData } from "@/types/WishData";
import { GetWish, IsWishEmpty, RemoveWish } from "@/utils/wishUtils";
import { useEffect, useState } from "react";
import mock_books from "@/mocks/mock_books.json"
import DelWishConfirm from "@/components/Confirm/DelWishConfirm";
import { AddCart } from "@/utils/cartUtils";
import { BookData } from "@/types/BookData";
import CartConfirm from "@/components/Confirm/CartConfirm";
import { useRouter } from "next/navigation";

export default function Page() {
    const [wish, setWish] = useState<WishData>({ books: [] });
    const updateWish = () => {
        setWish({ books: GetWish().books.reverse() } );
    };
    useEffect(() => updateWish(), []);

    const isWishEmpty = IsWishEmpty(wish);
    const wishCount = isWishEmpty ? 0 : wish?.books.length;

    const [isCartConfirm, setIsCartConfirm] = useState(false);
    const handleCartOpen = (book: BookData) => {
        if (isWishEmpty) return;
        if (!book) return;
        AddCart({ book: book, count: 1 });
        setIsCartConfirm(true);
    };

    const [selectBook, setSelectBook] = useState<BookData>();
    const [isDelWishConfirm, setIsDelWishConfirm] = useState(false);
    const handleDelWishOpen = () => {
        setIsDelWishConfirm(true);
    };
    const handleDelWishConfirm = () => {
        if (!selectBook) return;
        RemoveWish(selectBook);
        updateWish();
        setIsDelWishConfirm(false);
    };

    const router = useRouter();
    const handleOrder = (book: BookData) => {
        AddCart({ book: book, count: 1 });
        router.push(`/mypage/0/cart`);
    };


    return (
      <div className={styles.container}>
        <div className={styles.upper}>
          <p className={styles.count}>보관함 ({wishCount})</p>
        </div>
        <div className={styles.wish_container}>
          {!isWishEmpty &&
            wish?.books.map((book, idx) => (
              <WishItem
                key={idx}
                book={book}
                onDelWish={handleDelWishOpen}
                onSelectBook={setSelectBook}
                onCartOpen={handleCartOpen}
                onOrder={handleOrder}
              />
            ))}
          {isWishEmpty && <Empty info="마음에 드는 상품을 보관하세요." />}
        </div>

        <div>
          <CartConfirm
            isOpen={isCartConfirm}
            onOpen={setIsCartConfirm}
          />
          <DelWishConfirm
            isOpen={isDelWishConfirm}
            onOpen={setIsDelWishConfirm}
            onConfirm={handleDelWishConfirm}
          />
        </div>
      </div>
    );
}