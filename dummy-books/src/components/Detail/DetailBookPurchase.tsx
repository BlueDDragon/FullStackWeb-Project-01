'use client';

import styles from "@/app/detail/[id]/detail.module.css"
import { BookData } from "@/types/BookData";
import { useLoginState } from "@/utils/services/userUtils";
import { useWishToggle } from "@/hooks/useWishToggle";
import { useCountInput } from "@/hooks/useCountInput";
import WishButton from "@/components/Common/WishButton";
import { useBookActions } from "@/hooks/useBookActions";

type DetailBookPurchaseProps = {
    book: BookData;
    onCartOpen: () => void;
}

export default function DetailBookPurchase({ book, onCartOpen }: DetailBookPurchaseProps) {
    const { isLogined, isVerifyId, login } = useLoginState("0");
    
    // 수량
    const { inputRef, handleCountIncrease, handleCountDecrease } = useCountInput(1);
    const getCount = () => (inputRef.current ? parseInt(inputRef.current.value) : 1);

    // 장바구니
    // 바로구매
    const { handleCartOpen, handleOrder } = useBookActions({ isLogined, login, book, getCount, onComplete: onCartOpen });
    
    // 찜하기
    const { isAlready, handleToggleWish } = useWishToggle(book, isLogined, onCartOpen);

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
                <WishButton isWished={isAlready} onClick={handleToggleWish}/>
            </div>
        </div>
    );
}