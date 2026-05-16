'use client';

import styles from "@/app/mypage/[id]/wish/wish.module.css"
import { BookData } from "@/types/BookData";
import { WishData } from "@/types/WishData";
import { AddCart } from "@/utils/cartUtils";
import { GetWish, IsWishEmpty, RemoveWish } from "@/utils/wishUtils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import WishItem from "./WishItem";
import CartConfirm from "@/components/Confirm/CartConfirm";
import Empty from "@/components/Empty/Empty";
import DelWishConfirm from "@/components/Confirm/DelWishConfirm";

export default function WishContent() {
    // 기본 정보
    const [wish, setWish] = useState<WishData>({ books: [] });
    const isWishEmpty = IsWishEmpty(wish);
    const wishCount = isWishEmpty ? 0 : wish?.books.length;

    // 찜하기
    const updateWish = () => {
        setWish({ books: GetWish().books.reverse() } );
    };
    useEffect(() => {
      updateWish();
    }, []);

    // 장바구니 확인창
    const [isCartConfirm, setIsCartConfirm] = useState(false);
    const handleCartOpen = (book: BookData) => {
        if (isWishEmpty) return;
        if (!book) return;
        AddCart({ book: book, count: 1 });
        setIsCartConfirm(true);
    };

    // 찜하기 삭제
    const [selectBook, setSelectBook] = useState<BookData>();
    const [isDelWishConfirm, setIsDelWishConfirm] = useState(false);
    const handleDelWishOpen = useCallback(() => {
        setIsDelWishConfirm(true);
    }, []);
    const handleDelWishConfirm = useCallback(() => {
        if (!selectBook) return;
        RemoveWish(selectBook);
        updateWish();
        setIsDelWishConfirm(false);
    }, [selectBook]);

    // 바로구매
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