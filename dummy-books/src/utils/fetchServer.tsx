import type { ItemListResponse, ItemLookUpResponse, ItemSearchResponse } from "@/types/ApiData";
import type { BookData } from "@/types/BookData"
import mock_books from "@/mocks/mock_books.json"

async function fetchData<T>(url: string) : Promise<T | undefined> {
    console.log(`fetch: ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error();

        const data = await response.json();
        if (!data || data === null || data === undefined) throw new Error();

        return data;
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
}

export async function fetchItemSearchResponse(q: string, maxResults: number = 10, page: number = 1) : Promise<ItemSearchResponse> {
    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/ItemSearch.aspx`;
    apiURL += `?ttbKey=${process.env.NEXT_PUBLIC_API_KEY}`;
    apiURL += `&Query=${q}`;
    apiURL += `&SearchTarget=Book`;
    apiURL += `&Start=${page}`;
    apiURL += `&MaxResults=${maxResults}`;
    apiURL += `&Cover=MidBig`;
    apiURL += `&Output=JS`;
    apiURL += `&Version=20131101`;

    const data = await fetchData(apiURL) as ItemSearchResponse;
    return data;
}

export async function fetchItemSearch(q: string, maxResults: number = 10) : Promise<BookData[]> {
    return (await fetchItemSearchResponse(q, maxResults, 1)).item;
}

export async function fetchItemList(type: string) : Promise<BookData[]> {
    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/ItemList.aspx`;
    apiURL += `?ttbKey=${process.env.NEXT_PUBLIC_API_KEY}`;
    apiURL += `&queryType=${type}`;
    apiURL += `&SearchTarget=Book`;
    apiURL += `&Cover=Big`;
    apiURL += `&Output=JS`;
    apiURL += `&Version=20131101`;

    const data = await fetchData(apiURL) as ItemListResponse;
    return data.item as BookData[];
}

export async function fetchItemLookUpByISBN13(isbn13: number) : Promise<BookData[]> {
    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/ItemLookUp.aspx`;
    apiURL += `?ttbKey=${process.env.NEXT_PUBLIC_API_KEY}`;
    apiURL += `&itemType=ISBN13`;
    apiURL += `&itemId=${isbn13}`;
    apiURL += `&Cover=Big`;
    apiURL += `&OptResult=ratingInfo,reviewList,Toc,Story,phraseList`
    apiURL += `&Output=JS`;
    apiURL += `&Version=20131101`;

    const data = await fetchData(apiURL) as ItemLookUpResponse;
    return data.item as BookData[];
}