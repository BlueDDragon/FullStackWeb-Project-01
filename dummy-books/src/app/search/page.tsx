import styles from "@/app/search/search.module.css"
import SearchNavigation from "@/components/Search/SearchNavigation";
import SearchUpper from "@/components/Search/SearchUpper";
import { fetchItemSearchResponse } from "@/utils/api/fetchServer";

export default async function Page({ searchParams }: { searchParams: Promise<{ q: string, page: string }>}) {
    const { q, page } = await searchParams;
    const response = await fetchItemSearchResponse(q, 10, parseInt(page));

    const isBooksEmpty = (!response || !Array.isArray(response.item) || response.item.length === 0);
    const maxPage = isBooksEmpty ? 1 : Math.ceil(response.totalResults / 10);

    return (
        <div>
            <SearchNavigation q={q} page={parseInt(page)} maxPage={maxPage} />
            <SearchUpper q={q} isBooksEmpty={isBooksEmpty} response={response}/>
            <SearchNavigation q={q} page={parseInt(page)} maxPage={maxPage} />
        </div>
    );
}