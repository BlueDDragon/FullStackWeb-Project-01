'use client';

import { useCallback, useEffect, useRef, useState } from "react";

export function useScrollSlider() {
    const slideRef = useRef<HTMLDivElement>(null);
    
    const [isPrevDisabled, setIsPrevDisabled] = useState(true);
    const [isNextDisabled, setIsNextDisabled] = useState(false);

    // 배너 내비게이션 상태 업데이트
    const updateButtonState = () => {
      if (!slideRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = slideRef.current;

      setIsPrevDisabled(scrollLeft <= 0);
      setIsNextDisabled(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    // 스크롤시 네비게이션 상태 업데이트
    useEffect(() => {
      const slide = slideRef.current;
      if (!slide) return;

      updateButtonState();
      slide.addEventListener("scroll", updateButtonState);
      return () => {slide.removeEventListener("scroll", updateButtonState);};
    }, []);

    // prev 버튼 onClick
    const handlePrev = useCallback(() => {
        if (!slideRef.current) return;

        const width = slideRef.current.clientWidth;
        slideRef.current.scrollBy({
            left: -width,
            behavior: "smooth",
        });
    }, []);

    // next 버튼 onClick
    const handleNext = useCallback(() => {
        if (!slideRef.current) return;

        const width = slideRef.current.clientWidth;
        slideRef.current.scrollBy({
            left: width,
            behavior: "smooth",
        });
    }, []);

    return { slideRef, isPrevDisabled, isNextDisabled, handlePrev, handleNext };
}