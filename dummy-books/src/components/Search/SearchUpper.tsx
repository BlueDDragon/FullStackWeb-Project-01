'use client';

import styles from "@/app/search/search.module.css"
import { SearchViewContext, SearchViewContextType } from "@/context/SearchViewContext";
import { ItemSearchResponse } from "@/types/ApiData";
import { useCallback, useState } from "react";
import Image from "next/image";
import Empty from "../Common/Empty";
import SearchList from "./SearchList";

type SearchUpperProps = {
    q: string;
    isBooksEmpty: boolean;
    response: ItemSearchResponse;
}

export default function SearchUpper({ q, isBooksEmpty, response }: SearchUpperProps) {
    // 검색 리스트 보기 타입
    const [viewType, setViewType] = useState<SearchViewContextType>({ viewType: "detail" });
    const handleViewTypeDetail = useCallback(() => {
        setViewType({ viewType: "detail" });
    }, []);
    const handleViewTypeSimple = useCallback(() => {
        setViewType({ viewType: "simple" });
    }, [])

    return (
        <div>
            <SearchViewContext.Provider value={viewType}>
            
                <div className={styles.upper}>
                    <div>
                        <p className={styles.search}><span className={styles.search_query}>'{q}'</span>에 대한 검색결과</p>
                        <p className={styles.result}>전체 {isBooksEmpty ? 0 : response.totalResults.toLocaleString()}건</p>
                    </div>

                    <div className={styles.list_view}>
                        <Image className={styles.list_view_detail} src={'/images/view_detail_3.png'} width={50} height={50} alt="" onClick={handleViewTypeDetail} />
                        <Image className={styles.list_view_simple} src={'/images/view_simple_3.png'} width={50} height={50} alt="" onClick={handleViewTypeSimple} />
                    </div>
                </div>        

                {!isBooksEmpty && <SearchList books={response.item}/>}
                {isBooksEmpty && <Empty info="검색 결과가 없습니다."/>}
                
            </SearchViewContext.Provider>
        </div>
    );
}