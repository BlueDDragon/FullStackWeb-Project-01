'use client';

import styles from "@/app/mypage/[id]/wish/wish.module.css"
import { BookData } from "@/types/BookData";
import { WishData } from "@/types/WishData";
import { AddCart } from "@/utils/cartUtils";
import { GetWish, IsWishEmpty, RemoveWish } from "@/utils/wishUtils";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import WishItem from "./WishItem";
import CartConfirm from "@/components/Confirm/CartConfirm";
import Empty from "@/components/Empty/Empty";
import DelWishConfirm from "@/components/Confirm/DelWishConfirm";
import { useLoginState } from "@/utils/userUtils";
import Link from "next/link";
import { LoginData } from "@/types/UserData";
import { HeaderContext } from "@/context/HeaderContext";

type WishContentProps = {
  id: string;
}

export default function WishContent({ id }: WishContentProps) {
    const [isLogined, isVerifyId, login] = useLoginState(id);
    const updateHeader = useContext(HeaderContext).updateHeader;
    
    // 기본 정보
    const [wish, setWish] = useState<WishData>({ books: [] });
    const isWishEmpty = IsWishEmpty(wish);
    const wishCount = isWishEmpty ? 0 : wish?.books.length;

    // 찜하기
    const updateWish = () => {
        const tempWish = GetWish();
        if (tempWish.books) setWish({ books: tempWish.books.reverse() } );
    };
    useEffect(() => {
      updateWish();
    }, [isLogined]);

    // 장바구니 확인창
    const [isCartConfirm, setIsCartConfirm] = useState(false);
    const handleCartOpen = (book: BookData) => {
        if (isWishEmpty) return;
        if (!book) return;
        AddCart({ book: book, count: 1 });
        updateHeader?.();
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
        updateHeader?.();

        if (isLogined)
            router.push(`/mypage/${(login as LoginData).id}/cart`);
        else
            setIsCartConfirm(true);
    };

    return (
      <div>
            {isLogined && isVerifyId &&
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
            </div>}
        
            {!isLogined &&
            <div className={styles.body_warning}>
                <Empty info="로그인이 필요합니다."/>
                <div className={styles.link_box}>
                    <Link className={styles.register} href={(`/register`)}>회원가입</Link>
                    <Link className={styles.login} href={(`/login`)}>로그인</Link>
                </div>
            </div>}

            {isLogined && !isVerifyId &&
            <div className={styles.body_warning}>
                <Empty info="접근할 수 없습니다."/>
            </div>}

        </div>
    );
}