'use client';

import style from "@/app/search/search.module.css"
import SearchList from "@/components/Search/SearchList";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const query = useSearchParams().get('q');

    return (
        <div>
            <p className={style.search}><span className={style.search_query}>'{query}'</span>에 대한 검색결과</p>

            <div>
                <p className={style.result}>전체 {0}건</p>
            </div>

            <SearchList/>
        </div>
    );
}