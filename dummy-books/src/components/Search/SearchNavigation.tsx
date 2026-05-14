'use client';

import styles from "@/components/Search/SearchNavigation.module.css"
import { useRouter } from "next/navigation";

type SearchNavigationProps = {
    q: string;
    page: number;
    maxPage: number;
};

export default function SearchNavigation({ q, page, maxPage }: SearchNavigationProps) {
    const router = useRouter();

    const isPrevDisabled = page <= 1;
    const handlePrev = () => {
        if (isPrevDisabled) return;
        const prevPage = (page - 1);
        router.push(`/search?q=${q}&page=${prevPage}`);
    };
    
    const isNextDisabled = page >= maxPage;
    const handleNext = () => {
        if (isNextDisabled) return;
        const nextPage = (page + 1);
        router.push(`/search?q=${q}&page=${nextPage}`);
    };

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