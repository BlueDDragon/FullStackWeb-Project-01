'use client';

import styles from "@/app/detail/[id]/detail.module.css"
import { BookData } from "@/types/BookData";
import { AddCart, GetCartTotalCount } from "@/utils/services/cartUtils";
import { useRouter } from "next/navigation";
import { useCallback, useContext } from "react";
import { useLoginState } from "@/utils/services/userUtils";
import { LoginData } from "@/types/UserData";
import { HeaderContext } from "@/context/HeaderContext";
import { useWishToggle } from "@/hooks/useWishToggle";
import { useCountInput } from "@/hooks/useCountInput";
import WishButton from "@/components/Common/WishButton";

type DetailBookPurchaseProps = {
    book: BookData;
    onCartOpen: () => void;
}

export default function DetailBookPurchase({ book, onCartOpen }: DetailBookPurchaseProps) {
    const { isLogined, isVerifyId, login } = useLoginState("0");
    const { setCartTotalCount } = useContext(HeaderContext);
    
    // 수량
    const { inputRef, handleCountIncrease, handleCountDecrease } = useCountInput(1);

    // 장바구니
    const handleCartOpen = useCallback(() => {
        AddCart({ book: book, count: (inputRef.current ? parseInt(inputRef.current.value) : 1) });
        setCartTotalCount(GetCartTotalCount());
        onCartOpen();
    }, [book]);
    
    // 바로구매
    const router = useRouter();
    const handleOrder = useCallback(() => {
        AddCart({ book: book, count: (inputRef.current ? parseInt(inputRef.current.value) : 1) });
        setCartTotalCount(GetCartTotalCount());

        if (isLogined)
            router.push(`/mypage/${(login as LoginData).id}/cart`);
        else
            onCartOpen();
    }, [book, isLogined]);
    
    // 찜하기
    const { isWishAlready, handleToggleWish } = useWishToggle(book, isLogined, onCartOpen);

    return (
        <div>
            <div className={styles.buy_count}>
                <p className={styles.key_count}>수량</p>
                <div className={styles.btns_input}>
                    <button className={styles.btn_decrease} onClick={handleCountDecrease}>-</button>
                    <input className={styles.input} type="number" defaultValue={1} min={1} ref={inputRef}/>
                    <button className={styles.btn_increase} onClick={handleCountIncrease}>+</button>
                </div>
            </div>
            <div className={styles.btns}>
                <button className={styles.btn_cart} onClick={handleCartOpen}>장바구니</button>
                <button className={styles.btn_order} onClick={handleOrder}>바로구매</button>
                <WishButton isWished={isWishAlready} onClick={handleToggleWish}/>
            </div>
        </div>
    );
}