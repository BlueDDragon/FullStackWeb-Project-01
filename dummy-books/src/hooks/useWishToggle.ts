'use client';

import { BookData } from "@/types/BookData";
import { IsWishAlready, ToggleWish } from "@/utils/wishUtils";
import { useCallback, useEffect, useState } from "react";

export function useWishToggle(book: BookData, isLogined: boolean, onNotLogined: () => void) {
    const [isWishAlready, setIsWishAlready] = useState(false);
    
    useEffect(() => {
        setIsWishAlready(IsWishAlready(book.isbn13));
    }, [book, isLogined]);
    
    const handleToggleWish = useCallback(() => {
        if (isLogined)
            setIsWishAlready(ToggleWish(book));
        else
            onNotLogined();
    }, [book, isLogined]);

    return { isWishAlready, handleToggleWish };
}