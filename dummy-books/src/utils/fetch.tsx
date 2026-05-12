import type { BookData } from "@/types/BookData"

async function fetchData<T>(url: string) : Promise<T[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error();

        const data = await response.json();
        if (!data || data === null) throw new Error();

        return data.item;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchSearchBooks(q: string) : Promise<BookData[]> {
    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/ItemSearch.aspx?Query=${q}&Output=JS`;

    return await fetchData(apiURL);
}

export async function fetchSearchBooksById(id: number) : Promise<BookData[]> {
    let apiURL = `${process.env.NEXT_PUBLIC_API_URL}/ItemSearch.aspx/${id}`;

    return await fetchData(apiURL);
}