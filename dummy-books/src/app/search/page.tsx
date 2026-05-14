import styles from "@/app/search/search.module.css"
import Empty from "@/components/Empty/Empty";
import SearchList from "@/components/Search/SearchList";
import SearchNavigation from "@/components/Search/SearchNavigation";
import { fetchItemSearchResponse } from "@/utils/fetchServer";

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string, page: string }>}) {
    const { q, page } = await searchParams;
    const response = await fetchItemSearchResponse(q, 10, parseInt(page));

    const isBooksEmpty = (!response || !Array.isArray(response.item) || response.item.length === 0);
    const maxPage = isBooksEmpty ? 1 : Math.ceil(response.totalResults / 10);

    return (
        <div>
            <SearchNavigation q={q} page={parseInt(page)} maxPage={maxPage} />
            
            <p className={styles.search}><span className={styles.search_query}>'{q}'</span>에 대한 검색결과</p>

            <div>
                <p className={styles.result}>전체 {isBooksEmpty ? 0 : response.totalResults.toLocaleString()}건</p>
            </div>

            {!isBooksEmpty && <SearchList books={response.item}/>}
            {isBooksEmpty && <Empty />}
            
            <SearchNavigation q={q} page={parseInt(page)} maxPage={maxPage} />
        </div>
    );
}