'use client';

import { useCallback, useRef, useState } from "react";

export function useCountInput(initialCount: number, onChange?: (newCount: number) => void) {
    const min = 1;
    const inputRef = useRef<HTMLInputElement>(null);
    const [count, setCount] = useState(initialCount);
    
    const applyCount = useCallback((newCount:number) => {
        if (!inputRef.current) return;
        inputRef.current.value = newCount.toString();
        setCount(newCount);
        onChange?.(newCount);
    }, [onChange]);

    const handleCountIncrease = useCallback(() => {
        if (!inputRef.current) return;
        applyCount(count + 1);
    }, [count, applyCount]);

    const handleCountDecrease = useCallback(() => {
        if (count <= min) return;
        if (!inputRef.current) return;
        applyCount(count - 1);
    }, [count, applyCount]);

    const handleChange = useCallback(() => {
        if (!inputRef.current) return;
        const inputValue = parseInt(inputRef.current.value);
        if (!inputValue || isNaN(inputValue) || inputValue < min) return;
        applyCount(inputValue);
    }, [applyCount]);

    return { inputRef, count, setCount, applyCount, handleCountIncrease, handleCountDecrease, handleChange };
}