'use client';

import styles from "@/components/Search/SearchNavigation.module.css"
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type SearchNavigationProps = {
    q: string;
    page: number;
    maxPage: number;
};

export default function SearchNavigation({ q, page, maxPage }: SearchNavigationProps) {
    const router = useRouter();

    // prev 버튼 onClick
    const isPrevDisabled = page <= 1;
    const handlePrev = useCallback(() => {
        if (isPrevDisabled) return;
        const prevPage = (page - 1);
        router.push(`/search?q=${q}&page=${prevPage}`);
    }, [page]);
    
    // next 버튼 onClick
    const isNextDisabled = page >= maxPage;
    const handleNext = useCallback(() => {
        if (isNextDisabled) return;
        const nextPage = (page + 1);
        router.push(`/search?q=${q}&page=${nextPage}`);
    }, [page]);

    return (
        <div>
            <div className={styles.page_container}>
                <button className={styles.btn_prev} onClick={handlePrev} disabled={isPrevDisabled}>{"<"}</button>
                <span className={styles.currentPage}>{`${page}`}</span>
                <span className={styles.maxPage}>{`/${maxPage}`}</span>
                <button className={styles.btn_next} onClick={handleNext} disabled={isNextDisabled}>{">"}</button>
            </div>
        </div>
    );
}