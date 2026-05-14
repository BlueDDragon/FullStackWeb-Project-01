import style from "@/app/search/search.module.css"
import Empty from "@/components/Empty/Empty";
import SearchList from "@/components/Search/SearchList";
import { fetchItemSearch } from "@/utils/fetchServer";

export default async function Page({ searchParams }: { searchParams: Promise<{q: string}> }) {
    const { q } = await searchParams;
    const books = await fetchItemSearch(q);
    const isBooksEmpty = (!books || books.length === 0);

    return (
        <div>
            <p className={style.search}><span className={style.search_query}>'{q}'</span>에 대한 검색결과</p>

            <div>
                <p className={style.result}>전체 {0}건</p>
            </div>

            {!isBooksEmpty && <SearchList books={books}/>}
            {isBooksEmpty && <Empty />}
        </div>
    );
}