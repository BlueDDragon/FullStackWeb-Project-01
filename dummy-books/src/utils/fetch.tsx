import { ItemSearchResponse } from "@/types/ApiData";
import type { BookData } from "@/types/BookData"
import mock_books from "@/mocks/mock_books.json"

async function fetchData<T>(url: string) : Promise<T | undefined> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error();

        const data = await response.json();
        if (!data || data === null) throw new Error();

        return data;
    }
    catch (error) {
        console.log(error);
    }

    return undefined;
}

export async function fetchItemSearch(q: string) : Promise<BookData[]> {
    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/ItemSearch.aspx`;
    apiURL += `?ttbKey=${process.env.NEXT_PUBLIC_API_KEY}`;
    apiURL += `&Query=${q}`;
    apiURL += `&SearchTarget=Book`;
    apiURL += `&Start=1`;
    apiURL += `&MaxResults=10`;
    apiURL += `&Output=JS`;
    apiURL += `&Version=20131101`;

    const data = await fetchData(apiURL) as ItemSearchResponse;
    return mock_books.item;
    return data.item;
}

// export async function fetchItemLookUpByISBN13(isbn13: number) : Promise<BookData[]> {
//     let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/ItemLookUp.aspx`;
//     apiURL += `?ttbKey=${process.env.NEXT_PUBLIC_API_KEY}`;
//     apiURL += `&itemType=ISBN13`;
//     apiURL += `&itemId=${isbn13}`;
//     apiURL += `&Output=JS`;
//     apiURL += `&Version=20131101`;

//     const data = await fetchData(apiURL) as ItemSearchResponse;
//     return data.item as BookData[];
// }